// The live homepage mounts a separate three-slide carousel on phones. The
// embedded V3 page keeps its older Vue runtime, so mount only that presentation
// layer here, inside the phone iframe, after Vue has hydrated.
(() => {
  if (!document.documentElement.classList.contains('panda-mobile-embed')) return;

  const banners = [
    { image: '/panda-live/_nuxt/fourth-competition-mobile.CnTE6xaz.webp', label: '立即报名', href: '/factorhub/fourthFactorCompetition/' },
    { image: '/panda-live/_nuxt/gldh-mobile-redesign.C-CBIqBD.webp', label: '立即参与', href: '/partners/gldh' },
    { image: '/panda-live/_nuxt/qube-mobile.CUEihv14.webp', label: '立即体验', href: '/login', light: true },
  ];
  let index = 2;
  let host = null;
  let timer = 0;
  let busy = false;

  for (const banner of banners) {
    const image = new Image();
    image.src = banner.image;
  }

  const updateCta = (layer, banner) => {
    layer.classList.toggle('mobile-banner-layer--light', !!banner.light);
    const cta = layer.querySelector('.mobile-banner-cta');
    cta.classList.toggle('mobile-banner-cta--light', !!banner.light);
    cta.firstChild.textContent = banner.label;
    cta.onclick = (event) => {
      event.stopPropagation();
      const siteOrigin = location.hostname === '127.0.0.1' ? `${location.protocol}//${location.hostname}:5173` : 'https://design-ui-pandaai.pages.dev';
      window.open(new URL(banner.href, siteOrigin).href, '_blank', 'noopener');
    };
  };

  const change = async (step) => {
    if (busy || !host?.isConnected) return;
    const layer = host.querySelector('.mobile-banner-layer');
    const oldImage = layer?.querySelector('.mobile-banner-image');
    if (!oldImage) return;
    busy = true;
    const nextIndex = (index + step + banners.length) % banners.length;
    const banner = banners[nextIndex];
    const image = new Image();
    image.className = 'mobile-banner-image is-entering';
    image.src = banner.image;
    image.alt = '活动宣传图';
    image.style.setProperty('--banner-enter-x', `${40 * Math.sign(step)}px`);
    oldImage.style.setProperty('--banner-leave-x', `${-40 * Math.sign(step)}px`);
    try { await image.decode(); } catch { busy = false; return; }
    if (!host?.isConnected || !oldImage.isConnected) { busy = false; return; }
    index = nextIndex;
    oldImage.classList.add('is-leaving');
    layer.insertBefore(image, oldImage);
    updateCta(layer, banner);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      image.classList.add('is-visible');
      oldImage.classList.add('is-hidden');
    }));
    setTimeout(() => {
      oldImage.remove();
      image.className = 'mobile-banner-image';
      busy = false;
    }, 1280);
  };

  const restart = () => {
    clearInterval(timer);
    if (!document.hidden && host?.isConnected) timer = setInterval(() => change(1), 4000);
  };

  const mount = () => {
    const nextHost = document.querySelector('.banner-section .duo-container');
    const card = nextHost?.querySelector('.card-sm');
    if (!card || (nextHost === host && nextHost.querySelector('.mobile-banner-layer'))) return;
    clearInterval(timer);
    host = nextHost;
    busy = false;
    const track = host.querySelector('.duo-track');
    track?.dispatchEvent(new MouseEvent('mouseenter'));
    host.classList.add('mobile-banner-native');

    const layer = document.createElement('div');
    layer.className = 'mobile-banner-layer';
    const image = new Image();
    image.className = 'mobile-banner-image';
    image.src = banners[index].image;
    image.alt = '活动宣传图';
    layer.appendChild(image);
    layer.insertAdjacentHTML('beforeend', '<button class="mobile-banner-cta" type="button">立即体验<span>↗</span></button>');
    updateCta(layer, banners[index]);
    card.appendChild(layer);

    const nav = document.createElement('div');
    nav.className = 'mobile-banner-nav';
    nav.innerHTML = '<button class="mobile-banner-nav-button" type="button" aria-label="向左播放（下一张广告）"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6 9 12l6 6"></path></svg></button><button class="mobile-banner-nav-button" type="button" aria-label="向右播放（上一张广告）"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"></path></svg></button>';
    nav.children[0].addEventListener('click', () => { change(1); restart(); });
    nav.children[1].addEventListener('click', () => { change(-1); restart(); });
    host.appendChild(nav);
    restart();
  };

  const start = () => {
    setTimeout(mount, 800);
    setTimeout(mount, 2400);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(timer);
    else { mount(); restart(); }
  });
})();
