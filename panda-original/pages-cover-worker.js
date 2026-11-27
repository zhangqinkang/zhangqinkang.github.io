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

async function launchCover({canvas, colorUrl, depthUrl, options}) {
  const renderer = new THREE.WebGPURenderer({canvas, antialias:true, alpha:true, forceWebGL:true});
  await renderer.init();
  renderer.setClearColor(0, 0);

  async function loadTexture(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Scan texture ${response.status}`);
    const bitmap = await createImageBitmap(await response.blob());
    const image = new THREE.Texture(bitmap);
    image.needsUpdate = true;
    return image;
  }
  const [colorTexture, depthTexture] = await Promise.all([loadTexture(colorUrl), loadTexture(depthUrl)]);
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

  let width = 0, height = 0, ratio = 0, visible = false;
  let targetX = 0, targetY = 0;
  let ready = false, drawing = false, animationFrame = 0, lastRender = 0;
  const startedAt = performance.now();
  const frameInterval = 1000 / (options.fps > 0 ? options.fps : 30);

  function resize(next) {
    if (width === next.width && height === next.height && ratio === next.ratio) return;
    ({width, height, ratio} = next);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    const currentAspect = width / height;
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
  }

  async function frame(now) {
    animationFrame = visible ? requestAnimationFrame(frame) : 0;
    if (!visible || !width || drawing || now - lastRender < frameInterval) return;
    lastRender = now;
    drawing = true;
    const delta = 1 - Math.exp(-16.667 / 170)
    pointer.value.x += (targetX - pointer.value.x) * delta
    pointer.value.y += (targetY - pointer.value.y) * delta
    const cycle = ((now - startedAt) / 1000) % 10
    const progress = Math.min(cycle / 3.2, 1)
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
    scan.value = -0.05 + 1.1 * eased
    try {
      await postProcessing.renderAsync();
      if (!ready) {
        ready = true;
        postMessage({type:'ready'});
      }
    } catch {
      postMessage({type:'error'});
    } finally {
      drawing = false;
    }
  }

  return next => {
    resize(next);
    ({visible, targetX, targetY} = next);
    if (visible && !animationFrame) animationFrame = requestAnimationFrame(frame);
  };
}

let applyState, pendingState;
self.onmessage = async ({data}) => {
  try {
    if (data.type === 'start') {
      applyState = await launchCover(data);
      if (pendingState) applyState(pendingState);
    } else if (data.type === 'state') {
      pendingState = data;
      applyState?.(data);
    }
  } catch {
    postMessage({type:'error'});
  }
};
