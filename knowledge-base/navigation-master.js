(function () {
  const titles = ['产品', '活动', '解决方案', '学习', '关于', '社区'];
  const scope = 'data-v-e983e1fe';
  let navbarInstance = null;

  [
    '/knowledge-base/_nuxt/Nav.C_SQ34Up.css',
    '/knowledge-base/shared-pages/mobile-navigation.css?v=20260910-nav-viewport-1',
    '/knowledge-base/shared-pages/browser-render-contract.css?v=20260827-community-guard-1'
  ].forEach(href => {
    if (document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.pandaSharedNavigationStyle = 'true';
    document.head.appendChild(link);
  });

  const style = document.createElement('style');
  style.id = 'panda-navigation-master-style';
  style.textContent = `
    @font-face {
      font-family: Dream;
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('/knowledge-base/_nuxt/Dream-BraveGB-Bold.subset.CaqFULrC.woff2') format('woff2');
    }
    .nav-container[data-navigation-master-shell="true"] {
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      mix-blend-mode: difference !important;
      pointer-events: none !important;
    }
    .nav-container[data-navigation-master-shell="true"],
    .nav-container[data-navigation-master-shell="true"] *,
    .nav-container[data-navigation-master-shell="true"] *::before,
    .nav-container[data-navigation-master-shell="true"] *::after {
      box-sizing: border-box;
    }
    .nav-container[data-navigation-master-shell="true"]::before,
    .nav-container[data-navigation-master-shell="true"]::after,
    .nav-container[data-navigation-master-shell="true"] .nav-pc-container::before,
    .nav-container[data-navigation-master-shell="true"] .nav-pc-container::after {
      content: none !important;
      display: none !important;
    }
    .nav-container[data-navigation-master-shell="true"] .nav-pc-container {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
      height: 72px !important;
      position: fixed !important;
      top: 0 !important;
    }
    .nav-container[data-navigation-master-shell="true"] .nav-pc-container,
    .nav-container[data-navigation-master-shell="true"] .nav-mobile-container,
    .nav-container[data-navigation-master-shell="true"] .navbar[data-navigation-master="true"] {
      pointer-events: none !important;
    }
    /* Nuxt can recreate its historical navigation host after the shared
       singleton has already mounted. The historical navbar is hidden below,
       but its full-width host would still sit above the live controls and
       consume every pointer hit in production. Make every host transparent to
       input; the shared navigation's real controls opt back in explicitly. */
    .nav-container .nav-pc-container,
    .nav-container .nav-mobile-container {
      pointer-events: none !important;
    }
    .nav-container[data-navigation-master-shell="true"] .panda-mobile-navigation,
    .nav-container[data-navigation-master-shell="true"] .menu-title,
    .nav-container[data-navigation-master-shell="true"] .logo,
    .nav-container[data-navigation-master-shell="true"] button,
    .nav-container[data-navigation-master-shell="true"] a {
      pointer-events: auto !important;
    }
    html:not([data-panda-navigation-ready="true"]) .nav-container {
      visibility: hidden !important;
    }
    .nav-container .nav-pc-container > .navbar:not([data-navigation-master="true"]) {
      visibility: hidden !important;
    }
    .navbar[data-navigation-master="true"] .logo-title {
      color: #fff !important;
      background-color: currentColor !important;
      display: block !important;
      flex: 0 0 95.78px !important;
      font-size: 0 !important;
      height: 32px !important;
      line-height: 0 !important;
      overflow: hidden !important;
      text-indent: -9999px !important;
      visibility: visible !important;
      width: 95.78px !important;
      -webkit-mask: url('/knowledge-base/shared-pages/pandaai-dream-wordmark.svg?v=20260826-1') no-repeat center / 95.78px 32px !important;
      mask: url('/knowledge-base/shared-pages/pandaai-dream-wordmark.svg?v=20260826-1') no-repeat center / 95.78px 32px !important;
    }
    html[data-panda-brand-font-ready="true"] .navbar[data-navigation-master="true"] .logo-title {
      visibility: visible !important;
    }
    .navbar[data-navigation-master="true"] .logo svg path {
      fill: #fff !important;
    }
    .navbar[data-navigation-master="true"] .menu-title,
    .navbar[data-navigation-master="true"] .btn-ghost {
      color: rgba(255, 255, 255, .88) !important;
    }
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal a,
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal a:hover,
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal a:focus,
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal a:active,
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal .dropdown-item,
    .nav-container[data-navigation-master-shell="true"] .dropdown-portal .dropdown-item * {
      text-decoration: none !important;
    }
    .nav-container[data-navigation-tone="light"] {
      mix-blend-mode: normal !important;
    }
    .nav-container[data-navigation-tone="light"] .navbar[data-navigation-master="true"] .logo-title,
    .nav-container[data-navigation-tone="light"] .navbar[data-navigation-master="true"] .menu-title,
    .nav-container[data-navigation-tone="light"] .navbar[data-navigation-master="true"] .btn-ghost {
      color: #111 !important;
    }
    .nav-container[data-navigation-tone="light"] .navbar[data-navigation-master="true"] .logo svg path {
      fill: #111 !important;
    }
    .nav-container[data-navigation-tone="light"] .navbar[data-navigation-master="true"] .btn-cta {
      background-color: #111 !important;
      border-color: #111 !important;
      color: #fff !important;
    }
    @media (max-width: 768px) {
      .nav-container[data-navigation-master-shell="true"] {
        mix-blend-mode: normal !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Register the face before asking the Font Loading API for it. This keeps
  // the brand gate deterministic on pages that do not declare Dream inline.
  const markBrandFontReady = () => {
    document.documentElement.dataset.pandaBrandFontReady = 'true';
  };
  if (document.fonts?.load) {
    document.fonts.load('700 20px Dream', 'PandaAI').then(markBrandFontReady, markBrandFontReady);
  } else {
    markBrandFontReady();
  }

  const createNavbar = () => {
    if (navbarInstance) return navbarInstance;
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    navbar.dataset.navigationMaster = 'true';
    navbar.innerHTML = `
      <div class="navbar-inner">
        <div class="logo" title="PandaAI - AI Agent 量化投研平台" role="link" tabindex="0" aria-label="返回首页">
          <svg viewBox="0 0 195 206" width="26" height="27" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="m96.07,94.87c0,0 -1.07,4.12 -1.07,4.12c0,0 -5.41,18.32 -5.41,18.32c0,0 -14.01,42.6 -14.01,42.6c0,0 -8.34,26.55 -8.34,26.55c0,0 14.6,8.35 14.6,8.35c1.09,0.62 15.78,8.19 15.89,8.19c0.1,0 15.91,-8.04 16.9,-8.59l15.33,-8.58l-1.35,-2.67c0,0 -14.98,-43.2 -14.98,-43.2c-0.18,-0.56 -13.63,-42.6 -13.63,-42.63c0,-0.59 -1.03,-2.94 -1.43,-3.27c-1.14,-0.95 -1.65,-0.79 -2.5,0.81z" fill="#fff"></path>
            <path d="m91.21,4.05c0,0 -19.5,4.55 -19.5,4.55c-10.31,2.18 -17.89,4.29 -18.9,5.27c-0.26,0.26 -21.96,42.99 -25.83,50.87l-24.15,49.25l4.76,8.75c0,0 14.21,25.26 14.21,25.26c0,0 11.82,19.67 11.82,19.67c1.58,2.13 6.81,5.48 16.02,10.26c0,0 13.97,6.79 13.97,6.79c0,0 -3.67,-11.26 -3.67,-11.26c0,0 -10.52,-30.78 -10.52,-30.78c-2.51,-7.61 -6.35,-21.1 -6.23,-21.9c0.23,-1.56 6.83,-5.79 26.56,-17.02l26.25,-14.95l0,-42.9c0,-33.7 -0.27,-42.9 -1.25,-42.85c0,0 -3.54,0.99 -3.54,0.99z" fill="#fff"></path>
            <path d="m100.02,45.14c0,16.37 0.46,43.01 0.75,43.43c0,0 6.73,4.4 6.73,4.4c0,0 25.75,14.76 25.75,14.76c16.67,9.64 19.75,11.78 19.75,13.73c0,0.2 -5.83,19.54 -6.38,21.17c0,0 -10.58,30.21 -10.58,30.21c0,0 -3.87,11.61 -3.87,11.61c0,0 14.71,-6.84 14.71,-6.84l14.38,-7.11l12.88,-22c0,0 16.01,-28.01 16.01,-28.01l3.13,-6.02l-14.38,-29.48c0,0 -24.88,-50.49 -24.88,-50.49c-10.45,-20.85 -10.55,-21.01 -14.52,-22.16c0,0 -20.38,-4.83 -20.38,-4.83c0,0 -17.75,-4.2 -17.75,-4.2c-1.15,-0.44 -1.37,6.3 -1.35,41.83z" fill="#fff"></path>
          </svg>
          <span class="logo-title">PandaAI</span>
        </div>
        <nav class="menu" aria-label="主导航">
          ${titles.map((title, index) => `<div class="menu-item"><button type="button" id="nav-title-${index + 1}" class="menu-title" style="appearance:none;background:transparent;border:0;font:inherit;margin:0;padding:0" aria-haspopup="true" aria-expanded="false" aria-controls="nav-panel-${index + 1}">${title}</button></div>`).join('')}
        </nav>
        <div class="actions">
          <button type="button" class="btn btn-ghost">登录</button>
          <button type="button" class="btn btn-cta">快速试用</button>
        </div>
      </div>`;
    [navbar, ...navbar.querySelectorAll('*')].forEach(node => node.setAttribute(scope, ''));
    navbarInstance = navbar;
    return navbarInstance;
  };

  window.PandaSiteNavigationMaster = Object.freeze({ titles, createNavbar });
})();
/* Warm same-site documents without taking over navigation. */
(function () {
  if (!window.fetch || !document.documentElement) return;
  if (navigator.connection && navigator.connection.saveData) return;

  var current = location.pathname.replace(/\/+$/, '') || '/';
  var pending = new Map();
  var warmed = new Set();
  var queue = [];
  var active = 0;
  var MAX_ACTIVE = 1;
  var SKIP = /^\/(?:login|register|personalcenter)(?:\/|$)/i;
  var DOCUMENT_PACK = '/shared-pages/navigation-documents-pack-20260915-1.json';

  function cacheWithWorker(url, html) {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_DOCUMENT',
      url: url.href || url,
      html: typeof html === 'string' ? html : ''
    });
  }

  function pageUrl(value) {
    try {
      var url = new URL(value, location.href);
      var path = url.pathname.replace(/\/+$/, '') || '/';
      if (url.origin !== location.origin || path === current || SKIP.test(path)) return null;
      if (/\.[a-z0-9]{2,8}$/i.test(path)) return null;
      url.hash = '';
      return url;
    } catch (_) { return null; }
  }

  function run() {
    while (active < MAX_ACTIVE && queue.length) {
      var url = queue.shift();
      if (warmed.has(url.href)) continue;
      warmed.add(url.href);
      active += 1;
      var request = fetch(url.href, {
        credentials: 'same-origin',
        cache: 'force-cache',
        priority: 'low'
      }).then(function (response) {
        if (!response || !response.ok) return;
        return response.clone().text().then(function (html) {
          cacheWithWorker(url, html);
        });
      }).catch(function () {}).finally(function () {
        active -= 1;
        pending.delete(url.href);
        run();
      });
      pending.set(url.href, request);
    }
  }

  function warm(value, urgent) {
    var url = pageUrl(value);
    if (!url || warmed.has(url.href) || pending.has(url.href) || queue.some(function (item) { return item.href === url.href; })) return;
    if (urgent) queue.unshift(url);
    else queue.push(url);
    run();
  }

  ['pointerover', 'touchstart', 'focusin'].forEach(function (type) {
    document.addEventListener(type, function (event) {
      var link = event.target instanceof Element && event.target.closest('a[href]');
      if (link) warm(link.href, true);
    }, { passive: true, capture: true });
  });

  function warmVisible() {
    var count = 0;
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (count >= 3) return;
      var rect = link.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= innerHeight || rect.right <= 0 || rect.left >= innerWidth) return;
      var before = queue.length + warmed.size + pending.size;
      warm(link.href, false);
      if (queue.length + warmed.size + pending.size > before) count += 1;
    });
  }

  function installDocumentPack() {
    if (!navigator.serviceWorker) return;
    // A fresh mobile document must finish its own render before any whole-site
    // cache work starts. Parsing the packed HTML and writing nineteen cache
    // entries competes with hydration in mobile WebKit and Android WebViews.
    if (window.matchMedia('(max-width: 900px)').matches) return;
    navigator.serviceWorker.ready.then(function (registration) {
      var worker = navigator.serviceWorker.controller || registration.active;
      if (worker) worker.postMessage({ type: 'CACHE_DOCUMENT_PACK', url: DOCUMENT_PACK });
    }).catch(function () {});
  }

  // One compressed request installs every regular route. This starts as soon
  // as parsing finishes, so a user can click immediately instead of waiting
  // for nineteen serial document requests to complete.
  installDocumentPack();
  if (!window.matchMedia('(max-width: 900px)').matches) {
    window.addEventListener('load', warmVisible, { once: true, passive: true });
  }

  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      installDocumentPack();
      warmed.forEach(function (value) { cacheWithWorker(value); });
    });
  }
}());
/* Prepare only the fourth-contest entry when its link is actually visible. */
(function () {
  var root = '/factorhub/fourthFactorCompetition';
  if (location.pathname.replace(/\/$/, '') === root || !window.IntersectionObserver) return;
  if (navigator.connection && navigator.connection.saveData) return;
  var warmed = false;
  function isEntry(link) {
    return link && link.origin === location.origin && link.pathname.replace(/\/$/, '') === root;
  }
  function warm() {
    if (warmed) return;
    warmed = true;
    observer.disconnect();
    mutations.disconnect();
    window.__fmWarmReady = Promise.all([
      '/assets/hero-stream-v2/init.mp4',
      '/assets/hero-stream-v2/000.m4s',
      '/assets/hero-stream-v2/001.m4s',
      '/assets/entry-fast-v1.js',
      '/knowledge-base/assets/index-rPTfx3Br.css?v=20260825-compat2',
      '/knowledge-base/snapshot-20260830-052437/mobile-interaction-contract.css?v=20260830-052437-final'
    ].map(function (path) {
      var url = root + path;
      return fetch(url, { cache: 'force-cache', priority: 'low' }).then(function (response) {
        if (!response.ok) return;
        return response.arrayBuffer().then(function (buffer) {
          if (path.indexOf('/assets/hero-stream-v2/') !== 0) return;
          // Only the opening (~1 MB encoded), not the whole movie. This stays
          // in the current tab and avoids unreliable cross-document media-cache
          // reuse in WebKit. Quota/privacy failures fall back to normal fetch.
          var bytes = new Uint8Array(buffer), binary = '';
          for (var i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
          sessionStorage.setItem('panda-fourth-opening-v2:' + path.split('/').pop(), btoa(binary));
        });
      }).catch(function () {});
    }));
  }
  var seen = new WeakSet();
  var observer = new IntersectionObserver(function (entries) {
    if (entries.some(function (entry) { return entry.isIntersecting; })) warm();
  });
  function scan() {
    if (warmed) return;
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (isEntry(link) && !seen.has(link)) { seen.add(link); observer.observe(link); }
    });
  }
  var mutations = new MutationObserver(scan);
  mutations.observe(document.documentElement, { childList: true, subtree: true });
  ['pointerover', 'touchstart', 'focusin'].forEach(function (type) {
    document.addEventListener(type, function (event) {
      var target = event.target instanceof Element && event.target.closest('a[href]');
      if (isEntry(target)) warm();
    }, { passive: true });
  });
  scan();
}());
