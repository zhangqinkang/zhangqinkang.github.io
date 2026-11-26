const route = document.documentElement.dataset.proofRoute
const selectorMap = {
  curved: '.curved-loop-jacket',
  stack: '.scroll-stack-scroller',
  logo: '.logoloop',
}

const prepare = () => {
  document.querySelector('[aria-label="Close announcement"]')?.click()
  const target = document.querySelector(selectorMap[route])
  if (!target) return setTimeout(prepare, 40)
  const demo = target.closest('.demo-container') || target.parentElement
  if (!demo) return setTimeout(prepare, 40)
  // Preserve the real hydrated component and its original demo wrapper, but
  // hide the surrounding documentation chrome. This is the source site's
  // actual demo—not a recreated animation or a clipped recording.
  const proofBackground = route === 'stack' || route === 'logo' ? '#09090b' : '#120f17'
  const style = document.createElement('style')
  style.textContent = `
    html,body,#root{width:1440px!important;height:900px!important;min-width:1440px!important;min-height:900px!important;margin:0!important;overflow:hidden!important;background:${proofBackground}!important}
    #root{display:none!important}
    body>.demo-container{display:block!important;position:fixed!important;inset:0!important;width:1440px!important;height:900px!important;min-height:900px!important;max-width:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;overflow:hidden!important;background:${proofBackground}!important}
    .announcement-modal,.announcement-modal-overlay{display:none!important}
  `
  document.head.append(style)
  // Moving an already-hydrated node preserves the component's refs, event
  // handlers and requestAnimationFrame loop while removing documentation UI.
  document.body.append(demo)
  window.dispatchEvent(new Event('resize'))

  Array.from(demo.children).forEach(child => {
    if (child !== target && !child.contains(target)) child.style.display = 'none'
  })

  if (route === 'curved') {
    Object.assign(target.style, {
      position: 'absolute',
      left: '50%',
      top: '43%',
      width: '1440px',
      height: '720px',
      transform: 'translate(-50%, -50%)',
      transformOrigin: 'center',
    })
    const accelerate = () => {
      const path = target.querySelector('textPath')
      if (path) {
        const current = parseFloat(path.getAttribute('startOffset') || '0')
        path.setAttribute('startOffset', `${current - 3.6}px`)
      }
      requestAnimationFrame(accelerate)
    }
    requestAnimationFrame(accelerate)
  }

  if (route === 'logo') {
    const secondRow = target.cloneNode(true)
    const pair = document.createElement('div')
    pair.className = 'proof-logo-pair'
    target.before(pair)
    pair.append(target, secondRow)
    target.classList.add('proof-logo-row', 'proof-logo-row--left')
    secondRow.classList.add('proof-logo-row', 'proof-logo-row--right')
    ;[target, secondRow].forEach(row => {
      row.style.setProperty('--logoloop-fadeColor', proofBackground)
    })
    Object.assign(pair.style, {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '1160px',
      display: 'grid',
      gap: '12px',
      transform: 'translate(-50%, -50%) scale(1.48)',
      transformOrigin: 'center',
    })
    const logoMotionStyle = document.createElement('style')
    logoMotionStyle.textContent = `
      .proof-logo-row {
        position: relative !important;
        inset: auto !important;
        width: 100% !important;
        overflow: hidden !important;
        transform: none !important;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.16) 5%, #000 18%, #000 82%, rgba(0,0,0,.16) 95%, transparent 100%) !important;
        mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.16) 5%, #000 18%, #000 82%, rgba(0,0,0,.16) 95%, transparent 100%) !important;
      }
      .proof-logo-row .logoloop__track { width: max-content !important; will-change: transform !important; }
      .proof-logo-row--left .logoloop__track { animation: proofLogoLeft 46s linear infinite !important; }
      .proof-logo-row--right .logoloop__track { animation: proofLogoRight 46s linear infinite !important; }
      @keyframes proofLogoLeft { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
      @keyframes proofLogoRight { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0); } }
    `
    document.head.append(logoMotionStyle)
  }

  if (route === 'stack') {
    const scroller = target
    Object.assign(scroller.style, {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '1080px',
      height: '720px',
      transform: 'translate(-50%, -50%)',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
    })
    window.dispatchEvent(new Event('resize'))
    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'))
    const inner = scroller.querySelector('.scroll-stack-inner')
    const end = scroller.querySelector('.scroll-stack-end')
    if (inner) {
      inner.style.willChange = 'transform'
      inner.style.paddingLeft = '32px'
      inner.style.paddingRight = '32px'
    }
    cards.forEach((card, index) => {
      const light = index % 2 === 0
      Object.assign(card.style, {
        height: '360px',
        background: light ? '#f5f5f5' : '#050505',
        color: light ? '#0a0a0a' : '#f5f5f5',
        border: `1px solid ${light ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)'}`,
        boxShadow: light ? '0 28px 58px -30px rgba(0,0,0,.32)' : '0 28px 58px -30px rgba(0,0,0,.72)',
      })
    })
    let direction = 1
    let virtualScroll = 0
    let holdUntil = performance.now()
    let last = performance.now()
    const run = now => {
      const elapsed = Math.min(34, now - last); last = now
      if (now >= holdUntil) {
        const deltaY = direction * elapsed * .65
        const stackPosition = scroller.clientHeight * .2
        const scaleEndPosition = scroller.clientHeight * .1
        const lastIndex = Math.max(0, cards.length - 1)
        const max = Math.max(0, (cards[lastIndex]?.offsetTop || 0) - stackPosition - 30 * lastIndex + 54)
        virtualScroll = Math.max(0, Math.min(max, virtualScroll + deltaY))
        if (inner) inner.style.transform = `translate3d(0, ${-virtualScroll}px, 0)`
        const pinEnd = (end?.offsetTop || scroller.scrollHeight) - scroller.clientHeight / 2
        cards.forEach((card, index) => {
          const cardTop = card.offsetTop
          const triggerStart = cardTop - stackPosition - 30 * index
          const triggerEnd = cardTop - scaleEndPosition
          const progress = Math.max(0, Math.min(1, (virtualScroll - triggerStart) / Math.max(1, triggerEnd - triggerStart)))
          const scale = 1 - progress * (1 - (.85 + index * .03))
          const pinStart = cardTop - stackPosition - 30 * index
          let translateY = 0
          if (virtualScroll >= pinStart && virtualScroll <= pinEnd) {
            translateY = virtualScroll - cardTop + stackPosition + 30 * index
          } else if (virtualScroll > pinEnd) {
            translateY = pinEnd - cardTop + stackPosition + 30 * index
          }
          card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
        })
        if (virtualScroll >= max - 1 || virtualScroll <= 1) {
          direction *= -1
          holdUntil = now + 800
        }
      }
      requestAnimationFrame(run)
    }
    requestAnimationFrame(run)
  }
  // Reveal the actual demo only after its lazy module and final layout exist.
  Promise.all([document.fonts.ready, ...Array.from(demo.querySelectorAll('img')).map(image => image.decode().catch(() => {}))]).then(() => {
    demo.getBoundingClientRect()
    parent.postMessage({ type: 'portfolio-source-proof-ready' }, location.origin)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(prepare, 120), { once: true })
} else {
  setTimeout(prepare, 120)
}
