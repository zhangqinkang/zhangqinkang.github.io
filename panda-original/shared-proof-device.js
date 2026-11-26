// One device belongs to the parent document; individual proof frames own their
// scenes and copy the finished original pixels before releasing the queue.
const key = '__portfolioSharedScanDevice'

export function disposeScanRenderer(renderer, avoidForcedLoss = false) {
  const backend = renderer.backend
  if (!avoidForcedLoss || !backend.isWebGLBackend) { renderer.dispose(); return }
  const disposeBackend = backend.dispose
  // Three's WebGL backend dispose forcibly calls WEBGL_lose_context. Resource
  // disposal still runs; retire the canvas normally without forcing a loss in
  // the phone GPU process while another surface is being initialized.
  backend.dispose = () => renderer.domElement.removeEventListener('webglcontextlost', backend._onContextLost)
  try { renderer.dispose() } finally { backend.dispose = disposeBackend }
}

export function acquireProofDevice(createRenderer, library) {
  const owner = parent
  let device = owner[key]
  if (!device) {
    const canvas = owner.document.createElement('canvas')
    canvas.dataset.sharedScanDevice = 'true'
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none'
    owner.document.body.append(canvas)
    const renderer = createRenderer(canvas)
    let queue = Promise.resolve()
    device = {
      canvas, renderer, library, users:0, ready:renderer.init(),
      submit(work) {
        const result = queue.then(work)
        queue = result.catch(() => {})
        return result
      },
      release() {
        return this.submit(async () => {
          if (--this.users) return
          try {
            await this.ready
            disposeScanRenderer(renderer, true)
          } finally {
            canvas.width = canvas.height = 1
            canvas.remove()
            if (owner[key] === this) delete owner[key]
          }
        })
      },
    }
    owner[key] = device
  }
  device.users++
  return device
}
