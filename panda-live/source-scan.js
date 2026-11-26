// The archived homepage's ScanningHero shader, bloom and timing, mounted
// directly on its server-rendered markup without hydrating two Nuxt apps.
import {
  WebGPURenderer, TextureLoader, SRGBColorSpace, Vector2,
  MeshBasicNodeMaterial, Scene, OrthographicCamera, PlaneGeometry, Mesh,
  PostProcessing,
} from './_nuxt/Bg0mTsBZ.js'
import {
  abs, blendScreen, float, mod, mx_cell_noise_float, oneMinus,
  pass, smoothstep, texture, uniform, uv, vec2, vec3,
} from './_nuxt/3XksTj3q.js'
import { bloom } from './_nuxt/Cj48iegC.js'
import { disposeScanRenderer } from '/panda-original/shared-proof-device.js'

const COLOR = '/panda-live/_nuxt/hero-astronaut-wide.portfolio-1600.webp'
const DEPTH = '/panda-live/_nuxt/hero-astronaut-depth.portfolio-1600.webp'

const loadTexture = loader => url => new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject))

export async function mountSourceScan(root, mobile, options = {}) {
  const canvas = root.querySelector('.scanning-canvas') || document.createElement('canvas')
  canvas.classList.add('scanning-canvas')
  if (!canvas.parentElement) root.append(canvas)
  const renderer = new WebGPURenderer({
    canvas, antialias: false, alpha: true, depth: false, stencil: false,
    powerPreference: 'low-power', forceWebGL: true,
  })
  let phoneBrowser = matchMedia('(max-width:820px)').matches
  try { phoneBrowser ||= parent.matchMedia('(max-width:820px)').matches } catch {}
  const cleanup = [() => disposeScanRenderer(renderer, phoneBrowser)]
  let disposed = false
  let active = false
  let rootVisible = false
  let outerVisible = !window.frameElement && !options.visibilityElement
  let startedAt = 0
  let lastScan = NaN
  let inFlight = Promise.resolve()
  let initialization = Promise.resolve()
  let disposal

  const stop = () => {
    active = false
    renderer.setAnimationLoop(null)
  }
  const dispose = () => {
    if (disposed) return disposal
    disposed = true
    stop()
    disposal = Promise.allSettled([initialization, inFlight]).then(() => {
      // Resource deletion follows queued rendering; phone cleanup does not
      // synchronously finish or forcibly lose the native context.
      const texturesBefore = renderer.info.memory.textures
      while (cleanup.length) {
        try { cleanup.pop()() } catch {}
      }
      canvas.width = canvas.height = 1
      canvas.dataset.graphicsBackend = 'released'
      delete canvas.__pandaDispose
      canvas.remove()
      parent.postMessage({type:'portfolio-motion-released',texturesBefore,texturesAfter:renderer.info.memory.textures,owner:'v3-homepage'},location.origin)
    })
    parent.dispatchEvent(new CustomEvent('portfolio-gpu-retiring', {detail:disposal}))
    canvas.classList.remove('ready')
    return disposal
  }
  canvas.__pandaDispose = dispose

  try {
    initialization = renderer.init()
    await initialization
    canvas.dataset.graphicsBackend = renderer.backend.isWebGLBackend ? 'webgl' : 'webgpu'
    if (disposed) return dispose
    renderer.setClearColor(0, 0)

    const loader = new TextureLoader()
    initialization = Promise.all([COLOR, DEPTH].map(loadTexture(loader)))
    const [colorTexture, depthTexture] = await initialization
    cleanup.push(() => { colorTexture.dispose(); depthTexture.dispose() })
    if (disposed) return dispose
    colorTexture.colorSpace = SRGBColorSpace

    const pointer = uniform(new Vector2(0))
    const colorShift = uniform(new Vector2(0))
    const scan = uniform(-0.05)
    const depth = texture(depthTexture)
    const color = texture(colorTexture, uv().add(colorShift).add(depth.r.mul(pointer).mul(0.005)))
    const stretchedUv = vec2(uv().x.mul(float(1920).div(1080)), uv().y)
    const grid = mod(stretchedUv.mul(vec2(120)), 2).sub(1)
    const random = mx_cell_noise_float(stretchedUv.mul(vec2(120)).div(2))
    const points = float(smoothstep(0.5, 0.49, float(grid.length()))).mul(random)
    const band = oneMinus(smoothstep(0, 0.02, abs(depth.sub(scan))))
    const scanLight = points.mul(band).mul(vec3(10, 10, 10))
    const material = new MeshBasicNodeMaterial({ colorNode: blendScreen(color, scanLight) })
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 2)
    camera.position.z = 1
    const geometry = new PlaneGeometry(2, 2)
    const plane = new Mesh(geometry, material)
    scene.add(plane)
    cleanup.push(() => { geometry.dispose(); material.dispose() })

    const post = new PostProcessing(renderer)
    const scenePass = pass(scene, camera)
    const rendered = scenePass.getTextureNode('output')
    const bloomPass = bloom(rendered, 0.8, 0.5, 1)
    post.outputNode = rendered.add(bloomPass)
    cleanup.push(() => { bloomPass.dispose(); scenePass.dispose(); post.dispose() })
    const fit = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      if (!width || !height) return
      const displayedWidth = options.visibilityElement?.getBoundingClientRect().width ?? window.frameElement?.getBoundingClientRect().width ?? width
      const physicalRatio = Math.min(devicePixelRatio || 1, displayedWidth / width * (devicePixelRatio || 1))
      renderer.setPixelRatio(Math.max(0.18, Math.min(mobile ? 0.6 : 0.28, physicalRatio)))
      renderer.setSize(width, height, false)
      const ratio = width / height
      const sourceRatio = 1920 / 1080
      const touch = width <= 900 && (matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0)
      colorShift.value.set(touch ? 0.03 * Math.max(0, 1 - ratio / sourceRatio) : 0, 0)
      if (ratio < sourceRatio) {
        const horizontalScale = sourceRatio / ratio
        plane.scale.set(horizontalScale, 1, 1)
        plane.position.x = (horizontalScale - 1) * (1 - 2 * (width <= 900 ? 0.8 : 1))
      } else {
        plane.scale.set(1, ratio / sourceRatio, 1)
        plane.position.x = 0
      }
    }
    fit()
    const resizeObserver = new ResizeObserver(fit)
    resizeObserver.observe(root)
    cleanup.push(() => resizeObserver.disconnect())

    const onPointer = event => {
      if (!active) return
      const rect = root.getBoundingClientRect()
      pointer.value.set((event.clientX - rect.left) / rect.width * 2 - 1,
        -((event.clientY - rect.top) / rect.height * 2 - 1))
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    cleanup.push(() => window.removeEventListener('pointermove', onPointer))

    inFlight = post.renderAsync()
    await inFlight
    if (disposed) return dispose
    let renderPending = false
    const draw = () => {
      if (!active || renderPending) return
      const elapsed = (performance.now() - startedAt) / 1000 % 10
      const progress = Math.min(1, elapsed / 3.2)
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - 2 * (1 - progress) ** 2
      const nextScan = -0.05 + 1.1 * eased
      if (Math.abs(nextScan - lastScan) < 0.0002) return
      scan.value = nextScan
      lastScan = nextScan
      canvas.dataset.scan = nextScan.toFixed(3)
      canvas.dataset.renderedFrames = String(Number(canvas.dataset.renderedFrames || 0) + 1)
      renderPending = true
      inFlight = post.renderAsync()
        .catch(error => console.warn('[PandaAI] Source scan render failed', error))
        .finally(() => { renderPending = false })
    }
    const visibleElement = options.visibilityElement || window.frameElement
    const sync = () => {
      // A native scroll rebase can deliver an observer entry calculated before
      // the cover returned. Use the current outer position rather than leaving
      // a visible hero paused until another intersection threshold is crossed.
      if (visibleElement) {
        const rect = visibleElement.getBoundingClientRect()
        outerVisible = rect.bottom > 0 && rect.top < parent.innerHeight
          && rect.right > 0 && rect.left < parent.innerWidth
      }
      const next = rootVisible && outerVisible && !document.hidden
      if (next === active) return
      active = next
      if (active) {
        if (!startedAt) startedAt = performance.now()
        renderer.setAnimationLoop(draw)
      } else renderer.setAnimationLoop(null)
    }
    const scroller = options.scroller || document.getElementById('panda-lite-scroll')
    const rootObserver = new IntersectionObserver(([entry]) => { rootVisible = !!entry?.isIntersecting; sync() }, { root: scroller })
    rootObserver.observe(root)
    cleanup.push(() => rootObserver.disconnect())
    if (visibleElement && parent.IntersectionObserver) {
      const outerObserver = new parent.IntersectionObserver(([entry]) => { outerVisible = !!entry?.isIntersecting; sync() })
      outerObserver.observe(visibleElement)
      cleanup.push(() => outerObserver.disconnect())
      parent.addEventListener('scroll', sync, { passive: true })
      cleanup.push(() => parent.removeEventListener('scroll', sync))
    }
    document.addEventListener('visibilitychange', sync)
    cleanup.push(() => document.removeEventListener('visibilitychange', sync))
    canvas.classList.add('ready')
    parent.postMessage({ type: 'panda-live-motion-ready', mode: mobile ? 'mobile' : 'desktop' }, location.origin)
    sync()
    return dispose
  } catch (error) {
    dispose()
    throw error
  }
}
