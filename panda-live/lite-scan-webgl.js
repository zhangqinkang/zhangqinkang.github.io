// The V3 embed keeps the source hero's depth-driven scan, grid, and ten-second
// timing. It renders at the number of physical pixels visible in the device
// mockups, so iOS does not allocate two full-size WebGPU scenes.
const COLOR = '/panda-live/hero-embed-color.webp'
const DEPTH = '/panda-live/hero-embed-depth.webp'

const vertexSource = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * .5 + .5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentSource = `#version 300 es
precision highp float;
precision highp int;
in vec2 vUv;
out vec4 outputColor;
uniform sampler2D uColor;
uniform sampler2D uDepth;
uniform vec2 uCrop;
uniform float uCropWidth;
uniform float uScan;

uint rotl32(uint value, int bits) {
  return (value << uint(bits)) | (value >> uint(32 - bits));
}

uint bjfinal(uint a, uint b, uint c) {
  c ^= b; c -= rotl32(b, 14);
  a ^= c; a -= rotl32(c, 11);
  b ^= a; b -= rotl32(a, 25);
  c ^= b; c -= rotl32(b, 16);
  a ^= c; a -= rotl32(c, 4);
  b ^= a; b -= rotl32(a, 14);
  c ^= b; c -= rotl32(b, 24);
  return c;
}

float cellNoise(vec2 cell) {
  ivec2 position = ivec2(floor(cell));
  uint seed = 0xdeadbeefu + (2u << 2u) + 13u;
  return float(bjfinal(seed + uint(position.x), seed + uint(position.y), seed)) / 4294967295.0;
}

void main() {
  vec2 sourceUv = vec2(uCrop.x + vUv.x * uCropWidth, uCrop.y + vUv.y);
  vec3 color = texture(uColor, sourceUv).rgb;
  float depth = texture(uDepth, sourceUv).r;
  vec2 scaledUv = vec2(sourceUv.x * (16.0 / 9.0), sourceUv.y);
  vec2 gridUv = scaledUv * 120.0;
  vec2 pointUv = mod(gridUv, 2.0) - 1.0;
  float pointDistance = length(pointUv);
  float noise = cellNoise(gridUv / 2.0);
  float roundPoints = 1.0 - smoothstep(0.49, 0.50, pointDistance);
  float depthBand = 1.0 - smoothstep(0.0, 0.020, abs(depth - uScan));
  float scanMask = roundPoints * noise * depthBand;
  float scanLight = clamp(scanMask * 10.0, 0.0, 1.0);
  // Source material uses screen blending for the white scan points.
  color = 1.0 - (1.0 - color) * (1.0 - vec3(scanLight));
  // The source post-processing adds a short bloom around the same points.
  float halo = (1.0 - smoothstep(0.35, 1.25, pointDistance))
    * noise * (1.0 - smoothstep(0.015, 0.070, abs(depth - uScan))) * 0.34;
  color = 1.0 - (1.0 - color) * (1.0 - vec3(halo));
  outputColor = vec4(color, 1.0);
}`

function loadImage(url) {
  const image = new Image()
  image.decoding = 'async'
  image.src = url
  return image.decode().then(() => image)
}

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(message || 'Scan shader compilation failed')
  }
  return shader
}

export async function mountLiteScan(root, mobile, options = {}) {
  const canvas = document.createElement('canvas')
  canvas.className = 'panda-lite-scan'
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.opacity = '0'
  root.append(canvas)

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    desynchronized: true,
    powerPreference: 'low-power',
  })
  if (!gl) throw new Error('WebGL2 unavailable')

  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || 'Scan shader link failed')
  }
  gl.useProgram(program)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  gl.uniform1i(gl.getUniformLocation(program, 'uColor'), 0)
  gl.uniform1i(gl.getUniformLocation(program, 'uDepth'), 1)
  const cropLocation = gl.getUniformLocation(program, 'uCrop')
  const cropWidthLocation = gl.getUniformLocation(program, 'uCropWidth')
  const scanLocation = gl.getUniformLocation(program, 'uScan')

  const images = await Promise.all([loadImage(COLOR), loadImage(DEPTH)])
  const textures = images.map((image, index) => {
    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0 + index)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    return texture
  })

  const fit = () => {
    const width = root.clientWidth
    const height = root.clientHeight
    if (!width || !height) return
    const targetWidth = mobile ? 540 : 1200
    const scale = targetWidth / width
    const pixelWidth = Math.max(1, Math.round(width * scale))
    const pixelHeight = Math.max(1, Math.round(height * scale))
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
      gl.viewport(0, 0, pixelWidth, pixelHeight)
    }
    const cropWidth = Math.min(1, width / height / (16 / 9))
    const sourceLeft = (1 - cropWidth) * (mobile ? 0.8 : 1)
    gl.uniform2f(cropLocation, sourceLeft, 0)
    gl.uniform1f(cropWidthLocation, cropWidth)
  }
  fit()
  const resizeObserver = new ResizeObserver(fit)
  resizeObserver.observe(root)

  let startedAt = 0
  let lastPaintAt = 0
  let lastCycle = -1
  let frame = 0
  let active = false
  let rootVisible = false
  let frameVisible = false
  let painted = 0
  const paint = now => {
    frame = 0
    if (!active || gl.isContextLost()) return
    const cycle = Math.floor((now - startedAt) / 10000)
    const phase = ((now - startedAt) % 10000) / 1000
    if (phase < 3.2 && now - lastPaintAt >= 1000 / 24 || cycle !== lastCycle || phase >= 3.2 && lastCycle !== cycle + 0.5) {
      const progress = Math.min(1, phase / 3.2)
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const scan = -0.05 + 1.1 * eased
      gl.uniform1f(scanLocation, scan)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      canvas.dataset.scan = scan.toFixed(3)
      canvas.dataset.renderedFrames = String(++painted)
      canvas.style.opacity = '1'
      lastPaintAt = now
      lastCycle = phase >= 3.2 ? cycle + 0.5 : cycle
    }
    frame = requestAnimationFrame(paint)
  }
  const sync = () => {
    const shouldRun = rootVisible && frameVisible && !document.hidden && !gl.isContextLost()
    if (shouldRun === active) return
    active = shouldRun
    if (active) {
      if (!startedAt) startedAt = performance.now()
      frame = requestAnimationFrame(paint)
    } else if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
  const scroller = options.scroller || document.getElementById('panda-lite-scroll')
  const rootObserver = new IntersectionObserver(([entry]) => {
    rootVisible = !!entry?.isIntersecting
    sync()
  }, { root: scroller, threshold: 0 })
  rootObserver.observe(root)
  const frameElement = options.visibilityElement || window.frameElement
  const observerWindow = options.visibilityElement ? window : parent
  const parentObserver = new observerWindow.IntersectionObserver(([entry]) => {
    frameVisible = !!entry?.isIntersecting
    sync()
  }, { threshold: 0 })
  if (frameElement) parentObserver.observe(frameElement)
  else frameVisible = true
  document.addEventListener('visibilitychange', sync)
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault()
    canvas.style.opacity = '0'
    sync()
  })
  canvas.addEventListener('webglcontextrestored', () => {
    dispose()
    canvas.remove()
    const restores = Number(window.__pandaLiteScanRestores || 0)
    if (restores < 1) {
      window.__pandaLiteScanRestores = restores + 1
      void mountLiteScan(root, mobile, options)
    }
  }, { once: true })
  const dispose = () => {
    active = false
    if (frame) cancelAnimationFrame(frame)
    rootObserver.disconnect()
    parentObserver.disconnect()
    resizeObserver.disconnect()
    document.removeEventListener('visibilitychange', sync)
    textures.forEach(texture => gl.deleteTexture(texture))
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
  }
  return dispose
}
