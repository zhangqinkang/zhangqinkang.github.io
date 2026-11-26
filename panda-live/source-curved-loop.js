// Recreate the archived CurvedLoop component on the SSR-only V3 preview.
// Its server markup contains only a hidden measurement node; Vue added the
// visible textPath and advanced startOffset by two pixels each frame.
export function mountSourceCurvedLoops(root, scroller, mobile, visibilityElement, observeOuterOnly = false) {
  const disposers = []
  root.querySelectorAll('.curved-loop-jacket').forEach((jacket, index) => {
    const svg = jacket.querySelector('svg')
    const measure = svg?.querySelector('text')
    const path = svg?.querySelector('defs path')
    if (!svg || !measure || !path) return

    // The original path and typography are retained from the source markup.
    // Give each copy an ID that is unique even when both device views coexist.
    const id = `panda-v3-curve-${mobile ? 'm' : 'd'}-${index}`
    path.id = id
    const phrase = measure.textContent || '赛事活动 ✦ 赞助 ✦ PandaAI ✦\u00a0'
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('font-weight', 'bold')
    text.setAttribute('xml:space', 'preserve')
    const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
    textPath.setAttribute('href', `#${id}`)
    textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${id}`)
    textPath.setAttribute('xml:space', 'preserve')
    const phraseWidth = Math.max(1, measure.getComputedTextLength())
    textPath.textContent = phrase.repeat(Math.ceil(1800 / phraseWidth) + 2)
    text.append(textPath)
    svg.append(text)
    jacket.style.visibility = 'visible'

    let offset = -phraseWidth
    let frame = 0
    let visible = false
    let outerVisible = !visibilityElement
    let dragging = false
    let pointerX = 0
    let direction = -1
    const speed = mobile ? 5 : 2
    const render = () => textPath.setAttribute('startOffset', `${offset}px`)
    const advance = delta => {
      offset += delta
      if (offset <= -phraseWidth) offset += phraseWidth
      if (offset > 0) offset -= phraseWidth
      render()
    }
    const tick = () => {
      frame = 0
      if (!visible || !outerVisible || document.hidden) return
      if (!dragging) advance(direction * speed)
      frame = requestAnimationFrame(tick)
    }
    const sync = () => {
      if (visible && outerVisible && !document.hidden && !frame) frame = requestAnimationFrame(tick)
      if ((!visible || !outerVisible || document.hidden) && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      sync()
    }, { root: scroller })
    observer.observe(jacket)
    const syncOuter = () => {
      if (visibilityElement) {
        const rect = visibilityElement.getBoundingClientRect()
        outerVisible = rect.bottom > 0 && rect.top < innerHeight
      }
      sync()
    }
    const outerObserver = visibilityElement ? new IntersectionObserver(entries => {
      if (observeOuterOnly) {
        outerVisible = !!entries[0]?.isIntersecting
        sync()
      } else syncOuter()
    }) : null
    outerObserver?.observe(visibilityElement)
    if (visibilityElement && !observeOuterOnly) addEventListener('scroll', syncOuter, {passive:true})
    if (!observeOuterOnly) syncOuter()
    const down = event => {
      dragging = true
      pointerX = event.clientX
      jacket.style.cursor = 'grabbing'
      jacket.setPointerCapture(event.pointerId)
    }
    const move = event => {
      if (!dragging) return
      const delta = event.clientX - pointerX
      pointerX = event.clientX
      if (delta) direction = delta > 0 ? 1 : -1
      advance(delta)
    }
    const up = () => { dragging = false; jacket.style.cursor = 'grab' }
    jacket.addEventListener('pointerdown', down)
    jacket.addEventListener('pointermove', move)
    jacket.addEventListener('pointerup', up)
    jacket.addEventListener('pointercancel', up)
    jacket.addEventListener('pointerleave', up)
    document.addEventListener('visibilitychange', sync)
    render()
    disposers.push(() => {
      observer.disconnect()
      outerObserver?.disconnect()
      removeEventListener('scroll', syncOuter)
      if (frame) cancelAnimationFrame(frame)
      jacket.removeEventListener('pointerdown', down)
      jacket.removeEventListener('pointermove', move)
      jacket.removeEventListener('pointerup', up)
      jacket.removeEventListener('pointercancel', up)
      jacket.removeEventListener('pointerleave', up)
      document.removeEventListener('visibilitychange', sync)
      text.remove()
    })
  })
  return () => disposers.forEach(dispose => dispose())
}
