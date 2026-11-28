const params = new URLSearchParams(location.search)
const sourceMobile = params.get('embed') === 'source-mobile'
const mobile = params.has('mobile') || sourceMobile
const mode = mobile ? 'mobile' : 'desktop'
const embedded = params.has('embed') || params.has('mobile')
const proof = params.get('proof')
let phoneProof = false
try { phoneProof = Boolean(window.frameElement?.closest('.panda-proof-live-preview')) && parent.matchMedia('(max-width:820px)').matches } catch {}

if (proof) {
  const proofSelectors = {
    hero: '.hero',
    'curved-loop': '.curved-loop-jacket',
    'scroll-stack': '.tpl-section',
    'logo-loop': '.partner-editorial-section',
    'workflow-motion': '.loop-section',
    'persona-carousel': '.persona-head',
    'community-cards': '.comm-section',
    'finance-direction': '.hero',
  }
  const announceProofReady = async (target, extraDelay = 0) => {
    // A parsed section is not necessarily the frame visitors should see:
    // fonts, local images and the archived site's scroll restoration can still
    // change its position. Keep the parent cover in place until that settles.
    try {
      await document.fonts.ready
    } catch {}
    const visibleImages = [...target.querySelectorAll('img')].filter(image => {
      const rect = image.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < innerHeight
    })
    await Promise.all(visibleImages.map(image => image.decode().catch(() => {})))
    if (extraDelay) await new Promise(resolve => setTimeout(resolve, extraDelay))
    const post = () => { if (target.isConnected) window.parent.postMessage({ type: 'panda-proof-ready', proof }, location.origin) }
    if (phoneProof) post()
    else requestAnimationFrame(() => requestAnimationFrame(post))
  }
  const focusProof = () => {
    const selector = proofSelectors[proof]
    const matchedTarget = selector && document.querySelector(selector)
    const target = proof === 'persona-carousel' ? matchedTarget?.closest('section') : matchedTarget
    if (!target || (proof === 'curved-loop' && !target.querySelector('textPath'))) {
      if (phoneProof) setTimeout(focusProof, 40)
      else requestAnimationFrame(focusProof)
      return
    }
    // Keep the complete hydrated PandaAI page intact. Removing a section from
    // the Nuxt tree changes inherited styles, viewport geometry and animation
    // ownership. The proof frame is simply a real 1440 × 900 browser viewport
    // positioned at the corresponding section, exactly like visiting the site.
    target.classList.add('is-inview', 'is-active')
    target.style.visibility = 'visible'

    // Keep the complete PandaAI page for this proof, but lock its real curved
    // section to the viewport. The site's smooth-scroll controller otherwise
    // drifts back toward the homepage and leaves the key motion off-centre.
    if (proof === 'curved-loop') {
      Object.assign(target.style, {
        minHeight: '100vh',
        width: '100%',
        margin: '0',
        padding: '0',
      })
      document.documentElement.style.scrollBehavior = 'auto'
      const sectionTop = target.getBoundingClientRect().top + scrollY
      const lockSection = () => {
        scrollTo(0, sectionTop)
        requestAnimationFrame(lockSection)
      }
      requestAnimationFrame(lockSection)
      void announceProofReady(target)
      return
    }
    const targetRect = target.getBoundingClientRect()
    const sectionTop = targetRect.top + scrollY
    scrollTo(0, sectionTop)
    if (proof !== 'scroll-stack') {
      const keepProofInView = () => {
        const currentMatch = document.querySelector(selector)
        const currentTarget = proof === 'persona-carousel' ? currentMatch?.closest('section') : currentMatch
        if (currentTarget) {
          const offset = currentTarget.getBoundingClientRect().top
          if (Math.abs(offset) > 2) scrollTo(0, scrollY + offset)
        }
        requestAnimationFrame(keepProofInView)
      }
      requestAnimationFrame(keepProofInView)
    }

    // Simulate a continuous mouse-wheel pass through the original sticky
    // section. This uses the page's real scroll geometry and therefore invokes
    // exactly the same sticky-card interaction as a visitor's wheel/trackpad.
    if (proof === 'scroll-stack') {
      // Match proof 02's applied-result guides: copy begins on the same
      // top/left coordinates and the stack begins on its lower content line.
      // The slight scale keeps a complete sticky card inside the 16:10 frame.
      const proofLayoutStyle = document.createElement('style')
      proofLayoutStyle.textContent = `
        .tpl-intro {
          top: clamp(80px, 11vw, 160px) !important;
          transform: translateX(calc(12.22vw - max(40px, calc(50vw - 600px)))) !important;
        }
        .tpl-card {
          top: calc(clamp(80px, 11vw, 160px) + var(--i) * 32px) !important;
          transform: scale(.94) !important;
          transform-origin: top left !important;
        }
      `
      document.head.appendChild(proofLayoutStyle)
      const sectionBottom = sectionTop + target.scrollHeight
      const maxTop = Math.max(sectionTop, sectionBottom - innerHeight + 180)
      let y = sectionTop
      let direction = 1
      let holdUntil = performance.now() + 800
      let last = performance.now()
      const simulateWheel = now => {
        const elapsed = Math.min(34, now - last)
        last = now
        if (now >= holdUntil) {
          const deltaY = direction * elapsed * .34
          y = Math.max(sectionTop, Math.min(maxTop, y + deltaY))
          dispatchEvent(new WheelEvent('wheel', { deltaY, deltaMode: 0 }))
          scrollTo(0, y)
          if (y >= maxTop || y <= sectionTop) {
            direction *= -1
            holdUntil = now + 900
          }
        }
        requestAnimationFrame(simulateWheel)
      }
      requestAnimationFrame(simulateWheel)
    }
    if (proof === 'persona-carousel') {
      const rail = target.querySelector('.persona-cards')
      if (rail) {
        const max = Math.max(0, rail.scrollWidth - rail.clientWidth)
        const cards = Array.from(rail.children)
        rail.scrollLeft = 0
        // Let the original carousel finish restoring its saved offset, then
        // shift the whole rail once so its first card shares the title edge.
        setTimeout(() => {
          const headingLeft = target.querySelector('.persona-head')?.getBoundingClientRect().left ?? 0
          const cardLeft = cards[0]?.getBoundingClientRect().left ?? headingLeft
          rail.style.transform = `translate3d(${headingLeft - cardLeft}px, 0, 0)`
        }, 360)
        const hoverStyle = document.createElement('style')
        hoverStyle.textContent = `
          .panda-proof-card-cta{position:fixed;z-index:9999;left:0;top:0;display:flex;align-items:center;gap:18px;padding:16px 24px;border-radius:999px;background:#fff;color:#111;font:400 16px/1.2 Arial,sans-serif;letter-spacing:.02em;box-shadow:0 12px 30px rgba(0,0,0,.16);opacity:0;transform:translate3d(-50%,-50%,0) scale(.96);transition:opacity .16s ease,transform .2s ease;pointer-events:none}
          .panda-proof-card-cta b{font-size:22px;font-weight:400;line-height:1}
          .panda-proof-card-cta.is-active{opacity:1;transform:translate3d(-50%,-50%,0) scale(1)}
        `
        document.head.appendChild(hoverStyle)
        const followCursor = document.createElement('span')
        followCursor.className = 'panda-proof-card-cta'
        followCursor.innerHTML = '了解更多 <b>→</b>'
        document.body.appendChild(followCursor)
        let hoveredCard = null
        const pointerState = { active: false, x: 0, y: 0 }
        addEventListener('message', event => {
          if (event.origin !== location.origin || event.data?.type !== 'portfolio-card-hover') return
          pointerState.active = event.data.active
          pointerState.x = event.data.x
          pointerState.y = event.data.y
        })
        const updateHover = () => {
          const hit = pointerState.active ? document.elementFromPoint(pointerState.x * innerWidth, pointerState.y * innerHeight) : null
          const nextCard = hit?.closest('.persona') || null
          followCursor.style.left = `${pointerState.x * innerWidth}px`
          followCursor.style.top = `${pointerState.y * innerHeight}px`
          followCursor.classList.toggle('is-active', Boolean(nextCard))
          if (nextCard !== hoveredCard) {
            hoveredCard?.classList.remove('is-proof-hovered')
            hoveredCard = nextCard
            hoveredCard?.classList.add('is-proof-hovered')
            parent.postMessage({ type: 'portfolio-card-hover-state', active: Boolean(nextCard) }, location.origin)
          }
          requestAnimationFrame(updateHover)
        }
        requestAnimationFrame(updateHover)
        // The original page owns this overflow container and resets scripted
        // scrollLeft updates. Animate the real card layers instead so the
        // preview remains visibly fluid and GPU-composited.
        const motionAnimations = max > 0 ? cards.map(card => card.animate([
          { transform: 'translate3d(0, 0, 0)', offset: 0 },
          { transform: 'translate3d(0, 0, 0)', offset: .5 },
          { transform: `translate3d(${-max}px, 0, 0)`, offset: 1 },
        ], {
          duration: 7600,
          iterations: Infinity,
          easing: 'linear',
        })) : []
        if (window.frameElement?.closest('.panda-proof-live-preview') && parent.matchMedia('(max-width: 820px)').matches) {
          const entryObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            setTimeout(() => motionAnimations.forEach(animation => {
              const duration = Number(animation.effect.getTiming().duration)
              if (duration && Number(animation.currentTime) % duration < duration * .5) animation.currentTime = duration * .55
            }), 100)
          })
          entryObserver.observe(document.documentElement)
        }
        motionAnimations.forEach(animation => animation.pause())
        addEventListener('message', event => {
          if (event.origin === location.origin && event.data?.type === 'portfolio-preview-enter' && event.data.active && parent.matchMedia('(max-width:820px)').matches) {
            motionAnimations.forEach(animation => {animation.currentTime=Number(animation.effect.getTiming().duration)*.55;animation.play()})
          }
        })
        addEventListener('message', event => {
          if (event.origin !== location.origin || event.data?.type !== 'portfolio-preview-active') return
          document.documentElement.classList.remove('portfolio-proof-active')
          motionAnimations.forEach(animation => animation.pause())
          if (event.data.active) {
            void document.documentElement.offsetWidth
            document.documentElement.classList.add('portfolio-proof-active')
            motionAnimations.forEach(animation => {
              animation.currentTime = 0
              animation.play()
            })
          }
        })
      }
    }
    void announceProofReady(target, location.pathname.includes('/proof-') ? 0 : proof === 'persona-carousel' ? 420 : 120)
  }
  // The archived page includes third-party resources that can keep `load`
  // pending. Its proof sections are server-rendered, so DOM readiness is the
  // reliable point to start positioning and animation.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(focusProof, 120), { once: true })
  } else {
    setTimeout(focusProof, 120)
  }
}

if ((embedded || proof) && (!proof || proof === 'hero' || proof === 'finance-direction')) {
document.documentElement.classList.add('panda-scanner-overlay')

// The source page is already server-rendered, so reveal it as soon as its
// local hero bitmap has decoded. The optional scanning canvas continues to
// initialize afterwards and must never block the device preview.
const revealSourcePage = async () => {
  const findHero = () => new Promise(resolve => {
    const poll = () => {
      const image = document.querySelector('.hero-bg, .scanning-hero img')
      if (image) resolve(image)
      else if (phoneProof) setTimeout(poll, 40)
      else requestAnimationFrame(poll)
    }
    poll()
  })
  const heroImage = await findHero()
  const localHero = '/marquee/panda-home-astronaut.webp'
  if (heroImage.getAttribute('src') !== localHero) heroImage.src = localHero
  if (!heroImage.complete) {
    try { await heroImage.decode() } catch {}
  }
  document.documentElement.dataset.pandaPreviewReady = mode
  const post = () => window.parent.postMessage({ type: 'panda-live-ready', mode }, location.origin)
  if (phoneProof) post()
  else requestAnimationFrame(post)
}
void revealSourcePage()

// The V3 showcase can scroll the authored server-rendered document before
// Vue starts. Reveal its existing sections as each enters the viewport.
try {
if (window.frameElement?.matches('.panda-v3-live-frame') && (top.__portfolioPandaHydrate || window.__portfolioScanFirst)) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-inview', 'is-active', 'vue-mounted');
        reveal.unobserve(entry.target);
      }
    }, { rootMargin: '15% 0px' });
    document.querySelectorAll('.section, .tpl-section, .comm-section, .persona-head, .loop-section, .curved-loop-jacket')
      .forEach(element => reveal.observe(element));
    window.addEventListener('pagehide', () => reveal.disconnect(), { once: true });
  }
} catch {}


const signalReady = canvas => {
  const post = async () => {
    const heroImage = document.querySelector('.hero-bg, .scanning-hero img')
    if (heroImage && !heroImage.complete) {
      try { await heroImage.decode() } catch {}
    }
    const notifyParent = () => { if (canvas.isConnected) window.parent.postMessage({ type: 'panda-live-motion-ready', mode }, location.origin) }
    if (phoneProof) notifyParent()
    else requestAnimationFrame(() => requestAnimationFrame(notifyParent))
  }
  const notify = () => {
    if (canvas.style.opacity !== '1') {
      if (phoneProof) canvas.addEventListener('panda-scan-ready', notify, {once:true})
      else requestAnimationFrame(notify)
      return
    }
    if (phoneProof || document.readyState === 'complete') post()
    else window.addEventListener('load', post, { once: true })
  }
  notify()
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const waitForHero = () => new Promise(resolve => {
    const find = () => {
      const root = document.querySelector('.scanning-hero')
      if (root) resolve(root)
      else requestAnimationFrame(find)
    }
    find()
  })

  let root = await waitForHero()
  const originalCanvas = root.querySelector('.scanning-canvas')
  if (originalCanvas) originalCanvas.style.display = 'none'

  const canvas = document.createElement('canvas')
  canvas.className = 'panda-embedded-scan'
  canvas.setAttribute('aria-hidden', 'true')
  root.append(canvas)

  try {
    if(window.frameElement?.matches('.panda-v3-live-frame')){
      await top.__portfolioPandaHydrate?.(window.frameElement);
      if(!root.isConnected){
        root=await waitForHero();
        const native=root.querySelector('.scanning-canvas');
        if(native)native.style.display='none';
        root.append(canvas);
      }
    }
    if(root.isConnected){
    if (phoneProof && proof === 'hero') {
      const { mountScanFrames } = await import('/panda-original/scan-frame-player.js')
      await mountScanFrames(canvas, root, 'result')
    } else {
    const originalModule = '/panda-original/scanning-hero.js?v=11';
    let sharedModule;
    try {
      if(window.frameElement?.matches('.panda-v3-live-frame'))sharedModule=await top.__portfolioPandaScan?.();
    } catch {}
    const { mountScanningHero } = sharedModule
      ? await import(sharedModule).catch(()=>import(originalModule))
      : await import(originalModule);
    window.dispatchEvent(new Event('panda-scan-module-ready'));
    await mountScanningHero(
      canvas,
      root,
      '/marquee/panda-home-astronaut.webp',
      '/marquee/panda-home-depth.webp',
      mobile
        ? {
            lockPosition: true,
            maxPixelRatio: 0.8,
            fps: 24,
            desktopScale: 1,
            desktopPositionX: -1.706,
            desktopPositionY: 0,
          }
        : {
            lockPosition: false,
            fitCover: true,
            objectPositionX: 1,
            coverScaleX: 1,
          },
    )
    }
    root.classList.add('is-embedded-scan-ready')
    signalReady(canvas)
    }
  } catch (error) {
    console.error('[PandaAI embed] 原站扫描动效初始化失败。', error)
    window.__portfolioMotionError = String(error)
    window.parent.postMessage({type:'portfolio-motion-error',message:String(error)}, location.origin)
  }
} else {
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      window.parent.postMessage({ type: 'panda-live-motion-ready', mode }, location.origin)
    }))
  }, { once: true })
}
}
