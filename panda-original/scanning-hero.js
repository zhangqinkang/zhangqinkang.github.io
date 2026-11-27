import * as THREE from './Bg0mTsBZ.js'
import {
  abs,
  blendScreen,
  float,
  mod,
  mix,
  add,
  mx_cell_noise_float,
  oneMinus,
  pass,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
} from './Bah-O4QU.js'
import { bloom } from './C-MVqCbY.js'
import { acquireProofDevice, disposeScanRenderer } from './shared-proof-device.js'

const loadTexture = (loader, url) => new Promise((resolve, reject) => {
  loader.load(url, resolve, undefined, reject)
})
const scanLibrary = {THREE, abs, blendScreen, float, mod, mix, add, mx_cell_noise_float, oneMinus, pass, smoothstep, texture, uniform, uv, vec2, vec3, bloom}

export async function mountScanningHero(canvas, root, colorUrl, depthUrl, options = {}) {
  let disposed = false
  // Phone proof cards use the same node material and post-processing through
  // WebGL2. Android can expose WebGPU while its adapter cannot render this
  // embedded surface; choosing the backend explicitly avoids a blank canvas.
  let phoneProof = false
  try { phoneProof = Boolean(window.frameElement?.closest('.panda-proof-live-preview')) && parent.matchMedia('(max-width: 820px)').matches } catch {}
  // Three/node IDs and caches belong to a module instance. Sharing a renderer
  // also requires both scenes to use that same instance across iframe realms.
  const library = phoneProof ? parent.__portfolioSharedScanDevice?.library ?? scanLibrary : scanLibrary
  const {THREE, abs, blendScreen, float, mod, mix, add, mx_cell_noise_float, oneMinus, pass, smoothstep, texture, uniform, uv, vec2, vec3, bloom} = library
  // Present the archived image while the embedded app and scan each get
  // their own frame for initialization.
  try {
    if (window.frameElement?.matches('.panda-v3-live-frame')) {
      await top.__portfolioPandaFrame?.()
      if (!canvas.isConnected) return () => {}
    }
  } catch {}
  const copyProof = phoneProof
  let mobileBrowser = matchMedia('(max-width:820px)').matches
  // Embedded viewport dimensions describe the mockup, not the host device.
  try { mobileBrowser = top.matchMedia('(max-width:820px)').matches } catch {}
  // Keep the original node material/bloom, but use WebGL on every phone
  // surface, including project covers before the proof chapter.
  const device = phoneProof ? acquireProofDevice(surface => new THREE.WebGPURenderer({canvas:surface, antialias:false, alpha:true, forceWebGL:true, preserveDrawingBuffer:true}), library) : null
  const renderer = device?.renderer ?? new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true, forceWebGL: mobileBrowser })
  const gpuCanvas = device?.canvas ?? canvas
  canvas.dataset.scanDisplayMode = device ? 'shared-copy' : 'native'
  let rendererReady = false
  let rendererRelease
  let disposal = Promise.resolve()
  let inFlight = Promise.resolve()
  let initialization = Promise.resolve()
  const releaseRenderer = () => {
    if (rendererRelease) return rendererRelease
    if (!rendererReady && !device) return Promise.resolve()
    // Let submitted rendering finish before disposing. Context loss during
    // a scrolling frame can destabilize phone GPU processes.
    rendererRelease = inFlight.catch(() => {}).then(async () => {
      if (device) await device.release()
      else {
        disposeScanRenderer(renderer, mobileBrowser)
      }
      canvas.width = canvas.height = 1
      canvas.dataset.graphicsBackend = 'released'
      delete canvas.__pandaDispose
    })
    return rendererRelease
  }
  // A card can leave the viewport while textures are still loading.
  canvas.__pandaDispose = () => {
    disposed = true
    disposal = initialization.catch(() => {}).then(releaseRenderer)
    parent.dispatchEvent(new CustomEvent('portfolio-gpu-retiring', {detail:disposal}))
    return disposal
  }
  initialization = device?.ready ?? renderer.init()
  try { await initialization } catch (error) {
    await releaseRenderer().catch(() => {})
    throw error
  }
  rendererReady = true
  gpuCanvas.dataset.graphicsBackend = renderer.backend.isWebGLBackend ? 'webgl' : 'webgpu'
  if (disposed) {
    await releaseRenderer()
    return () => disposal
  }
  renderer.setClearColor(0, 0)
  // Proof frames display the finished pixels from the shared parent device.
  // The node material, scan timing, depth displacement and bloom stay intact.
  const displayCanvas = copyProof ? canvas : null
  const displayContext = displayCanvas?.getContext('2d', { alpha: true })
  if (displayCanvas) displayCanvas.dataset.scanDisplay = 'true'
  let painting = false

  const loader = new THREE.TextureLoader()
  initialization = Promise.all([
    loadTexture(loader, colorUrl),
    loadTexture(loader, depthUrl),
  ])
  const [colorTexture, depthTexture] = await initialization
  if (disposed) {
    colorTexture.dispose()
    depthTexture.dispose()
    displayCanvas?.remove()
    await releaseRenderer()
    return () => disposal
  }
  colorTexture.colorSpace = THREE.SRGBColorSpace
  const imageAspect = colorTexture.image.width / colorTexture.image.height

  const pointer = uniform(new THREE.Vector2(0))
  const scan = uniform(-0.05)
  const displacementStrength = options.original21st ? 0.01 : (options.lockPosition ? 0 : 0.005)
  const depthNode = texture(depthTexture)
  const displacedColor = texture(
    colorTexture,
    uv().add(depthNode.r.mul(pointer).mul(displacementStrength)),
  )

  const aspect = float(imageAspect)
  const scaledUv = vec2(uv().x.mul(aspect), uv().y)
  const grid = vec2(120)
  const pointUv = mod(scaledUv.mul(grid), 2).sub(1)
  const cellNoise = mx_cell_noise_float(scaledUv.mul(grid).div(2))
  const distance = float(pointUv.length())
  const roundPoints = float(smoothstep(0.5, 0.49, distance)).mul(cellNoise)
  const depthBand = oneMinus(smoothstep(0, 0.02, abs(depthNode.sub(scan))))
  const scanMask = roundPoints.mul(depthBand)
  // The overlay variant sits above the untouched hero image. Boost its alpha
  // independently from the colour so the scan stays legible after device
  // scaling without repainting (and shifting) the astronaut underneath.
  const scanOpacity = smoothstep(0, 0.22, scanMask)
  const scanLight = scanMask.mul(options.original21st ? vec3(10, 0, 0) : vec3(10, 10, 10))
  const composited = blendScreen(displacedColor, scanLight)

  const material = new THREE.MeshBasicNodeMaterial(options.overlayOnly
    ? {
        colorNode: vec3(1.8, 1.8, 1.8),
        opacityNode: scanOpacity,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }
    : { colorNode: composited })
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2)
  camera.position.z = 1
  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  let phoneRasterSize = ''
  let renderSize = {width:1, height:1, pixelRatio:1}
  const resize = () => {
    const width = root.clientWidth
    const height = root.clientHeight
    if (!width || !height) return
    const displayedRatio = root.getBoundingClientRect().width / width || 1
    const visiblePixels = Math.max(.5, displayedRatio * window.devicePixelRatio)
    const mobileLimit = mobileBrowser && options.fitCover ? 1.25 : 2
    let pixelRatio = Math.min(visiblePixels, mobileLimit, options.maxPixelRatio ?? 2)
    if (phoneProof) {
      // Size the scan buffers for the physical pixels of the fitted card,
      // rather than a fixed fraction of its 1440px virtual desktop viewport.
      // DOM copy stays sharp; scan timing, depth, material and bloom are unchanged.
      const fittedWidth = window.frameElement.getBoundingClientRect().width
      pixelRatio = Math.min(0.5, Math.max(0.125, fittedWidth * parent.devicePixelRatio / width))
    }
    if (phoneProof) {
      const nextSize = `${width}:${height}:${pixelRatio}`
      // ResizeObserver delivers the initial size after the explicit resize.
      // Writing the same canvas dimensions erases the already-ready first frame.
      if (nextSize === phoneRasterSize) return
      phoneRasterSize = nextSize
    }
    // Keep the original cover renderer untouched unless an embedded showcase
    // explicitly opts into a lower DPR.
    renderSize = {width, height, pixelRatio}
    if (!device) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(width, height, false)
    }
    if (displayCanvas) {
      displayCanvas.width = Math.floor(width * pixelRatio)
      displayCanvas.height = Math.floor(height * pixelRatio)
    }
    const currentAspect = width / height
    const portraitAsset = imageAspect < 1
    if (options.original21st) {
      // Preserve the established showcase size while keeping the source
      // object square inside differently shaped cards.
      const scaleY = 0.6
      mesh.scale.set(scaleY / currentAspect, scaleY, 1)
      mesh.position.set(0, 0, 0)
      return
    }
    if (options.fitCover) {
      // Match CSS `object-fit: cover` exactly so the static image and the
      // rendered scan occupy the same pixels during the startup hand-off.
      const objectPositionX = options.objectPositionX ?? 0.5
      const coverScaleX = options.coverScaleX ?? 1
      if (currentAspect < imageAspect) {
        const scaleX = imageAspect / currentAspect * coverScaleX
        mesh.scale.set(scaleX, 1, 1)
        mesh.position.set((scaleX - 1) * (1 - 2 * objectPositionX), 0, 0)
      } else {
        mesh.scale.set(coverScaleX, currentAspect / imageAspect, 1)
        mesh.position.set(0, 0, 0)
      }
      return
    }
    const portraitScaleX = options.portraitScaleX ?? 0.62
    const portraitScaleY = options.portraitScaleY ?? 0.58
    const desktopScale = options.desktopScale ?? 0.94
    const lockedPortraitOffsetX = options.lockPosition ? (options.portraitOffsetX ?? -0.038) : 0
    if (currentAspect < imageAspect) {
      const scale = imageAspect / currentAspect
      const scaleX = scale * (portraitAsset ? portraitScaleX : desktopScale)
      mesh.scale.set(scaleX, portraitAsset ? portraitScaleY : desktopScale, 1)
      mesh.position.x = portraitAsset
        ? (options.portraitPositionX ?? 1 - scaleX + lockedPortraitOffsetX)
        : (options.desktopPositionX ?? 1 - scaleX)
    } else {
      mesh.scale.set(
        portraitAsset ? portraitScaleX : desktopScale,
        currentAspect / imageAspect * (portraitAsset ? portraitScaleY : desktopScale),
        1,
      )
      mesh.position.x = portraitAsset
        ? (options.portraitPositionX ?? 1 - portraitScaleX + lockedPortraitOffsetX)
        : (options.desktopPositionX ?? (options.alignRight ? 1 - desktopScale : 0))
    }
    mesh.position.y = portraitAsset
      ? (options.portraitPositionY ?? -0.42)
      : (options.desktopPositionY ?? -0.06)
  }
  resize()
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(root)
  const proofCard = phoneProof ? window.frameElement.closest('.panda-live-single-screen') : null
  if (proofCard) resizeObserver.observe(proofCard)

  let targetX = 0
  let targetY = 0
  const onPointerMove = event => {
    if (!active) return
    const rect = root.getBoundingClientRect()
    targetX = (event.clientX - rect.left) / rect.width * 2 - 1
    targetY = -((event.clientY - rect.top) / rect.height * 2 - 1)
  }
  if (!options.lockPosition) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  const postProcessing = new THREE.PostProcessing(renderer)
  const scenePass = pass(scene, camera)
  const output = scenePass.getTextureNode('output')
  const bloomPass = bloom(output, options.original21st ? 1 : 0.8, 0.5, 1)
  if (options.original21st && !options.hideFullScanLine) {
    const scanLine = smoothstep(0, float(0.05), abs(uv().y.sub(scan)))
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4)
    postProcessing.outputNode = mix(output, add(output, redOverlay), smoothstep(0.9, 1, oneMinus(scanLine))).add(bloomPass)
  } else {
    postProcessing.outputNode = output.add(bloomPass)
  }

  const entryBounds = root.getBoundingClientRect()
  let active = phoneProof || entryBounds.bottom > 0 && entryBounds.top < innerHeight
  let shown = false
  let inPhoneViewport = true
  let lastRenderedAt = 0
  const framesPerSecond = Number.isFinite(options.fps) && options.fps > 0 ? options.fps : mobileBrowser && options.fitCover ? 30 : 0
  const hasFrameCap = framesPerSecond > 0
  const frameInterval = hasFrameCap ? 1000 / framesPerSecond : 0
  let startedAt = performance.now()
  const render = () => {
    if (disposed || painting) return
    const now = performance.now()
    const interval = phoneProof ? (inPhoneViewport ? Math.max(frameInterval, 1000 / 24) : 250) : frameInterval
    if (interval && now - lastRenderedAt < interval) return
    lastRenderedAt = now
    canvas.__pandaRenderedFrames = (canvas.__pandaRenderedFrames ?? 0) + 1
    if (canvas.__pandaRenderedFrames % 10 === 0) {
      canvas.dataset.renderedFrames = String(canvas.__pandaRenderedFrames)
    }
    const delta = 1 - Math.exp(-16.667 / 170)
    pointer.value.x += (targetX - pointer.value.x) * delta
    pointer.value.y += (targetY - pointer.value.y) * delta

    if (options.original21st) {
      scan.value = Math.sin((now - startedAt) / 1000 * 0.5) * 0.5 + 0.5
    } else {
      const cycle = ((now - startedAt) / 1000) % 10
      const progress = Math.min(cycle / 3.2, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      scan.value = -0.05 + 1.1 * eased
    }

    painting = true
    const draw = () => options.overlayOnly ? renderer.renderAsync(scene, camera) : postProcessing.renderAsync()
    if (phoneProof) {
      inFlight = device.submit(async () => {
        if (disposed) return
        renderer.setPixelRatio(renderSize.pixelRatio)
        renderer.setSize(renderSize.width, renderSize.height, false)
        await draw()
        if (disposed) return
        displayContext?.clearRect(0, 0, canvas.width, canvas.height)
        displayContext?.drawImage(gpuCanvas, 0, 0)
        // Some phone GPU backends resolve the first submitted render before
        // drawImage can copy its pixels. Keep warming until the display surface
        // has actual content; a transparent copy must never announce readiness.
        if (!shown && displayContext) {
          const pixels = displayContext.getImageData(0, 0, canvas.width, canvas.height).data
          let hasPixels = false
          for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i]) { hasPixels = true; break }
          }
          if (!hasPixels) return
        }
        if (displayCanvas) {
          displayCanvas.style.opacity = '1'
          displayCanvas.__pandaRenderedFrames = canvas.__pandaRenderedFrames
        }
        if (!shown) {
          shown = true
          canvas.style.opacity = '1'
          parent.postMessage({type:'portfolio-motion-ready', owner:location.pathname, displayMode:canvas.dataset.scanDisplayMode, width:canvas.width, height:canvas.height}, location.origin)
          canvas.dispatchEvent(new Event('panda-scan-ready'))
        }
        if (!inPhoneViewport) { active = false; stopLoop() }
      }).catch(error => {
        if (disposed) return
        canvas.dataset.renderError = String(error)
        parent.postMessage({type:'portfolio-motion-error',message:String(error)}, location.origin)
        active = false
        stopLoop()
      }).finally(() => { painting = false })
    } else {
      inFlight = Promise.resolve().then(draw).then(() => {
        if (!disposed && !shown) {
          shown = true
          canvas.style.opacity = '1'
          canvas.dispatchEvent(new Event('panda-scan-ready'))
        }
      }).catch(error => {
        if (disposed) return
        canvas.dataset.renderError = String(error)
        active = false
        stopLoop()
      }).finally(() => { painting = false })
    }
  }
  let animationFrame = 0
  const loop = () => {
    if (!active) {
      animationFrame = 0
      return
    }
    render()
    animationFrame = requestAnimationFrame(loop)
  }
  const startLoop = () => {
    if (hasFrameCap || phoneProof) {
      if (!animationFrame) animationFrame = requestAnimationFrame(loop)
    } else {
      renderer.setAnimationLoop(render)
    }
  }
  const stopLoop = () => {
    if ((hasFrameCap || phoneProof) && animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = 0
    if (!hasFrameCap && !phoneProof) renderer.setAnimationLoop(null)
  }
  if (active) startLoop()
  // Offscreen phone iframes can suspend rAF. Warm an actual original shader
  // frame directly, with bounded retries until its display copy has pixels.
  const warmTimer = phoneProof ? setInterval(() => {
    if (!shown && !disposed) render()
  }, 250) : 0
  if (phoneProof) {
    startedAt = performance.now() - 500
    render()
  }

  const intersectionObserver = new IntersectionObserver(entries => {
    const entering = !inPhoneViewport && entries[0]?.isIntersecting
    inPhoneViewport = entries[0]?.isIntersecting ?? true
    if (phoneProof && entering) startedAt = performance.now() - 500
    const isVisible = inPhoneViewport || phoneProof && !shown
    if (isVisible === active) return
    active = isVisible
    if (active) startLoop()
    else stopLoop()
  })
  intersectionObserver.observe(root)

  const onPageHide = event => { if (!event.persisted) dispose() }
  const dispose = () => {
    if (disposed) return disposal
    disposed = true
    clearInterval(warmTimer)
    window.removeEventListener('pagehide', onPageHide)
    intersectionObserver.disconnect()
    resizeObserver.disconnect()
    if (!options.lockPosition) {
      window.removeEventListener('pointermove', onPointerMove)
    }
    stopLoop()
    const releaseScene = () => {
      const texturesBefore = renderer.info.memory.textures
      bloomPass.dispose()
      scenePass.dispose()
      postProcessing.dispose()
      geometry.dispose()
      material.dispose()
      colorTexture.dispose()
      depthTexture.dispose()
      const texturesAfter = renderer.info.memory.textures
      try { parent.postMessage({type:'portfolio-motion-released',texturesBefore,texturesAfter},location.origin) } catch {}
    }
    disposal = inFlight.catch(() => {}).then(async () => {
      if (device) await device.submit(releaseScene)
      else releaseScene()
      await releaseRenderer()
      if (displayCanvas && displayCanvas !== canvas) displayCanvas.remove()
    })
    parent.dispatchEvent(new CustomEvent('portfolio-gpu-retiring', {detail:disposal}))
    return disposal
  }
  canvas.__pandaDispose = dispose
  if (phoneProof) window.addEventListener('pagehide', onPageHide)
  return dispose
}
