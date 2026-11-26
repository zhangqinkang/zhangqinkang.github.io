// Keep the original React Bits document and animated component. Its preview
// presentation scrolls in a local element so it cannot move the phone page.
let ready = false;
const timer = setInterval(() => {
  const preview = [...document.querySelectorAll('button')].find(button => button.textContent.trim() === 'Preview');
  const demo = document.querySelector('.electric-border');
  if (!preview || !demo || ready) return;
  if (document.documentElement.dataset.proofRoute === 'electric' && demo.querySelector('canvas')?.dataset.initialFrameReady !== 'true') return;
  ready = true;
  clearInterval(timer);
  const viewport = document.createElement('div');
  viewport.id = 'portfolio-electric-viewport';
  viewport.style.cssText = 'position:fixed;inset:0;width:1440px;height:900px;overflow:auto;scrollbar-width:none;overscroll-behavior:none;background:#120f17';
  while (document.body.firstChild) viewport.append(document.body.firstChild);
  document.body.append(viewport);
  document.querySelectorAll('img').forEach(image => { image.addEventListener('error', () => { image.style.visibility = 'hidden' }); if (image.complete && !image.naturalWidth) image.style.visibility = 'hidden'; });
  const prime = () => demo.querySelector('canvas')?.__portfolioPrimeFrame?.();
  const onEntry = event => {
    if (event.source !== parent || event.origin !== location.origin || !event.data?.active) return;
    if (['portfolio-preview-enter', 'portfolio-preview-visible'].includes(event.data.type)) prime();
  };
  addEventListener('message', onEntry);
  prime();
  let phase = 0;
  const panTimer = setInterval(() => {
    const buttons = [...document.querySelectorAll('button')];
    const code = buttons.find(button => button.textContent.trim() === 'Code');
    if (phase === 0) viewport.scrollTo({top: Math.min(innerHeight * .25, viewport.scrollHeight - innerHeight), behavior:'smooth'});
    if (phase === 1) { viewport.scrollTo({top:0, behavior:'smooth'}); }
    if (phase === 2) preview.click();
    phase = (phase + 1) % 3;
  }, 3200);
  addEventListener('pagehide', () => { clearInterval(panTimer); removeEventListener('message', onEntry); }, {once:true});
  document.fonts.ready.then(() => {
    if (!demo.isConnected) return;
    demo.getBoundingClientRect();
    window.__portfolioReferenceReady = true;
    parent.postMessage({type:'portfolio-electric-ready'}, location.origin);
  });
}, 100);

addEventListener('pagehide', () => clearInterval(timer));
