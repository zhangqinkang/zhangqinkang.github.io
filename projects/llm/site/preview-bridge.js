(() => {
  const panel = Number(new URLSearchParams(location.search).get('panel') || 0)
  if (!panel) return

  // The mirrored HTML already contains every panel. Select the requested one
  // before its deferred scripts run so the iframe's first paint is correct.
  const section = document.querySelector('.right-section')
  const views = [
    section?.querySelector('.trading-record'),
    section?.querySelector('.trading-holding'),
    section?.querySelector('.model-chat'),
    section?.querySelector('.champion-prediction'),
  ]
  views.forEach((view, index) => {
    if (view) view.style.display = index === panel ? '' : 'none'
  })
  section?.querySelectorAll(':scope > .items .left-items .item').forEach((tab, index) => {
    tab.classList.toggle('active', index === panel)
    tab.classList.toggle('is-active', index === panel)
  })
  section?.querySelector(':scope > .items .right-items')?.classList.toggle('is-active', panel === 3)

  let tries = 0
  const timer = setInterval(() => {
    if (!document.querySelector('[data-arena-boot-ready="true"]') && ++tries < 120) return
    clearInterval(timer)
    const tabs = document.querySelectorAll('.right-section > .items .left-items .item')
    ;(panel === 3 ? document.querySelector('.right-section > .items .right-items') : tabs[panel])?.click()
  }, 50)
})()
