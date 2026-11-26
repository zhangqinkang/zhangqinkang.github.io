const mobile = new URLSearchParams(location.search).get('embed') === 'source-mobile'
const mode = mobile ? 'mobile' : 'desktop'

function startSourceMotion(hero) {
  const root = document.createElement('div')
  root.className = 'scanning-hero'
  root.setAttribute('aria-hidden', 'true')
  hero.querySelector('.hero-bg')?.after(root)
  import('/panda-live/source-scan.js?v=2').then(({ mountSourceScan }) => {
    return mountSourceScan(root, mobile)
  }).then(() => {
    hero.classList.add('is-source-scan-ready')
  }).catch(error => console.warn('[PandaAI] Source scan unavailable', error))
}

function startSectionMotion(scroller) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-inview', 'is-active', 'vue-mounted')
      observer.unobserve(entry.target)
    }
  }, { root: scroller, rootMargin: '15% 0px', threshold: 0 })
  document.querySelectorAll('.section, .tpl-section, .comm-section, .persona-head, .loop-section, .curved-loop-jacket')
    .forEach(element => observer.observe(element))
}

const ready = async () => {
  // WebKit can transfer a programmatic iframe-window scroll to the parent
  // document. Keep all source-page scrolling inside a fixed-height element.
  const scroller = document.createElement('div')
  scroller.id = 'panda-lite-scroll'
  while (document.body.firstChild) scroller.append(document.body.firstChild)
  document.body.append(scroller)
  const hero = document.querySelector('.hero')
  if (hero) {
    hero.classList.add('is-embedded-scan-ready')
    startSourceMotion(hero)
  }
  startSectionMotion(scroller)
  const heroImage = document.querySelector('.scanning-fallback, .hero-bg')
  if (heroImage && !heroImage.complete) {
    try { await heroImage.decode() } catch {}
  }
  parent.postMessage({ type: 'panda-live-ready', mode }, location.origin)
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true })
else void ready()
