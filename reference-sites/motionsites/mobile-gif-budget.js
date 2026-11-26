// Play the original GIF frame sequence with one decoded frame per card.
// Encoded JPEG packs keep original frame durations and loops; no video or
// browser-owned animated-image decoder is used in the phone preview.
const rivr = [...document.images].find(image => image.alt === 'RIVR DeFi');
const duplicate = [...document.images].find(image => image.alt === 'Finlytic AI Agent');
if (rivr) {
  rivr.dataset.motionSrc = 'mobile-assets/hero-finlytic-preview-CV9g0FHP.webp';
  rivr.alt = 'Finlytic AI Agent';
  const title = rivr.closest('.prompt-card-hover')?.querySelector('h3');
  if (title) title.textContent = 'Finlytic AI Agent';
  if (duplicate && duplicate !== rivr) duplicate.closest('.prompt-card-hover')?.remove();
}
let disposed = false;
window.__portfolioReferenceReady = false;
const reportError = error => parent.postMessage({type:'portfolio-motion-error',message:`${location.pathname}: ${String(error)}`},location.origin);
addEventListener('unhandledrejection', event => reportError(event.reason));
addEventListener('error', event => reportError(event.message));
const epoch = performance.now();
// Finalize the phone layout before measuring which frames the pan will reveal.
// Hiding the archived logo after warmup shifts the card grid into unprepared rows.
const logoStyle = document.createElement('style');
logoStyle.textContent = 'nav a:has(> img[alt="MotionSites logo"]){display:none!important}';
document.head.append(logoStyle);
document.documentElement.style.overflow = 'hidden';
document.body.style.willChange = 'auto';
await document.fonts.ready;
// Layout reads below are synchronous. Never wait for an animation frame to
// prepare an offscreen iframe: phone WebKit may suspend its rAF entirely.
const states = [...document.querySelectorAll('img[data-motion-src]')].map(image => {
  const canvas = document.createElement('canvas');
  canvas.className = image.className;
  canvas.style.cssText = image.style.cssText;
  canvas.style.aspectRatio = `${image.width} / ${image.height}`;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', image.alt);
  canvas.dataset.motionSrc = image.dataset.motionSrc;
  canvas.dataset.motionFramePlayer = 'true';
  canvas.width = 320;
  canvas.height = Math.round(image.height * 320 / image.width);
  const state = {canvas, context:canvas.getContext('2d', {alpha:false, willReadFrequently:true}),
    path:image.dataset.motionSrc.replace('mobile-assets/', 'frame-packs/').replace(/\.webp$/, '.json'),
    active:false, retired:false, abort:new AbortController(), load:null, bytes:null, available:0, manifest:null, ends:[], duration:0, drawing:null, last:-1};
  image.replaceWith(canvas);
  canvas.__pandaDispose = async () => {
    disposed = true;
    window.__portfolioReferenceReady = false;
    state.retired = true;
    state.abort.abort();
    state.active = false;
    await state.drawing?.catch(() => {});
    state.bytes = null;
    state.manifest = null;
    canvas.width = 1;
    canvas.height = 1;
  };
  return state;
});
const decode = async blob => {
  if (typeof createImageBitmap === 'function') return createImageBitmap(blob);
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.src = url;
  try { await image.decode(); } catch (error) { URL.revokeObjectURL(url); throw error; }
  return {image, close(){image.removeAttribute('src');URL.revokeObjectURL(url)}};
};
// Commit decoded pixels before publishing a frame. drawImage(bitmap) on every
// display canvas can leave native image references in WebKit's deferred drawing
// commands even after close(). Only this reusable scratch canvas sees bitmaps;
// display canvases receive ImageData, with no decoder-backed image dependency.
const scratch = document.createElement('canvas');
const scratchContext = scratch.getContext('2d', {alpha:false, willReadFrequently:true});
const draw = (state, index) => {
  if (state.drawing || !state.bytes || !state.manifest) return state.drawing;
  const frame = state.manifest.frames[index];
  if (frame.offset + frame.length > state.available) return;
  const blob = new Blob([state.bytes.subarray(frame.offset, frame.offset + frame.length)], {type:'image/jpeg'});
  state.drawing = decode(blob).then(bitmap => {
    try {
      if (disposed || state.retired || !state.manifest) return;
      if (scratch.width !== state.canvas.width || scratch.height !== state.canvas.height) {
        scratch.width = state.canvas.width;
        scratch.height = state.canvas.height;
      }
      scratchContext.drawImage(bitmap.image || bitmap, 0, 0, scratch.width, scratch.height);
      const pixels = scratchContext.getImageData(0, 0, scratch.width, scratch.height);
      state.context.putImageData(pixels, 0, 0);
      // Reset the scratch backing store after the synchronous readback so it
      // cannot retain a decoded native frame while the next one is loading.
      scratch.width = 1;
      scratch.height = 1;
      state.last = index;
      state.canvas.__pandaRenderedFrames = (state.canvas.__pandaRenderedFrames || 0) + 1;
      state.canvas.dataset.decodedFrames = '1';
      state.canvas.dataset.motionCommit = 'pixels';
    } finally { bitmap.close(); }
  }).finally(() => { state.drawing = null; });
  return state.drawing;
};
const load = state => {
  if (disposed || state.retired) return Promise.resolve();
  if (state.load) return state.load;
  state.load = (async () => {
    const response = await fetch(state.path, {signal:state.abort.signal});
    if (!response.ok) throw Error(`Motion frame manifest ${response.status}`);
    const manifest = await response.json();
    const responseData = await fetch(new URL(manifest.data, new URL(state.path, location.href)), {cache:'no-store',signal:state.abort.signal});
    if (!responseData.ok) throw Error(`Motion frame pack ${responseData.status}`);
    if (disposed || state.retired) return;
    state.manifest = manifest;
    state.canvas.width = manifest.width;
    state.canvas.height = manifest.height;
    let total = 0;
    state.ends = manifest.frames.map(frame => total += frame.duration);
    state.duration = total;
    if (!responseData.body?.getReader) {
      const bytes = await responseData.arrayBuffer();
      if (disposed || state.retired) return;
      state.bytes = new Uint8Array(bytes);
      state.available = state.bytes.length;
      await draw(state,0);
      return;
    }
    // Publish the complete first pixels as soon as their byte range arrives.
    // Waiting for every GIF frame kept a stale, differently cropped poster
    // visible even though the current viewport could already be drawn.
    const final = manifest.frames.at(-1);
    state.bytes = new Uint8Array(final.offset + final.length);
    let announce,fail,firstPainted=false;
    const first = new Promise((resolve,reject)=>{announce=resolve;fail=reject});
    const reader = responseData.body.getReader();
    void (async()=>{
      while (true) {
        const {done,value}=await reader.read();
        if (disposed || state.retired) {announce();await reader.cancel();return}
        if (done) break;
        state.bytes.set(value,state.available);state.available+=value.length;
        if (!firstPainted && state.available >= manifest.frames[0].length) {
          await draw(state,0);firstPainted=true;announce();
        }
      }
      if (!firstPainted || state.available !== state.bytes.length) throw Error('Incomplete motion frame pack');
    })().catch(error=>{fail(error);if(!disposed&&!state.retired)reportError(error)});
    await first;
  })().catch(error => { if (!disposed && !state.retired) throw error; });
  return state.load;
};
const update = () => {
  if (disposed) return;
  for (const state of states) {
    const rect = state.canvas.getBoundingClientRect();
    state.active = !state.retired && rect.bottom > -160 && rect.top < innerHeight + 160;
    state.canvas.dataset.motionActive = String(state.active);
    // The phone pan travels at most one viewport. Decode the next viewport's
    // first frames before announcing ready, so moving into it reveals no blanks.
    const warm = !state.retired && rect.bottom > -160 && rect.top < innerHeight * 2 + 160;
    if (warm) void load(state).catch(reportError);
  }
};
update();
// Intrinsic canvas sizes can settle as the manifests arrive. Recheck the final
// layout instead of trusting the first measurement of the archived image grid.
for (let attempt = 0; attempt < states.length; attempt++) {
  if (states.some(state => state.retired)) { disposed = true; break; }
  const pending = states.filter(state => {
    const rect = state.canvas.getBoundingClientRect();
    return !state.canvas.__pandaRenderedFrames && rect.bottom > -160 && rect.top < innerHeight * 2 + 160;
  });
  if (!pending.length) break;
  await Promise.all(pending.map(load));
}
update();
// Run the original wrapper's phone pan in this document instead of nesting
// another transformed iframe around the original page.
const directPan = Boolean(window.frameElement?.closest('.panda-reference-live-window')) || parent === window;
let panShift = 0;
const primeEntry = (visible = false) => {
  const limit = Math.min(Math.max(0, document.documentElement.scrollHeight - innerHeight), innerHeight);
  const travel = limit / .28;
  const phase = (performance.now() - epoch + panShift) % (travel * 2 + 700 + 2600);
  // Pre-entry can precede the actual viewport crossing by a full second.
  // Start the visible entry on a moving segment, including either endpoint hold.
  if (limit && (visible || (phase >= travel && phase < travel + 700) || phase >= travel * 2 + 700)) {
    panShift = travel * .25 - (performance.now() - epoch);
  }
};
const applyPan = time => {
  if (!directPan || disposed) return;
  const limit = Math.min(Math.max(0, document.documentElement.scrollHeight - innerHeight), innerHeight);
  if (!limit) return;
  const travel = limit / .28;
  const phase = (time - epoch + panShift) % (travel * 2 + 700 + 2600);
  const position = phase < travel ? phase * .28 : phase < travel + 700 ? limit
    : phase < travel * 2 + 700 ? limit - (phase - travel - 700) * .28 : 0;
  // The same speed and endpoint holds, evaluated from the running clock. A
  // suspended offscreen rAF must not restart the preview at its static beginning.
  window.scrollTo(0, position);
};
const paintMotion = now => {
  const pending = [];
  if (disposed) return;
  for (const state of states) {
    if (!state.active || !state.manifest) continue;
    if (state.drawing) {pending.push(state.drawing);continue;}
    const elapsed = now - epoch;
    const cycle = elapsed % state.duration;
    let index = state.ends.findIndex(end => end > cycle);
    if (state.manifest.loop > 0 && elapsed >= state.duration * (state.manifest.loop + 1)) index = state.ends.length - 1;
    if (index < 0) index = 0;
    if (index !== state.last) pending.push(draw(state, index));
  }
  return Promise.all(pending);
};
const animate = now => {
  if (disposed) return;
  applyPan(now);
  void paintMotion(now)?.catch(reportError);
  requestAnimationFrame(animate);
};
const host = window.frameElement?.closest('.panda-reference-live-window');
if (host?.dataset.mobileEntered === 'true') primeEntry(host.dataset.mobileVisible === 'true');
applyPan(performance.now());
update();
await paintMotion(performance.now());
requestAnimationFrame(animate);
// Keep a low-rate current frame prepared even if offscreen rAF is suspended.
// Visible rAF still follows the original frame durations, and draw guards avoid
// a second in-flight decode for a card.
const timer = setInterval(() => {
  if (disposed) return;
  applyPan(performance.now());
  update();
  void paintMotion(performance.now())?.catch(reportError);
}, 150);
addEventListener('message', event => {
  if (event.source !== parent || event.origin !== location.origin || !['portfolio-preview-enter', 'portfolio-preview-visible'].includes(event.data?.type) || !event.data.active) return;
  primeEntry(event.data.type === 'portfolio-preview-visible');
  applyPan(performance.now());
  update();
  void paintMotion(performance.now())?.catch(reportError);
});
if (!disposed) {
  window.__portfolioReferenceReady = true;
  parent.postMessage({type:'portfolio-motion-reference-ready'},location.origin);
}
addEventListener('pagehide', event => {
  if (event.persisted) return;
  disposed = true;
  clearInterval(timer);
  for (const state of states) void state.canvas.__pandaDispose();
});
