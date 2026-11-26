// Mobile proof playback uses pixels captured from scanning-hero's unchanged
// material, depth map and bloom. Only five pixel buffers are retained; the
// desktop renderer never imports this module.
export async function mountScanFrames(canvas, root, kind, options = {}) {
  const sequence = options.sequence
  const count = sequence ? sequence.count - 1 : 96, min = -.05, range = 1.1
  const width = options.width || 576, height = options.height || 360
  const assetRoot = options.assetRoot || `/panda-original/scan-frames/${kind}`
  // V3 deltas contain only transparent or opaque pixels. Drawing the two
  // lossless bitmaps is equivalent to the pixel loop, without readback or
  // hundreds of thousands of JavaScript assignments on a return gesture.
  const bitmapFrames = options.bitmapFrames === true
  // V3's contiguous bitmap queue never reads this drawing surface back.
  // Keep it drawable without requesting a software readback buffer.
  const context = canvas.getContext('2d', {alpha:true, willReadFrequently:!bitmapFrames})
  canvas.width = width; canvas.height = height
  canvas.dataset.scanDisplayMode = 'original-frame-sequence'
  const compressed = new Map(), decoded = new Map(), decoding = new Map()
  const controller = new AbortController()
  let manifest, basePixels
  const scratch = document.createElement('canvas')
  const scratchContext = sequence ? null : scratch.getContext('2d', {alpha:true, willReadFrequently:true})
  let output = bitmapFrames ? null : context.createImageData(width,height)
  const pixelReads = new Set()
  const decodePixels = async blob => {
    if (disposed) return null
    const bitmap = options.decodeSequenceFrame && sequence
      ? await options.decodeSequenceFrame(blob, width, height)
      : await createImageBitmap(blob, ...(options.resizeSequenceFrames && sequence
        ? [{resizeWidth:width, resizeHeight:height, resizeQuality:'high'}] : []))
    if (bitmapFrames) {
      if (disposed) { bitmap.close(); return null }
      return bitmap
    }
    try {
      if (disposed) return null
      scratch.width = bitmap.width; scratch.height = bitmap.height
      scratchContext.drawImage(bitmap,0,0)
      return scratchContext.getImageData(0,0,bitmap.width,bitmap.height)
    } finally { bitmap.close(); scratch.width = scratch.height = 1 }
  }
  const readPixels = blob => {
    const task = decodePixels(blob)
    pixelReads.add(task)
    task.finally(() => pixelReads.delete(task)).catch(() => {})
    return task
  }
  let disposed = false, visible = false, ready = false, startedAt = performance.now() - 500
  let localVisible = false, outerVisible = !options.visibilityElement
  let raf = 0, last = -1, shown = false, preparing = false
  let movingUntil = 0
  const indexAt = milliseconds => {
    if (sequence) return Math.floor(milliseconds * sequence.fps / 1000) % (count + 1)
    const seconds = milliseconds / 1000
    const progress = Math.min((seconds % 10) / 3.2, 1)
    const eased = progress < .5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2
    const scan = kind === 'source' ? Math.sin(seconds * .5) * .5 + .5 : min + range * eased
    return Math.max(0, Math.min(count, Math.round((scan - min) / range * count)))
  }
  const bytes = index => {
    if (!compressed.has(index)) compressed.set(index,
      options.fetchSequenceBlob && sequence
        ? options.fetchSequenceBlob(`${assetRoot}/${String(index).padStart(5,'0')}.webp`,controller.signal)
        : fetch(`${assetRoot}/${String(index).padStart(sequence ? 5 : 3,'0')}.webp`, {signal:controller.signal, ...(sequence ? {cache:'no-store'} : {})})
          .then(response => { if (!response.ok) throw Error(`Scan frame ${response.status}`); return response.blob() }))
    return compressed.get(index)
  }
  const image = index => {
    if (decoded.has(index)) return Promise.resolve(decoded.get(index))
    if (!decoding.has(index)) decoding.set(index, bytes(index).then(async blob => {
      const pixels = await readPixels(blob)
      if (disposed) { if (bitmapFrames) pixels?.close(); return null }
      if (sequence && !visible && ready) { pixels?.close(); return null }
      decoded.set(index, pixels)
      return pixels
    }).finally(() => decoding.delete(index)))
    return decoding.get(index)
  }
  const paint = index => {
    const bitmap = decoded.get(index)
    if (!bitmap || disposed || last === index) return
    const position = sequence ? {x:0,y:0} : manifest.frames[index]
    if (bitmapFrames) {
      context.globalCompositeOperation = 'copy'
      if (!sequence) context.drawImage(basePixels, 0, 0)
      if (!sequence) context.globalCompositeOperation = 'source-over'
      if (sequence && options.onSequenceFrame) options.onSequenceFrame(bitmap, index)
      else if (sequence) context.drawImage(bitmap, position.x, position.y, canvas.width, canvas.height)
      else context.drawImage(bitmap, position.x, position.y)
    } else {
    output.data.set(basePixels.data)
    for (let y=0;y<bitmap.height;y++) for (let x=0;x<bitmap.width;x++) {
      const from = (y*bitmap.width+x)*4
      if (!bitmap.data[from+3]) continue
      const to = ((position.y+y)*canvas.width+position.x+x)*4
      output.data[to]=bitmap.data[from]; output.data[to+1]=bitmap.data[from+1]
      output.data[to+2]=bitmap.data[from+2]; output.data[to+3]=255
    }
    context.putImageData(output,0,0)
    }
    canvas.dataset.scanFrame = String(index)
    if (sequence) canvas.dataset.frame = String(index)
    canvas.dataset.motionCommit = 'pixels'
    last = index
    canvas.__pandaRenderedFrames = (canvas.__pandaRenderedFrames ?? 0) + 1
    canvas.dataset.renderedFrames = String(canvas.__pandaRenderedFrames)
    if (!shown) {
      shown = true; if (!sequence) canvas.style.opacity = '1'
      canvas.dispatchEvent(new Event('panda-scan-ready'))
      parent.postMessage({type:'portfolio-motion-ready',owner:options.owner || location.pathname,displayMode:canvas.dataset.scanDisplayMode,width:canvas.width,height:canvas.height},location.origin)
    }
  }
  const prepare = async elapsed => {
    if (preparing || disposed) return
    preparing = true
    const current = indexAt(elapsed)
    // The V3 scan advances monotonically through captured frames. Sparse
    // time offsets discarded near-future frames and repeatedly decoded them
    // before they were displayed. Keep a contiguous four-frame queue instead.
    const wanted = sequence
      ? new Set(Array.from({length:options.sequenceBufferSize || 3}, (_,ahead) => (current + ahead) % (count + 1)))
      : bitmapFrames && kind === 'result'
      ? new Set([0,1,2,3].map(ahead => Math.min(count, current + ahead)))
      : new Set([0,60,120,200].map(ahead => indexAt(elapsed + ahead)))
    // Close outgoing decoded surfaces BEFORE allocating replacements.
    for (const [index, pixels] of decoded) if (!wanted.has(index)) {
      if (bitmapFrames) pixels.close()
      decoded.delete(index)
    }
    if (sequence) for (const index of compressed.keys()) if (!wanted.has(index)) compressed.delete(index)
    try { await Promise.all([...wanted].map(image)) }
    finally {
      preparing = false
      canvas.dataset.decodedScanFrames = String(decoded.size + (basePixels ? 1 : 0))
      if (sequence) canvas.dataset.compressedFrames = String(compressed.size)
    }
  }
  const loop = () => {
    if (disposed || !visible) { raf = 0; return }
    const now = performance.now()
    // Keep the archived scan timing while resting. During V3's cover exit,
    // skip only its end hold so the visible scan does not become static.
    if (options.keepMovingOnScroll && now < movingUntil && (now - startedAt) % 10000 >= 3200) {
      startedAt = now - 500
      last = -1
    }
    const elapsed = now - startedAt
    if (sequence && options.contiguousSequence) {
      const next = (last + 1) % (count + 1)
      const due = elapsed >= ((canvas.__sequencePainted || 0) + 1) * 1000 / sequence.fps
      if (due && decoded.has(next)) {
        paint(next)
        canvas.__sequencePainted = (canvas.__sequencePainted || 0) + 1
      }
      void prepare(((last + 1) % (count + 1)) * 1000 / sequence.fps + .001).catch(report)
    } else {
      paint(indexAt(elapsed))
      void prepare(elapsed).catch(report)
    }
    raf = requestAnimationFrame(loop)
  }
  function report(error) {
    if (!disposed) parent.postMessage({type:'portfolio-motion-error',message:String(error)},location.origin)
  }
  const enter = active => {
    if (disposed || active === visible) return
    visible = active
    if (sequence) canvas.dataset.motionActive = String(active)
    if (active) {
      // The original result has a long end hold. Re-entry always begins in
      // its actual scanning phase, rather than showing that static hold.
      if (sequence) { canvas.width = width; canvas.height = height }
      startedAt = performance.now() - (sequence ? 0 : 500); last = -1; canvas.__sequencePainted = 0
      if (!ready) return
      void prepare(sequence ? 0 : 500).then(() => { if (!disposed && visible && !raf) raf = requestAnimationFrame(loop) }).catch(report)
    } else {
      cancelAnimationFrame(raf); raf = 0
      if (sequence) {
        // Drain the current queue before a new generation can start. A slow
        // decode must not retain an off-screen surface or paint a 1px canvas.
        last = -1
        for (const pixels of decoded.values()) pixels.close()
        decoded.clear(); compressed.clear(); canvas.width = canvas.height = 1
        canvas.dataset.decodedScanFrames = canvas.dataset.compressedFrames = '0'
      }
    }
  }
  const onMessage = event => {
    if (event.origin === location.origin && event.source === parent && event.data?.type === 'portfolio-preview-enter') enter(event.data.active)
  }
  const sync = () => {
    if (options.controllerVisibility) {
      enter(localVisible && outerVisible && !document.hidden)
      return
    }
    if (options.manualVisibility && options.scroller) {
      const rect = canvas.getBoundingClientRect(), clip = options.scroller.getBoundingClientRect()
      localVisible = rect.width > 0 && rect.height > 0 && rect.bottom > clip.top && rect.top < clip.bottom && rect.right > clip.left && rect.left < clip.right
    }
    if (options.visibilityElement) {
      const rect = options.visibilityElement.getBoundingClientRect()
      outerVisible = rect.bottom > 0 && rect.top < innerHeight
    }
    const css = sequence ? getComputedStyle(canvas) : null
    enter(localVisible && outerVisible && (!sequence || !document.hidden && css.display !== 'none' && css.visibility !== 'hidden' && +css.opacity > .001))
  }
  const classes = sequence && !options.controllerVisibility ? new MutationObserver(sync) : null
  classes?.observe(canvas, {attributes:true,attributeFilter:['class']})
  if (sequence) { document.addEventListener('visibilitychange',sync); canvas.addEventListener('transitionend',sync) }
  const onInnerScroll = () => {
    if (!options.keepMovingOnScroll || disposed || !ready || !visible) return
    if (options.scroller.scrollTop >= options.coverHeight) return
    movingUntil = performance.now() + 250
  }
  if (options.keepMovingOnScroll) options.scroller.addEventListener('scroll',onInnerScroll,{passive:true})
  const observer = new IntersectionObserver(([entry]) => { if (!options.controllerVisibility) { localVisible = entry.isIntersecting; sync() } }, {root:options.scroller || null})
  const outerObserver = options.visibilityElement ? new IntersectionObserver(([entry]) => { if (options.controllerVisibility) outerVisible = entry.isIntersecting; sync() }) : null
  outerObserver?.observe(options.visibilityElement)
  if (options.visibilityElement && !options.controllerVisibility) addEventListener('scroll',sync,{passive:true})
  let drained
  const dispose = () => {
    if (disposed) return drained
    disposed = true; controller.abort(); cancelAnimationFrame(raf)
    observer.disconnect(); outerObserver?.disconnect(); classes?.disconnect()
    if (sequence) { document.removeEventListener('visibilitychange',sync); canvas.removeEventListener('transitionend',sync) }
    removeEventListener('scroll',sync)
    if (options.keepMovingOnScroll) options.scroller.removeEventListener('scroll',onInnerScroll)
    removeEventListener('message',onMessage); removeEventListener('pagehide',dispose)
    options.signal?.removeEventListener('abort',dispose)
    if (bitmapFrames) { basePixels?.close(); for (const pixels of decoded.values()) pixels.close() }
    basePixels = null; output = null; scratch.width = scratch.height = 1
    decoded.clear(); compressed.clear(); context.clearRect(0,0,canvas.width,canvas.height)
    canvas.width = canvas.height = 1; delete canvas.__pandaDispose; delete canvas.__pandaSyncVisibility; delete canvas.__pandaSetVisibility
    drained = Promise.allSettled([...pixelReads, ...decoding.values()]).then(() => undefined)
    return drained
  }
  canvas.__pandaDispose = dispose
  if (options.controllerVisibility) canvas.__pandaSetVisibility = active => { localVisible = active; sync() }
  if (options.manualVisibility) canvas.__pandaSyncVisibility = sync
  options.signal?.addEventListener('abort',dispose,{once:true})
  if (options.signal?.aborted) { await dispose(); return dispose }
  addEventListener('message',onMessage); addEventListener('pagehide',dispose,{once:true})
  const fetchAsset = async name => {
    const response = await fetch(`${assetRoot}/${name}`, {signal:controller.signal})
    if (!response.ok) throw Error(`Scan asset ${response.status}`)
    return response
  }
  try {
    if (!sequence) {
      manifest = await (await fetchAsset('manifest.json')).json()
      const background = await readPixels(await (await fetchAsset('base.webp')).blob())
      if (disposed) { if (bitmapFrames) background?.close(); await drained; return dispose }
      basePixels = background
      await prepare(500)
    }
  } catch (error) {
    if (disposed) { await drained; return dispose }
    dispose(); throw error
  }
  if (disposed) { await drained; return dispose }
  if (!sequence) paint(indexAt(500))
  else canvas.width = canvas.height = 1
  ready = true
  if (!options.controllerVisibility) observer.observe(options.entryRoot || root)
  if (visible && !raf) raf = requestAnimationFrame(loop)
  // Cache compressed frames, not decoded image surfaces. This completes
  // before normal scroll entry, without creating dozens of GPU textures.
  let next = 0
  if (!sequence) void Promise.all(Array.from({length:3}, async () => {
    while (!disposed && next <= count) { const index = next++; await bytes(index) }
  })).catch(report)
  return dispose
}
