// These lossless frames are captured from source-scan.js, at each original
// scan position and with the monitor and phone's original, separate crops.
// Only the shader layer changes; typography and the full page remain live DOM.
import {mountScanFrames} from '/panda-original/scan-frame-player.js?v=68'

export async function mountSourceScan(root, mobile, options = {}) {
  options.signal?.throwIfAborted()
  const canvas = document.createElement('canvas')
  canvas.className = 'scanning-canvas'
  canvas.dataset.graphicsBackend = 'cpu-frames'
  root.append(canvas)
  let release
  try { release = await mountScanFrames(canvas, root, 'result', {
    ...options,
    bitmapFrames:true,
    keepMovingOnScroll:true,
    coverHeight:mobile ? 844 : 1080,
    width:mobile ? 390 : 960,
    height:mobile ? 844 : 540,
    assetRoot:`/panda-live/v3-scan-frames/${mobile?'mobile':'desktop'}`,
    owner:`v3-${mobile?'mobile':'desktop'}-original-frames`,
  }) } catch (error) { canvas.remove(); throw error }
  canvas.classList.add('ready')
  return () => { const drained = release(); canvas.remove(); return drained }
}
