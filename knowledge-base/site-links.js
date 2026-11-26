(function () {
  const stabilizeCriOSNavigationCommitFrame = navigation => {
    const root = navigation?.closest?.('#panda-mobile-navigation-root') ||
      document.getElementById('panda-mobile-navigation-root');
    if (!(root instanceof HTMLElement)) return;
    const drawer = root.querySelector('.panda-mobile-drawer');
    if (drawer instanceof HTMLElement && !drawer.hidden) {
      const height = drawer.getBoundingClientRect().height;
      if (height) drawer.style.setProperty('height', `${height}px`, 'important');
    }
    root.style.setProperty('will-change', 'transform', 'important');
    const viewport = window.visualViewport;
    const startedAt = performance.now();
    let frame = 0;
    const pinToVisualViewport = () => {
      const x = Math.max(0, viewport?.offsetLeft || 0);
      const y = Math.max(0, viewport?.offsetTop || 0);
      root.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`, 'important');
      if (performance.now() - startedAt < 2500) frame = requestAnimationFrame(pinToVisualViewport);
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pinToVisualViewport);
    };
    viewport?.addEventListener('scroll', refresh, { passive: true, once: true });
    viewport?.addEventListener('resize', refresh, { passive: true, once: true });
    pinToVisualViewport();
  };
  if (/CriOS/i.test(navigator.userAgent || '') && matchMedia('(max-width: 768px)').matches &&
      !window.__pandaCriOSNavigationCommitGuard) {
    window.__pandaCriOSNavigationCommitGuard = true;
    window.addEventListener('click', event => {
      const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = origin?.closest('.panda-mobile-home,.panda-mobile-link,.panda-mobile-account a');
      if (!link?.href) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      stabilizeCriOSNavigationCommitFrame(link.closest('.panda-mobile-navigation'));
      location.assign(link.href);
    }, true);
  }

  // This portfolio copy is deliberately self-contained. Historical bundles
  // still contain product actions which used to call the original company's
  // backend. Block those calls before any page bundle can send a request.
  const detachedHosts = new Set([
    'panda-api.invalid',
    'panda-assets.invalid',
    'panda-demo.invalid',
    'tqx-demo.invalid',
    'quantskills-demo.invalid'
  ]);
  const detachedUrl = value => {
    try {
      const parsed = new URL(String(value), window.location.href);
      return detachedHosts.has(parsed.hostname) ? parsed : null;
    } catch (_) {
      return null;
    }
  };
  const offlineResponse = () => new Response(JSON.stringify({
    ok: false,
    code: 'INDEPENDENT_PORTFOLIO_DEMO',
    message: '此功能为作品展示，不连接原公司服务。'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });

  if (window.fetch) {
    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, init) => detachedUrl(typeof input === 'string' || input instanceof URL ? input : input?.url)
      ? Promise.resolve(offlineResponse())
      : nativeFetch(input, init);
  }

  if (window.XMLHttpRequest) {
    const nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
      return nativeOpen.call(this, method, detachedUrl(url) ? '/__independent_demo_offline__' : url, ...rest);
    };
  }

  if (window.WebSocket) {
    const NativeWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
      if (detachedUrl(url)) throw new DOMException('Independent portfolio demo: remote socket disabled', 'NetworkError');
      return protocols === undefined ? new NativeWebSocket(url) : new NativeWebSocket(url, protocols);
    };
    window.WebSocket.prototype = NativeWebSocket.prototype;
    Object.defineProperties(window.WebSocket, {
      CONNECTING: { value: NativeWebSocket.CONNECTING },
      OPEN: { value: NativeWebSocket.OPEN },
      CLOSING: { value: NativeWebSocket.CLOSING },
      CLOSED: { value: NativeWebSocket.CLOSED }
    });
  }

  const nativeOpenWindow = window.open?.bind(window);
  if (nativeOpenWindow) {
    window.open = (url, ...rest) => detachedUrl(url)
      ? nativeOpenWindow('/#independent-demo', '_self')
      : nativeOpenWindow(url, ...rest);
  }

  document.addEventListener('click', event => {
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!anchor || !detachedUrl(anchor.href)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign('/#independent-demo');
  }, true);

  const CURRENT_HOME_ENTRY = '/?release=20260908-smooth-30';

  // Mobile browser chrome (especially WeChat's bottom toolbar) changes the
  // visual viewport in several discrete steps. Publish one interpolated
  // height for every page so full-screen compositions do not jump between
  // those native toolbar states.
  const installSmoothMobileViewport = () => {
    if (window.__pandaSmoothViewport) return;
    if (!window.matchMedia?.('(max-width: 900px), (hover: none) and (pointer: coarse)').matches) return;

    const root = document.documentElement;
    const viewport = window.visualViewport;
    const isAndroid = /Android/i.test(navigator.userAgent || '');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let target = 0;
    let velocity = 0;
    let frame = 0;
    let lastFrameTime = 0;
    let homeViewportRange = null;
    let lastRawHeight = 0;
    let homeEndpoint = 0;
    let androidHomeScrollActive = false;
    let androidHomeScrollTimer = 0;

    const measureRaw = () => {
      // visualViewport is the single authoritative signal while mobile
      // browser chrome animates. Mixing it with innerHeight creates a
      // two-stage target in WeChat because those values update at different
      // moments, which feels like a pause halfway through the transition.
      const height = viewport?.height || window.innerHeight || root.clientHeight || 0;
      return Math.round((height || 0) * 10) / 10;
    };

    const readHomeViewportRange = () => {
      if (location.pathname !== '/' || !window.CSS?.supports?.('height', '100svh') || !document.body) return null;
      const probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;left:0;top:0;width:1px;height:100svh;contain:strict;';
      document.body.appendChild(probe);
      const small = probe.getBoundingClientRect().height;
      probe.style.height = '100lvh';
      const large = probe.getBoundingClientRect().height;
      probe.remove();
      if (!small || !large || large - small < 8) return null;
      return { small, large };
    };

    const measure = () => {
      const raw = measureRaw();
      if (location.pathname !== '/') return raw;
      // Android Chrome's visible viewport already follows the address bar.
      // Snapping it to the CSS svh/lvh endpoints can leave the hero on the
      // expanded-toolbar height after the user scrolls back to the top, which
      // pushes the copy and CTAs too close to the bottom edge.
      if (isAndroid) return raw;
      if (!homeViewportRange) homeViewportRange = readHomeViewportRange();
      const range = homeViewportRange;
      if (!range) return raw;

      // A software keyboard is not browser chrome; preserve its real height.
      if (raw < range.small - 72) {
        lastRawHeight = raw;
        homeEndpoint = raw;
        return raw;
      }

      if (!lastRawHeight) {
        lastRawHeight = raw;
        homeEndpoint = Math.abs(raw - range.small) <= Math.abs(raw - range.large) ? range.small : range.large;
        return homeEndpoint;
      }

      const rawDelta = raw - lastRawHeight;
      lastRawHeight = raw;
      // Project the very first meaningful toolbar movement straight to its
      // final CSS viewport endpoint. Later stepped resize samples therefore
      // cannot create a plateau in the middle of the animation.
      if (rawDelta > 1.5) homeEndpoint = range.large;
      else if (rawDelta < -1.5) homeEndpoint = range.small;
      return homeEndpoint || raw;
    };

    const api = {
      height: 0,
      target: 0,
      active: false,
      getHeight: () => current || measure()
    };
    window.__pandaSmoothViewport = api;
    root.dataset.pandaSmoothViewport = 'true';
    if (location.pathname === '/') root.dataset.pandaHomeViewport = 'true';
    if (/MicroMessenger/i.test(navigator.userAgent || '')) root.dataset.pandaWechatViewport = 'true';

    const style = document.createElement('style');
    style.id = 'panda-smooth-mobile-viewport-style';
    style.textContent = `
      @media (max-width: 900px) {
        html[data-panda-smooth-viewport="true"]:not([data-panda-home-viewport="true"]) .hero,
        html[data-panda-smooth-viewport="true"] .hero-section,
        html[data-panda-smooth-viewport="true"] .rules-hero,
        html[data-panda-smooth-viewport="true"] .si-hero,
        html[data-panda-smooth-viewport="true"] .sp-hero {
          transition-property: height, min-height, max-height, padding-top, padding-bottom;
          transition-duration: 280ms;
          transition-timing-function: cubic-bezier(.22, 1, .36, 1);
        }
        html[data-data-service-viewport] .hero,
        html[data-data-service-viewport] .hero-stage,
        html[data-education-viewport] .se-hero,
        html[data-education-viewport] .se-hero-inner {
          transition: none !important;
        }
        html[data-panda-home-viewport="true"] .hero,
        html[data-panda-home-viewport="true"] .hero-bg,
        html[data-panda-home-viewport="true"] .scanning-hero,
        html[data-panda-home-viewport="true"] .scanning-fallback,
        html[data-panda-home-viewport="true"] .scanning-canvas {
          transition: none !important;
        }
        html[data-panda-home-viewport="true"] .hero {
          height: var(--panda-smooth-viewport-height, 100dvh) !important;
          min-height: var(--panda-smooth-viewport-height, 100dvh) !important;
          max-height: var(--panda-smooth-viewport-height, 100dvh) !important;
        }
        /* Resize only the hero's clipping window. Keep the entire live media
           surface at its native 16:9 ratio and scale it as one unit; changing
           browser chrome then reveals/crops pixels instead of stretching the
           astronaut independently on the x/y axes. */
        html[data-panda-home-viewport="true"] .hero > .hero-bg,
        html[data-panda-home-viewport="true"] .hero > .scanning-hero {
          bottom: auto !important;
          left: 83% !important;
          right: auto !important;
          top: 50% !important;
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: none !important;
          width: 177.7778vh !important;
          min-width: 177.7778vh !important;
          max-width: none !important;
          transform: translate(-83%, -50%) !important;
        }
        @supports (height: 100lvh) {
          html[data-panda-home-viewport="true"] .hero > .hero-bg,
          html[data-panda-home-viewport="true"] .hero > .scanning-hero {
            height: 100lvh !important;
            min-height: 100lvh !important;
            width: 177.7778lvh !important;
            min-width: 177.7778lvh !important;
          }
        }
        html[data-panda-home-viewport="true"] .scanning-fallback,
        html[data-panda-home-viewport="true"] .scanning-canvas {
          height: 100% !important;
          width: 100% !important;
        }
        html[data-panda-home-viewport="true"] .hero-bg,
        html[data-panda-home-viewport="true"] .scanning-fallback,
        html[data-panda-home-viewport="true"] .scanning-canvas {
          object-fit: cover !important;
        }
      }
      @media (max-width: 900px) and (orientation: landscape) {
        html[data-panda-home-viewport="true"] .hero > .hero-bg,
        html[data-panda-home-viewport="true"] .hero > .scanning-hero {
          height: 56.25vw !important;
          min-height: 56.25vw !important;
          width: 100vw !important;
          min-width: 100vw !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        html[data-panda-smooth-viewport="true"]:not([data-panda-home-viewport="true"]) .hero,
        html[data-panda-smooth-viewport="true"] .hero-section,
        html[data-panda-smooth-viewport="true"] .rules-hero,
        html[data-panda-smooth-viewport="true"] .si-hero,
        html[data-panda-smooth-viewport="true"] .sp-hero { transition: none !important; }
      }
    `;
    document.head.appendChild(style);

    const publish = active => {
      const height = Math.round(current * 100) / 100;
      api.height = height;
      api.target = target;
      api.active = active;
      root.style.setProperty('--panda-smooth-viewport-height', `${height}px`);
      root.style.setProperty('--panda-smooth-vh', `${height / 100}px`);
      root.dataset.pandaViewportTransitioning = active ? 'true' : 'false';
      window.dispatchEvent(new CustomEvent('panda:visualviewport', {
        detail: { height, target, active }
      }));
    };

    const animate = time => {
      const delta = Math.min(48, Math.max(1, time - (lastFrameTime || time - 16.7)));
      lastFrameTime = time;
      const seconds = delta / 1000;
      const distance = target - current;
      // A critically damped spring keeps its velocity when the native browser
      // reports another intermediate toolbar height. This avoids the tiny
      // slow-down between visualViewport resize steps.
      velocity += (distance * 260 - velocity * 32) * seconds;
      current += velocity * seconds;
      if (Math.abs(target - current) < .18 && Math.abs(velocity) < 2) {
        current = target;
        velocity = 0;
        frame = 0;
        publish(false);
        return;
      }
      publish(true);
      frame = requestAnimationFrame(animate);
    };

    const retarget = force => {
      // Android changes visualViewport.height while its browser chrome is
      // collapsing or expanding. Updating the hero's layout height during
      // that same document scroll changes the height of content above the
      // current anchor, so Chrome compensates with a visible scroll jump.
      // Keep one height for the complete gesture and reconcile it only after
      // the page has settled back at the very top.
      if (isAndroid && location.pathname === '/' && !force &&
          (androidHomeScrollActive || window.scrollY > 1)) return;
      const next = measure();
      if (!next) return;
      target = next;
      api.target = target;
      if (!current || reducedMotion) {
        current = target;
        velocity = 0;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        publish(false);
        return;
      }
      if (Math.abs(target - current) < .18) return;
      if (!frame) {
        lastFrameTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };

    retarget();
    window.addEventListener('resize', () => retarget(false), { passive: true });
    if (isAndroid && location.pathname === '/') {
      window.addEventListener('scroll', () => {
        androidHomeScrollActive = true;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        target = current;
        velocity = 0;
        publish(false);
        if (androidHomeScrollTimer) clearTimeout(androidHomeScrollTimer);
        androidHomeScrollTimer = window.setTimeout(() => {
          androidHomeScrollActive = false;
          if (window.scrollY <= 1) retarget(true);
        }, 160);
      }, { passive: true });
    }
    window.addEventListener('orientationchange', () => {
      homeViewportRange = null;
      lastRawHeight = 0;
      homeEndpoint = 0;
      retarget(true);
      window.setTimeout(() => retarget(true), 120);
    }, { passive: true });
    window.addEventListener('pageshow', () => retarget(false), { passive: true });
    if (viewport) {
      viewport.addEventListener('resize', () => retarget(false), { passive: true });
      if (!(isAndroid && location.pathname === '/')) {
        viewport.addEventListener('scroll', () => retarget(false), { passive: true });
      }
    }
  };
  installSmoothMobileViewport();

  const authPageEntry = /^\/login(?:\/|$)/.test(location.pathname);
  if (authPageEntry) {
    document.documentElement.dataset.pandaAuthPage = 'true';
    const authShellStyle = document.createElement('style');
    authShellStyle.id = 'panda-auth-shell-isolation-style';
    authShellStyle.textContent = 'html[data-panda-auth-page="true"] .nav-container,html[data-panda-auth-page="true"] #panda-mobile-navigation-root,html[data-panda-auth-page="true"] #panda-first-frame-brand{display:none!important}';
    document.head.appendChild(authShellStyle);
  }
  const clearNavigationCovers = () => {
    document.querySelectorAll('[data-panda-navigation-cover="true"],#panda-seamless-page-cover').forEach(node => node.remove());
  };
  window.addEventListener('pageshow', clearNavigationCovers, { passive: true });
  window.addEventListener('pagehide', clearNavigationCovers, { passive: true });
  if (!document.getElementById('panda-mobile-interaction-contract')) {
    const mobileContract = document.createElement('link');
    mobileContract.id = 'panda-mobile-interaction-contract';
    mobileContract.rel = 'stylesheet';
    mobileContract.href = '/knowledge-base/shared-pages/mobile-interaction-contract.css?v=20260827-browser-parity-1';
    document.head.appendChild(mobileContract);
  }

  const installMobileTextArrows = () => {
    if (!window.matchMedia?.('(max-width: 900px), (hover: none) and (pointer: coarse)').matches) return;
    const arrowPattern = /\u2197[\uFE0E\uFE0F]*/g;
    const sync = root => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const value = node.nodeValue || '';
        if (!value.includes('\u2197')) continue;
        const normalized = value.replace(arrowPattern, '\u2197\uFE0E');
        if (normalized !== value) node.nodeValue = normalized;
        node.parentElement?.setAttribute('data-panda-text-arrow', 'true');
      }
    };
    const start = () => {
      sync(document.body);
      new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) sync(node.parentNode);
        else if (node instanceof Element) sync(node);
      }))).observe(document.body, { childList: true, subtree: true });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  };
  installMobileTextArrows();

  // Keep the assistant's return-to-top motion identical when the page cannot
  // create Lenis or when an engine schedules native smooth scrolling differently. The component's
  // native fallback delegates to each browser's implementation of
  // `behavior: smooth`, whose timing and easing are intentionally unspecified.
  // Intercept only that fallback path and reproduce the active Lenis settings.
  const installDeterministicReturnToTop = () => {
    if (window.PandaReturnToTop) return;
    const DURATION_MS = 1900;
    const MAX_FRAME_DELTA_MS = 34;
    const INPUT_SYNC_MS = 240;
    const BUTTON_SELECTOR = '.assistant-btn[aria-label="返回顶部"]';
    let animationFrame = 0;
    let restoreScrollBehavior = null;
    let inputSyncTimer = 0;
    let inputSyncActive = false;
    let nativeScrollCleanup = null;

    const hasActiveLenis = () => {
      const root = document.documentElement;
      return root.classList.contains('lenis') && !root.classList.contains('lenis-stopped');
    };

    const animationStyle = document.createElement('style');
    animationStyle.id = 'panda-return-to-top-compositor-style';
    animationStyle.textContent = `
      html.panda-returning-to-top { scroll-behavior: auto !important; }
      .assistant-btn[aria-label="返回顶部"] {
        isolation: isolate !important;
        z-index: 2147483646 !important;
      }
      @media (max-width: 900px) {
        html.panda-returning-to-top .hero[data-v-2abc3f3f] .hero-text {
          animation: none !important;
          opacity: 1 !important;
          transition: none !important;
          visibility: visible !important;
        }
      }
    `;
    document.head.appendChild(animationStyle);

    const setAnimationMode = active => {
      document.documentElement.classList.toggle('panda-returning-to-top', active);
    };

    const finishInputSync = () => {
      inputSyncActive = false;
      if (inputSyncTimer) clearTimeout(inputSyncTimer);
      inputSyncTimer = 0;
    };

    const scheduleInputSyncFinish = () => {
      if (inputSyncTimer) clearTimeout(inputSyncTimer);
      inputSyncTimer = window.setTimeout(finishInputSync, INPUT_SYNC_MS);
    };

    const beginInputSync = () => {
      inputSyncActive = true;
      scheduleInputSyncFinish();
    };

    const cancelAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (nativeScrollCleanup) {
        const cleanup = nativeScrollCleanup;
        nativeScrollCleanup = null;
        cleanup();
      }
      if (restoreScrollBehavior) restoreScrollBehavior();
      restoreScrollBehavior = null;
      setAnimationMode(false);
    };

    const forceInstantProgrammaticScroll = () => {
      const elements = [document.documentElement, document.body].filter(Boolean);
      const previous = elements.map(element => ({
        element,
        value: element.style.getPropertyValue('scroll-behavior'),
        priority: element.style.getPropertyPriority('scroll-behavior')
      }));
      elements.forEach(element => element.style.setProperty('scroll-behavior', 'auto', 'important'));
      return () => previous.forEach(({ element, value, priority }) => {
        if (value) element.style.setProperty('scroll-behavior', value, priority);
        else element.style.removeProperty('scroll-behavior');
      });
    };

    const monitorExistingLenisReturn = () => {
      setAnimationMode(true);
      let settleTimer = 0;
      let safetyTimer = 0;
      const cleanup = () => {
        window.removeEventListener('scroll', onScroll, true);
        if (settleTimer) clearTimeout(settleTimer);
        if (safetyTimer) clearTimeout(safetyTimer);
      };
      const finish = () => {
        if (nativeScrollCleanup !== cleanup) return;
        nativeScrollCleanup = null;
        cleanup();
        const restore = forceInstantProgrammaticScroll();
        window.scrollTo(0, 0);
        restore();
        setAnimationMode(false);
        beginInputSync();
      };
      const onScroll = () => {
        if (window.scrollY > 1) return;
        if (settleTimer) clearTimeout(settleTimer);
        settleTimer = window.setTimeout(finish, 48);
      };
      nativeScrollCleanup = cleanup;
      window.addEventListener('scroll', onScroll, { capture: true, passive: true });
      safetyTimer = window.setTimeout(finish, 2800);
    };

    const useNativeWebKitScroll = () => {
      const ua = navigator.userAgent || '';
      return /AppleWebKit/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Android/i.test(ua);
    };

    const runFrameScroll = (startY, duration, finish) => {
      let previousFrameAt = performance.now();
      let elapsed = 0;
      const tick = now => {
        const frameDelta = Math.max(0, now - previousFrameAt);
        previousFrameAt = now;
        elapsed += Math.min(frameDelta, MAX_FRAME_DELTA_MS);
        const progress = Math.min(1, elapsed / duration);
        const eased = Math.min(1, 1.001 - Math.pow(2, -10 * progress));
        window.scrollTo(0, startY * (1 - eased));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
          return;
        }
        window.scrollTo(0, 0);
        animationFrame = 0;
        finish();
      };
      animationFrame = requestAnimationFrame(() => {
        animationFrame = requestAnimationFrame(now => {
          previousFrameAt = now;
          tick(now);
        });
      });
    };

    const scrollToTopWithNativeWebKit = startY => {
      setAnimationMode(true);
      document.documentElement.classList.add('panda-webkit-returning-to-top');
      let safetyTimer = 0;
      const pageStack = document.querySelector('#__nuxt .index > .page-stack');
      const button = document.querySelector(BUTTON_SELECTOR);
      const hero = pageStack?.querySelector('.hero');
      const heroText = hero?.querySelector('.hero-text');
      if (!(pageStack instanceof HTMLElement)) {
        document.documentElement.classList.remove('panda-webkit-returning-to-top');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        beginInputSync();
        return;
      }
      const previousTransform = pageStack.style.transform;
      const previousWillChange = pageStack.style.willChange;
      const previousButtonVisibility = button instanceof HTMLElement ? button.style.visibility : '';
      const previousHeroWillChange = hero instanceof HTMLElement ? hero.style.willChange : '';
      const heroTextPaintProperties = [
        'backface-visibility',
        'opacity',
        'transform',
        'visibility',
        'will-change'
      ];
      const previousHeroTextPaint = heroText instanceof HTMLElement
        ? heroTextPaintProperties.map(property => ({
            property,
            value: heroText.style.getPropertyValue(property),
            priority: heroText.style.getPropertyPriority(property)
          }))
        : [];
      const heroStartStyle = hero instanceof HTMLElement ? getComputedStyle(hero) : null;
      const heroStartTransform = heroStartStyle?.transform || 'none';
      let motion = null;
      let desktopHeroMotion = null;
      let heroMotionFrame = 0;
      let buttonClone = null;
      let finished = false;
      const cleanup = () => {
        if (motion) motion.cancel();
        motion = null;
        if (desktopHeroMotion) desktopHeroMotion.cancel();
        desktopHeroMotion = null;
        if (heroMotionFrame) cancelAnimationFrame(heroMotionFrame);
        heroMotionFrame = 0;
        if (safetyTimer) clearTimeout(safetyTimer);
        pageStack.style.transform = previousTransform;
        pageStack.style.willChange = previousWillChange;
        if (hero instanceof HTMLElement) {
          hero.style.setProperty('--panda-mobile-hero-scale', '1');
          hero.style.setProperty('--panda-mobile-hero-radius', '0px');
          hero.style.willChange = previousHeroWillChange;
        }
        if (heroText instanceof HTMLElement) {
          previousHeroTextPaint.forEach(({ property, value, priority }) => {
            if (value) heroText.style.setProperty(property, value, priority);
            else heroText.style.removeProperty(property);
          });
        }
        document.documentElement.classList.remove('panda-webkit-returning-to-top');
        if (button instanceof HTMLElement) button.style.visibility = previousButtonVisibility;
        if (buttonClone) buttonClone.remove();
        buttonClone = null;
      };
      const finish = () => {
        if (finished || nativeScrollCleanup !== cleanup) return;
        finished = true;
        nativeScrollCleanup = null;
        cleanup();
        setAnimationMode(false);
        beginInputSync();
      };
      nativeScrollCleanup = cleanup;
      if (button instanceof HTMLElement) {
        const rect = button.getBoundingClientRect();
        buttonClone = button.cloneNode(true);
        buttonClone.removeAttribute('ref');
        buttonClone.style.cssText += `;position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;margin:0;pointer-events:none;z-index:2147483646`;
        document.body.appendChild(buttonClone);
        button.style.visibility = 'hidden';
      }
      // Move the real scroll state to zero in the same rendering task that
      // offsets the page by the inverse distance. The pixels therefore stay
      // in exactly the same place, then WebKit's compositor animates the page
      // continuously to its real top position without asking sticky layouts
      // to recalculate on every frame.
      const fromTransform = `translate3d(0, ${-startY}px, 0)`;
      pageStack.style.willChange = 'transform';
      pageStack.style.transform = fromTransform;
      const restore = forceInstantProgrammaticScroll();
      window.scrollTo(0, 0);
      restore();
      if (hero instanceof HTMLElement) {
        const matrix = heroStartTransform === 'none' ? null : new DOMMatrixReadOnly(heroStartTransform);
        const desktopHeroReturn = window.matchMedia('(min-width: 901px)').matches;
        const measuredStartScale = matrix ? Math.hypot(matrix.a, matrix.b) : 1;
        const startScale = desktopHeroReturn ? Math.min(measuredStartScale, .94) : measuredStartScale;
        const startRadius = parseFloat(heroStartStyle?.getPropertyValue('--panda-mobile-hero-radius')) ||
          parseFloat(heroStartStyle?.borderTopLeftRadius) || 0;
        const viewport = Math.max(1, document.documentElement.clientHeight || window.innerHeight || 1);
        // Keep the restored 09:44 layout and motion. Safari can defer painting
        // this DOM-heavy copy while its ancestors are moving on a compositor
        // layer, which makes the text/buttons flash in near the end. Promote
        // the original copy itself so it is painted and transformed together
        // with the astronaut without changing its geometry or timing.
        if (heroText instanceof HTMLElement) {
          heroText.style.setProperty('backface-visibility', 'hidden', 'important');
          heroText.style.setProperty('opacity', '1', 'important');
          heroText.style.setProperty('transform', 'translate3d(0, 0, 0)', 'important');
          heroText.style.setProperty('visibility', 'visible', 'important');
          heroText.style.setProperty('will-change', 'transform, opacity', 'important');
        }
        const sampleBezier = progress => {
          const x = value => 3 * .19 * (1 - value) ** 2 * value + 3 * .22 * (1 - value) * value ** 2 + value ** 3;
          const y = value => 3 * (1 - value) ** 2 * value + 3 * (1 - value) * value ** 2 + value ** 3;
          let low = 0;
          let high = 1;
          for (let index = 0; index < 14; index += 1) {
            const middle = (low + high) / 2;
            if (x(middle) < progress) low = middle;
            else high = middle;
          }
          return y((low + high) / 2);
        };
        const renderHeroMotion = startedAt => now => {
          const offset = Math.min(1, Math.max(0, (now - startedAt) / DURATION_MS));
          const virtualY = startY * (1 - sampleBezier(offset));
          const visibleProgress = startY > viewport
            ? Math.max(0, 1 - virtualY / viewport)
            : Math.max(0, Math.min(1, (startY - virtualY) / startY));
          const scale = startScale + (1 - startScale) * visibleProgress;
          const radius = startY > viewport
            ? startRadius * Math.min(1, virtualY / viewport)
            : startRadius * Math.max(0, virtualY / startY);
          // The mobile contract owns transform/border-radius with !important.
          // Drive its variables so the background and hero copy stay on one
          // composited layer and grow together, exactly like the desktop path.
          hero.style.setProperty('--panda-mobile-hero-scale', scale.toFixed(5));
          hero.style.setProperty('--panda-mobile-hero-radius', `${radius.toFixed(3)}px`);
          if (offset < 1) heroMotionFrame = requestAnimationFrame(renderHeroMotion(startedAt));
          else heroMotionFrame = 0;
        };
        hero.style.willChange = 'transform, border-radius';
        if (desktopHeroReturn) {
          const desktopStartRadius = Math.max(startRadius, 28);
          const keyframes = Array.from({ length: 61 }, (_, index) => {
            const offset = index / 60;
            const virtualY = startY * (1 - sampleBezier(offset));
            const visibleProgress = startY > viewport
              ? Math.max(0, 1 - virtualY / viewport)
              : Math.max(0, Math.min(1, (startY - virtualY) / startY));
            const scale = startScale + (1 - startScale) * visibleProgress;
            const radius = desktopStartRadius * (1 - visibleProgress);
            return {
              offset,
              transform: `scale(${scale.toFixed(5)})`,
              borderRadius: `${radius.toFixed(3)}px`
            };
          });
          desktopHeroMotion = hero.animate(keyframes, {
            duration: DURATION_MS,
            easing: 'linear',
            fill: 'both'
          });
        } else {
          const heroMotionStartedAt = performance.now();
          renderHeroMotion(heroMotionStartedAt)(heroMotionStartedAt);
        }
      }
      motion = pageStack.animate(
        [{ transform: fromTransform }, { transform: 'translate3d(0, 0, 0)' }],
        { duration: DURATION_MS, easing: 'cubic-bezier(.19, 1, .22, 1)', fill: 'both' }
      );
      motion.finished.then(finish, finish);
      safetyTimer = window.setTimeout(finish, DURATION_MS + 500);
    };

    const scrollToTop = () => {
      cancelAnimation();
      finishInputSync();
      const startY = window.scrollY || document.documentElement.scrollTop || 0;
      if (startY <= 0) return;

      if (useNativeWebKitScroll()) {
        scrollToTopWithNativeWebKit(startY);
        return;
      }

      setAnimationMode(true);
      restoreScrollBehavior = forceInstantProgrammaticScroll();
      runFrameScroll(startY, DURATION_MS, () => {
        cancelAnimation();
        beginInputSync();
      });
    };

    const normalizeWheelDelta = event => {
      if (event.deltaMode === 1) return event.deltaY * 16;
      if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };

    const reconcileFirstWheelAfterTop = event => {
      if (!inputSyncActive || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const nextY = Math.max(0, Math.min(maxY, window.scrollY + normalizeWheelDelta(event)));
      const restore = forceInstantProgrammaticScroll();
      window.scrollTo(0, nextY);
      restore();
      scheduleInputSyncFinish();
    };

    window.addEventListener('wheel', reconcileFirstWheelAfterTop, { capture: true, passive: false });

    document.addEventListener('pointerdown', event => {
      const target = event.target instanceof Element ? event.target.closest(BUTTON_SELECTOR) : null;
      if (target && hasActiveLenis() && !useNativeWebKitScroll()) monitorExistingLenisReturn();
      else if (target) setAnimationMode(true);
    }, true);

    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target.closest(BUTTON_SELECTOR) : null;
      if (!target) return;

      if (hasActiveLenis() && !useNativeWebKitScroll()) {
        if (!document.documentElement.classList.contains('panda-returning-to-top')) {
          monitorExistingLenisReturn();
        }
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      scrollToTop();
    }, true);

    window.addEventListener('wheel', event => {
      if (!inputSyncActive) cancelAnimation(event);
    }, { passive: true });
    window.addEventListener('touchstart', cancelAnimation, { passive: true });
    window.PandaReturnToTop = { cancel: cancelAnimation, start: scrollToTop };
  };
  installDeterministicReturnToTop();

  const faviconHref = '/knowledge-base/_nuxt/icon.DpwKN-kR.png?v=20260824-1';
  let faviconSyncQueued = false;
  const ensureSharedFavicon = () => {
    faviconSyncQueued = false;
    let favicon = document.getElementById('panda-site-favicon');
    document.querySelectorAll('link[rel~="icon"]').forEach(link => {
      if (link !== favicon) link.remove();
    });
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.id = 'panda-site-favicon';
      document.head.appendChild(favicon);
    }
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.sizes = '170x180';
    favicon.href = faviconHref;
  };
  ensureSharedFavicon();

  // The cloud identity SDK used to be a parser-time dependency on every page.
  // Loading it after the document is interactive prevents a slow or blocked
  // third-party CDN from holding the browser's load event (a common WeChat and
  // cross-border network failure mode). Only auth pages need this SDK; loading
  // it after an arbitrary click on a public page can inject identity UI into
  // the current document.
  const loadCloudIdentitySdk = () => {
    if (window.PandaCloudIdentitySdkRequested || document.getElementById('panda-cloud-identity-sdk')) return;
    window.PandaCloudIdentitySdkRequested = true;
    const script = document.createElement('script');
    script.id = 'panda-cloud-identity-sdk';
    script.src = 'https://o.alicdn.com/yd-cloudauth/cloudauth-cdn/jsvm_all.js';
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    document.head.appendChild(script);
  };
  if (/^\/login(?:\/|$)/.test(location.pathname)) {
    if (document.readyState === 'complete') loadCloudIdentitySdk();
    else window.addEventListener('load', loadCloudIdentitySdk, { once: true });
  }
  if (!document.getElementById('panda-legacy-account-widget-style')) {
    const legacyAccountWidgetStyle = document.createElement('style');
    legacyAccountWidgetStyle.id = 'panda-legacy-account-widget-style';
    legacyAccountWidgetStyle.textContent =
      '.nav-container[data-navigation-master-shell="true"] .user-fixed,body>.user-fixed{display:none!important}';
    document.head.appendChild(legacyAccountWidgetStyle);
  }
  new MutationObserver(() => {
    if (faviconSyncQueued) return;
    faviconSyncQueued = true;
    queueMicrotask(ensureSharedFavicon);
  }).observe(document.head, { childList: true });

  if (!document.getElementById('panda-retired-navigation-style')) {
    const retiredNavigationStyle = document.createElement('style');
    retiredNavigationStyle.id = 'panda-retired-navigation-style';
    retiredNavigationStyle.textContent = [
      '.nav-container a[href="/download"]',
      '.nav-container a[href="/hypermarket"]',
      '.nav-container a[href="/learninghub/newcourse"]',
      '.dropdown-portal a[href="/download"]',
      '.dropdown-portal a[href="/hypermarket"]',
      '.dropdown-portal a[href="/learninghub/newcourse"]'
    ].join(',') + '{display:none!important}';
    document.head.appendChild(retiredNavigationStyle);
  }
  let mobileNavStyle = document.getElementById('panda-shared-mobile-nav-style') ||
    document.querySelector('link[rel="stylesheet"][href^="/knowledge-base/shared-pages/mobile-navigation.css"]');
  if (!mobileNavStyle) {
    mobileNavStyle = document.createElement('link');
    mobileNavStyle.rel = 'stylesheet';
    document.head.appendChild(mobileNavStyle);
  }
  mobileNavStyle.id = 'panda-shared-mobile-nav-style';
  mobileNavStyle.href = '/knowledge-base/shared-pages/mobile-navigation.css?v=20260910-nav-viewport-1';
  if (!document.getElementById('panda-shared-home-nav-style')) {
    const homeNavStyle = document.createElement('link');
    homeNavStyle.id = 'panda-shared-home-nav-style';
    homeNavStyle.rel = 'stylesheet';
    homeNavStyle.href = '/knowledge-base/_nuxt/Nav.C_SQ34Up.css';
    document.head.appendChild(homeNavStyle);
  }
  const ensureSharedScrollbar = () => {
    let style = document.getElementById('panda-shared-scrollbar-style');
    if (!style) {
      style = document.createElement('link');
      style.id = 'panda-shared-scrollbar-style';
      style.rel = 'stylesheet';
      document.head.appendChild(style);
    }
    style.href = '/knowledge-base/shared-pages/scrollbar.css?v=20260825-compat6';

    let script = document.getElementById('panda-shared-scrollbar-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'panda-shared-scrollbar-script';
      script.defer = true;
      document.head.appendChild(script);
    }
    const scrollbarScriptUrl = '/shared-pages/scrollbar.js?v=20260907-responsive-scroll-15';
    if (!script.src.includes(scrollbarScriptUrl)) script.src = scrollbarScriptUrl;
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureSharedScrollbar, { once: true });
  } else {
    ensureSharedScrollbar();
  }
  if (!document.getElementById('panda-home-white-cta-style')) {
    const whiteCtaStyle = document.createElement('style');
    whiteCtaStyle.id = 'panda-home-white-cta-style';
    whiteCtaStyle.textContent = `
      .panda-home-white-cta {
        background-color: #fff !important;
        background-image: linear-gradient(#0a0a0a, #0a0a0a) !important;
        background-position: 0 50% !important;
        background-repeat: no-repeat !important;
        background-size: 0 100% !important;
        border: 1px solid #fff !important;
        box-sizing: border-box !important;
        box-shadow: none !important;
        color: #000 !important;
        overflow: hidden !important;
        transform: none !important;
        transition: background-size .32s cubic-bezier(.65, 0, .35, 1),
          color .32s cubic-bezier(.65, 0, .35, 1),
          border-color .32s cubic-bezier(.65, 0, .35, 1) !important;
      }
      .panda-home-white-cta:hover,
      .panda-home-white-cta:focus-visible,
      .panda-home-white-cta:active {
        background-size: 100% 100% !important;
        color: #fff !important;
        transform: none !important;
      }
      .panda-home-white-cta:hover *,
      .panda-home-white-cta:focus-visible *,
      .panda-home-white-cta:active * {
        color: inherit !important;
      }
      .panda-home-black-cta {
        background-color: #0a0a0a !important;
        background-image: linear-gradient(#fff, #fff) !important;
        background-position: 0 50% !important;
        background-repeat: no-repeat !important;
        background-size: 0 100% !important;
        border: 1px solid #0a0a0a !important;
        box-sizing: border-box !important;
        box-shadow: none !important;
        color: #fff !important;
        overflow: hidden !important;
        transform: none !important;
        transition: background-size .32s cubic-bezier(.65, 0, .35, 1),
          color .32s cubic-bezier(.65, 0, .35, 1),
          border-color .32s cubic-bezier(.65, 0, .35, 1) !important;
      }
      .panda-home-black-cta:hover,
      .panda-home-black-cta:focus-visible,
      .panda-home-black-cta:active {
        background-size: 100% 100% !important;
        color: #0a0a0a !important;
        transform: none !important;
      }
      .panda-home-black-cta:hover *,
      .panda-home-black-cta:focus-visible *,
      .panda-home-black-cta:active * {
        color: inherit !important;
      }
      .dc-permission-card-footer > button.panda-home-white-cta::after {
        content: none !important;
        display: none !important;
      }
      .dc-permission-card-footer > button.panda-home-white-cta:hover,
      .dc-permission-card-footer > button.panda-home-white-cta:focus-visible,
      .dc-permission-card-footer > button.panda-home-white-cta:active {
        background-color: #fff !important;
        box-shadow: none !important;
        color: #fff !important;
        transform: none !important;
      }
      @media (prefers-reduced-motion: reduce) {
        .panda-home-white-cta,
        .panda-home-black-cta { transition-duration: 0s !important; }
      }
    `;
    document.head.appendChild(whiteCtaStyle);
  }
  const WHITE_CTA_SELECTOR = 'button,a,[role="button"],input[type="button"],input[type="submit"]';
  const isNearWhite = value => {
    const channels = value?.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    return channels?.length === 3 && channels.every(channel => channel >= 244);
  };
  const syncWhiteCta = control => {
    if (!(control instanceof HTMLElement) || !control.matches(WHITE_CTA_SELECTOR)) return;
    if (control.matches('.tpl-use')) {
      control.classList.remove('panda-home-white-cta', 'panda-home-black-cta');
      return;
    }
    if (control.disabled || control.getAttribute('aria-disabled') === 'true' || control.dataset.pandaUnavailable === 'true') {
      control.classList.remove('panda-home-white-cta');
      return;
    }
    const style = getComputedStyle(control);
    const radius = parseFloat(style.borderTopLeftRadius) || 0;
    const box = control.getBoundingClientRect();
    const label = (control.textContent || control.getAttribute('value') || '').trim();
    const semanticButton = control.tagName === 'BUTTON' || control.tagName === 'INPUT' ||
      control.getAttribute('role') === 'button' ||
      /(?:^|[-_\s])(btn|button|cta|action|pill)(?:$|[-_\s])/.test(control.className);
    const qualifies = semanticButton && label && box.width >= 64 && box.height >= 30 && box.height <= 100 && radius >= 8 &&
      isNearWhite(style.backgroundColor) && style.visibility !== 'hidden' && style.display !== 'none';
    control.classList.toggle('panda-home-white-cta', Boolean(qualifies));
  };
  const syncWhiteCtasIn = root => {
    if (!(root instanceof Element || root instanceof Document)) return;
    if (root instanceof Element) syncWhiteCta(root);
    root.querySelectorAll(WHITE_CTA_SELECTOR).forEach(syncWhiteCta);
  };
  const startWhiteCtaSync = () => {
    syncWhiteCtasIn(document);
    const observer = new MutationObserver(records => records.forEach(record =>
      record.addedNodes.forEach(node => syncWhiteCtasIn(node))));
    const observerRoot = document.body || document.documentElement;
    if (observerRoot) observer.observe(observerRoot, { childList: true, subtree: true });
    const syncEventTarget = event => {
      const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
      syncWhiteCta(origin?.closest(WHITE_CTA_SELECTOR));
    };
    document.addEventListener('pointerover', syncEventTarget, true);
    document.addEventListener('focusin', syncEventTarget, true);
    window.setTimeout(() => syncWhiteCtasIn(document), 180);
    window.setTimeout(() => syncWhiteCtasIn(document), 800);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startWhiteCtaSync, { once: true });
  else window.setTimeout(startWhiteCtaSync, 0);
  window.__pandaSiteLinksCheckpoint = 'styles-ready';
  document.documentElement.dataset.siteLinksCheckpoint = 'styles-ready';

  const HOME_LOGO_SELECTOR = [
    '.panda-mobile-home',
    '.brand-logo',
    '.fm-brand',
    '.llm-navbar .nav-left .logo',
    '[data-login-home]',
    'header .logo',
    'header [aria-label="PandaAI"]',
    'nav .logo',
    'nav [aria-label="PandaAI"]'
  ].join(',');
  const findHomeLogo = target => {
    const origin = target instanceof Element ? target : target?.parentElement;
    return origin?.closest(HOME_LOGO_SELECTOR) || null;
  };
  const returnToCanonicalHome = event => {
    const logo = findHomeLogo(event.target);
    if (!logo) return;
    if (logo.matches?.('.panda-mobile-home') && event.type === 'click') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    let returnThroughCompetitionOpener = false;
    try {
      returnThroughCompetitionOpener = /^\/login(?:\/|$)/.test(location.pathname) &&
        sessionStorage.getItem('pandaai:competition-login-flow') === '1';
      sessionStorage.removeItem('pandaai:auth-return-url');
      sessionStorage.removeItem('pandaai:competition-login-flow');
    } catch (_) {}
    if (returnThroughCompetitionOpener && window.opener && !window.opener.closed) {
      try { window.opener.location.href = CURRENT_HOME_ENTRY; } catch (_) {}
      window.opener.focus();
      window.close();
      return;
    }
    location.assign(CURRENT_HOME_ENTRY);
  };
  document.addEventListener('click', returnToCanonicalHome, true);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    returnToCanonicalHome(event);
  }, true);
  window.__pandaSiteLinksCheckpoint = 'home-routing-ready';
  document.documentElement.dataset.siteLinksCheckpoint = 'home-routing-ready';

  const installMobileHomeHeroMotion = () => {
    if (location.pathname !== '/' || !window.matchMedia('(max-width: 900px)').matches) return false;
    if (window.__pandaMobileHomeHeroMotionReady) return true;
    const hero = document.querySelector('.hero[data-v-2abc3f3f]');
    if (!hero) return false;
    window.__pandaMobileHomeHeroMotionReady = true;
    const isAndroidHome = /Android/i.test(navigator.userAgent || '');
    let frame = 0;
    const render = () => {
      frame = 0;
      // The Safari return-to-top compositor drives these same variables while
      // the real scroll position is already zero. Do not snap the hero to its
      // final size before that synchronized animation has finished.
      if (document.documentElement.classList.contains('panda-webkit-returning-to-top')) return;
      const stableHeight = isAndroidHome ? window.__pandaSmoothViewport?.height : 0;
      const viewport = Math.max(1, stableHeight || document.documentElement.clientHeight || innerHeight);
      const progress = Math.max(0, Math.min(1, window.scrollY / (viewport * .72)));
      hero.style.setProperty('--panda-mobile-hero-scale', String(1 - progress * .055));
      hero.style.setProperty('--panda-mobile-hero-radius', `${progress * 28}px`);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    window.addEventListener('pageshow', queue, { passive: true });
    render();
    return true;
  };
  const startMobileHomeHeroMotion = () => {
    if (installMobileHomeHeroMotion()) return;
    window.setTimeout(installMobileHomeHeroMotion, 160);
    window.setTimeout(installMobileHomeHeroMotion, 600);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startMobileHomeHeroMotion, { once: true });
  else startMobileHomeHeroMotion();

  /*
   * One canonical destination for every current first-party experience.
   * A number of archived Nuxt components still contain their original route
   * callbacks, including non-anchor cards.  Resolve those controls in capture
   * phase so every visual entrance lands on the maintained local page.
   */
  // Pages serves directory indexes at the trailing-slash URL. Navigate there
  // directly instead of spending another network round trip on its 308.
  // Keep route matching above/below unchanged; normalize only at the handoff.
  const documentPagePaths = new Set([
    '/about', '/about/story', '/activities/strategyshare', '/community',
    '/competition/llm', '/competition/llm/login', '/competition/llm/rules',
    '/data-service', '/data-service/api-docs', '/docs', '/download',
    '/factorhub', '/factorhub/thirdFactorcompetition',
    '/factorhub/fourthFactorCompetition', '/factorhub/fourthFactorCompetition/login',
    '/hypermarket', '/join', '/knowledge-base', '/learninghub', '/learninghub/newcourse',
    '/login', '/login/forgot', '/login/register', '/login/smscode',
    '/partners/gldh', '/partnership', '/quant-pivot-academy', '/quantflow',
    '/quantflow/charts', '/quantskills', '/solutions/education',
    '/solutions/institution', '/solutions/personal'
  ]);
  const documentPageURL = value => {
    try {
      const url = new URL(value, location.href);
      if (url.origin !== location.origin || !documentPagePaths.has(url.pathname)) return value;
      return url.pathname + '/' + url.search + url.hash;
    } catch (_) { return value; }
  };
  window.PandaDocumentPageURL = documentPageURL;
  const CURRENT_PAGE_ROUTES = Object.freeze({
    llmCompetition: '/competition/llm?channel_id=061&page=0&render=static1',
    factorCompetition: '/factorhub/fourthFactorCompetition/?wechat-live=20260909-2',
    quantSkills: '/quantskills/',
    community: '/community',
    retiredCourseLogin: '/login?redirect=%2F'
  });
  const LOGIN_REQUIRED_PRODUCT_PATH_RE = /^\/quantflow(?:\/|$)/;
  const normalizedProductTarget = value => {
    if (!value) return '';
    let url;
    try { url = new URL(value, location.href); } catch (_) { return ''; }
    const localOrKnown = url.origin === location.origin ||
      url.hostname === 'design-ui-pandaai.pages.dev' ||
      url.hostname === 'panda-demo.invalid';
    if (!localOrKnown || !LOGIN_REQUIRED_PRODUCT_PATH_RE.test(url.pathname)) return '';
    const pathname = url.pathname === '/quantflow/charts/index.html'
      ? '/quantflow/charts'
      : url.pathname;
    return pathname + url.search + url.hash;
  };
  const productLoginRoute = value => {
    const target = normalizedProductTarget(value);
    return target ? '/login?redirect=' + encodeURIComponent(target) : '';
  };
  window.PandaCurrentPageRoutes = CURRENT_PAGE_ROUTES;
  window.__pandaSiteLinksCheckpoint = 'routes-ready';
  document.documentElement.dataset.siteLinksCheckpoint = 'routes-ready';
  const currentPath = location.pathname.replace(/\/+$/, '') || '/';
  const mobileViewport = matchMedia('(max-width: 768px)');
  const mobileKnowledgeLogin = '/login?redirect=%2F';
  const actionLoginRoute = value => {
    let url;
    try { url = new URL(value || '/login/', location.href); } catch (_) { return '/login/?entry=action&redirect=%2F'; }
    if (url.pathname.replace(/\/+$/, '') !== '/login') return url.pathname + url.search + url.hash;
    url.pathname = '/login/';
    url.searchParams.set('entry', 'action');
    return url.pathname + url.search + url.hash;
  };
  const mobileLoginHref = () => actionLoginRoute('/login?redirect=' + encodeURIComponent(location.pathname + location.search + location.hash));
  const enableMobileLoginControl = (control, target) => {
    if (!control) return false;
    const actionTarget = actionLoginRoute(target || mobileLoginHref());
    delete control.dataset.pandaUnavailable;
    control.removeAttribute('aria-disabled');
    if (control instanceof HTMLButtonElement) control.disabled = false;
    if (control instanceof HTMLAnchorElement && control.dataset.pandaDisabledHref) {
      control.setAttribute('href', control.dataset.pandaDisabledHref);
      delete control.dataset.pandaDisabledHref;
    }
    control.setAttribute('role', control.getAttribute('role') || 'link');
    control.setAttribute('tabindex', '0');
    control.dataset.pandaMobileLogin = 'true';
    control.dataset.pandaActionLoginHref = actionTarget;
    if (control instanceof HTMLAnchorElement) control.href = actionTarget;
    return true;
  };
  const disableDesktopLoginControl = control => {
    if (!control) return false;
    delete control.dataset.pandaMobileLogin;
    delete control.dataset.pandaActionLoginHref;
    control.dataset.pandaUnavailable = 'true';
    control.setAttribute('aria-disabled', 'true');
    control.setAttribute('tabindex', '-1');
    if (control instanceof HTMLButtonElement) control.disabled = true;
    if (control instanceof HTMLAnchorElement && control.hasAttribute('href')) {
      control.dataset.pandaDisabledHref = control.getAttribute('href');
      control.removeAttribute('href');
    }
    return true;
  };
  const openMobileLogin = (event, control) => {
    if (!mobileViewport.matches || !control) return false;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(control.dataset.pandaActionLoginHref || mobileLoginHref());
    return true;
  };
  document.addEventListener('click', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    openMobileLogin(event, origin?.closest('[data-panda-mobile-login="true"]'));
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const origin = event.target instanceof Element ? event.target : null;
    openMobileLogin(event, origin?.closest('[data-panda-mobile-login="true"]'));
  }, true);
  const guardMobileKnowledgeBase = () => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    if (false /* portfolio: public knowledge document stays visible on mobile */) location.replace(mobileKnowledgeLogin);
  };
  if (typeof mobileViewport.addEventListener === 'function') mobileViewport.addEventListener('change', guardMobileKnowledgeBase);
  else mobileViewport.addListener?.(guardMobileKnowledgeBase);
  if (false /* portfolio: no mobile login redirect */) {
    location.replace(mobileKnowledgeLogin);
  } else if (LOGIN_REQUIRED_PRODUCT_PATH_RE.test(currentPath)) {
    const target = normalizedProductTarget(location.href) || currentPath + location.search + location.hash;
    try { sessionStorage.setItem('pandaai:auth-return-url', target); } catch (_) {}
    location.replace(productLoginRoute(target));
  } else if (currentPath === '/learninghub/newcourse' || currentPath === '/factorhub') {
    try { sessionStorage.setItem('pandaai:auth-return-url', '/'); } catch (_) {}
    location.replace(CURRENT_PAGE_ROUTES.retiredCourseLogin);
  } else if (currentPath === '/factorhub/factorcompetition') {
    location.replace(CURRENT_PAGE_ROUTES.factorCompetition);
  } else if (currentPath === '/competition/llm' || currentPath === '/competition/llm/index') {
    const params = new URLSearchParams(location.search);
    if (!params.has('channel_id')) params.set('channel_id', '061');
    if (!params.has('page')) params.set('page', '0');
    const canonical = '/competition/llm?' + params.toString() + location.hash;
    if (canonical !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', canonical);
  }
  const compactLabel = value => String(value || '').replace(/[\uFE0E\uFE0F]/g, '').replace(/\s+/g, '').trim();
  const canonicalRouteForLabel = value => {
    const label = compactLabel(value);
    if (!label) return '';
    const pagePath = location.pathname.replace(/\/+$/, '') || '/';
    if (pagePath === '/activities/strategyshare' && /^立即报名↗?$/.test(label)) {
      return '/login?redirect=%2Factivities%2Fstrategyshare';
    }
    if (/^\/factorhub\/(?:fourthFactorCompetition|thirdFactorcompetition)/i.test(pagePath) &&
        /^(?:立即报名|报名参赛|提交因子|提交作品|进入工作台|领取奖励)$/.test(label)) {
      return '/login?redirect=' + encodeURIComponent(pagePath);
    }
    if (/^\/factorhub\/thirdFactorcompetition$/i.test(pagePath) && /^(?:因子排行榜|我的邀请)$/.test(label)) {
      return '/login?redirect=' + encodeURIComponent(pagePath);
    }
    if (/^(?:使用模板|查看全部模板↗?|查看工作流模板|免费开始|立即体验↗?)$/.test(label)) return productLoginRoute('/quantflow/');
    if (/^(?:快速试用|立即试用)$/.test(label)) return '/login?redirect=%2F';
    if (/^了解PandaAI↗?$/.test(label)) return '/knowledge-base';
    if (/^开始学习$/.test(label)) return CURRENT_PAGE_ROUTES.retiredCourseLogin;
    if (/^(?:立即订阅|前往订阅)$/.test(label)) return '/login?redirect=%2Fdata-service';
    if (mobileViewport.matches && /^知识库(?:随取随用的文档中心)?$/.test(label)) return mobileKnowledgeLogin;
    if (/^(?:01)?数据服务(?:全市场、全周期数据底座)?$/.test(label)) return '/data-service/';
    if (/^(?:02)?AI工作流/i.test(label)) return productLoginRoute('/quantflow/');
    if (/^(?:03)?超级图表/.test(label)) return productLoginRoute('/quantflow/charts');
    if (/^(?:04)?交易执行(?:策略信号一键对接执行)?$/.test(label)) return '/login?redirect=%2Fdownload';
    if (/^(?:LLM对抗赛|大模型量化大赛)/i.test(label)) return CURRENT_PAGE_ROUTES.llmCompetition;
    if (/^因子大赛(?:真实数据的因子角逐)?$/.test(label)) return CURRENT_PAGE_ROUTES.factorCompetition;
    if (/^QUANTSKILLS(?:开源量化能力社区)?$/i.test(label)) return CURRENT_PAGE_ROUTES.quantSkills;
    if (/^用户社区(?:与万千(?:量化)?研究者同行)?$/.test(label)) return CURRENT_PAGE_ROUTES.community;
    if (/^课程(?:系统的量化课程体系)?$/.test(label)) return CURRENT_PAGE_ROUTES.retiredCourseLogin;
    if (/^因子中心排行持续更新/.test(label)) return CURRENT_PAGE_ROUTES.retiredCourseLogin;
    return '';
  };
  const canonicalRouteForHref = value => {
    if (!value) return '';
    let url;
    try { url = new URL(value, location.href); } catch (_) { return ''; }
    const localOrKnown = url.origin === location.origin ||
      url.hostname === 'design-ui-pandaai.pages.dev' ||
      url.hostname === 'panda-demo.invalid' ||
      url.hostname === 'quantskills-demo.invalid';
    if (!localOrKnown) return '';
    const productLogin = productLoginRoute(url.href);
    if (productLogin) return productLogin;
    const path = url.pathname.replace(/\/+$/, '') || '/';
    if (path === '/login') return '/login/' + url.search + url.hash;
    if (path === '/personalcenter' || path === '/hypermarket') return '/login?redirect=%2F';
    if (false /* portfolio: public knowledge document stays visible on mobile */) return mobileKnowledgeLogin;
    if (path === '/data-service') return '/data-service/' + url.search + url.hash;
    if (/^\/factorhub\/fourthFactorCompetition\/(?:submit|rules|leaderboard|invite)(?:\/|$)/.test(url.pathname)) {
      return '/login?redirect=' + encodeURIComponent(url.pathname + url.search + url.hash);
    }
    if (path === '/competition/llm' || path === '/competition/llm/index') return CURRENT_PAGE_ROUTES.llmCompetition;
    if (path === '/factorhub/factorcompetition') return CURRENT_PAGE_ROUTES.factorCompetition;
    // These archived activity routes must always enter their final standalone
    // documents. Letting the retired Nuxt router see the click first briefly
    // paints its old route component before the canonical document arrives.
    if (path === '/activities/strategyshare') return '/activities/strategyshare/' + url.search + url.hash;
    if (path.toLowerCase() === '/factorhub/thirdfactorcompetition') {
      return '/factorhub/thirdFactorcompetition' + url.search + url.hash;
    }
    if (path === '/quantskills' || url.hostname === 'quantskills-demo.invalid') return CURRENT_PAGE_ROUTES.quantSkills;
    if (path === '/community') return CURRENT_PAGE_ROUTES.community;
    if (path === '/learninghub/newcourse') return CURRENT_PAGE_ROUTES.retiredCourseLogin;
    if (path === '/factorhub') return CURRENT_PAGE_ROUTES.retiredCourseLogin;
    // Every page-like link owned by this site is canonical. Capture it before
    // the archived Nuxt router can render a retired route component. Static
    // assets and same-document hash navigation intentionally stay untouched.
    const sameDocumentHash = url.origin === location.origin &&
      path === (location.pathname.replace(/\/+$/, '') || '/') &&
      url.search === location.search && Boolean(url.hash);
    const lastSegment = path.split('/').pop() || '';
    const staticAsset = /\.[a-z0-9]{2,8}$/i.test(lastSegment) && !/\.html?$/i.test(lastSegment);
    const canonicalSiteHost = url.origin === location.origin || url.hostname === 'design-ui-pandaai.pages.dev';
    if (canonicalSiteHost && !sameDocumentHash && !staticAsset) {
      const canonicalPath = path.replace(/\/index\.html?$/i, '') || '/';
      return canonicalPath + url.search + url.hash;
    }
    return '';
  };
  const canonicalRouteForControl = control => {
    if (!(control instanceof Element)) return '';
    return canonicalRouteForHref(control.getAttribute?.('href') || control.dataset.pandaDisabledHref) || canonicalRouteForLabel(control.textContent);
  };
  window.PandaResolveCurrentPageRoute = canonicalRouteForControl;
  const workflowActionLogin = event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,[role="button"],[role="link"]');
    if (!control) return false;
    const label = compactLabel(control.textContent);
    const isWorkflowAction = /^(?:使用模板|查看全部模板↗?|立即体验↗?)$/.test(label);
    const isExecutionAction = /^(?:04)?交易执行(?:策略信号一键对接执行)?$/.test(label);
    if (!isWorkflowAction && !isExecutionAction) return false;
    if (mobileViewport.matches) {
      enableMobileLoginControl(control, canonicalRouteForLabel(control.textContent));
      return event.type === 'pointerup' ? false : openMobileLogin(event, control);
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    disableDesktopLoginControl(control);
    return true;
  };
  document.addEventListener('pointerup', workflowActionLogin, true);
  document.addEventListener('click', workflowActionLogin, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') workflowActionLogin(event);
  }, true);
  const canonicalRouteFromEvent = event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    if ((location.pathname.replace(/\/+$/, '') || '/') === '/' && origin) {
      // The homepage awards banner is a Vue button without an href. If its
      // archived component handles the click first it paints the retired SPA
      // route. Resolve both homepage awards entrances directly to the final
      // standalone document before the old router sees the activation.
      if (origin.closest('.banner-section .card-lg .duo-cta,.banner-container .invite-inner')) {
        return '/activities/strategyshare/';
      }
    }
    const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
    for (const node of path) {
      if (!(node instanceof Element)) continue;
      const hrefRoute = canonicalRouteForHref(node.getAttribute?.('href'));
      if (hrefRoute) return hrefRoute;
      const labelRoute = canonicalRouteForLabel(node.textContent);
      if (labelRoute) return labelRoute;
      if (node === document.body) break;
    }
    return '';
  };
  const goToCurrentPage = (event, keyboard) => {
    if (keyboard && event.key !== 'Enter' && event.key !== ' ') return;
    const target = canonicalRouteFromEvent(event);
    if (!target) return;
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,[role="button"],[role="link"]');
    const label = compactLabel(control?.textContent);
    const explicitLogin = /^登录(?:\/注册)?$/.test(label);
    if (target.startsWith('/login') && explicitLogin) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (target.startsWith('/login')) {
      if (mobileViewport.matches) {
        location.assign(actionLoginRoute(target));
      } else if (control) {
        markLoginRequiredEntrances(control);
      }
      return;
    }
    if (target === CURRENT_PAGE_ROUTES.retiredCourseLogin) {
      try { sessionStorage.setItem('pandaai:auth-return-url', '/'); } catch (_) {}
    }
    if (target === CURRENT_PAGE_ROUTES.quantSkills) {
      window.open(documentPageURL(target), '_blank', 'noopener');
      return;
    }
    if (target === CURRENT_PAGE_ROUTES.llmCompetition) {
      // Match the proven QuantSkills path: one synchronous open from the
      // original user gesture. Omitting `noopener` intentionally preserves the
      // competition's "return to source and close this tab" contract.
      window.open(documentPageURL(target), '_blank');
      return;
    }
    if (typeof document.pandaAppShellNavigate === 'function' && document.pandaAppShellNavigate(target)) return;
    const shellNavigation = new CustomEvent('panda:navigate', {
      cancelable: true,
      detail: { url: target }
    });
    if (!document.dispatchEvent(shellNavigation)) return;
    if (target === '/data-service/' ||
        target === '/solutions/education' ||
        target.startsWith('/factorhub/thirdFactorcompetition')) {
      const cover = document.createElement('div');
      cover.setAttribute('aria-hidden', 'true');
      cover.dataset.pandaNavigationCover = 'true';
      cover.style.cssText = 'position:fixed;inset:0;background:#0c0d11;z-index:2147483646;pointer-events:none;';
      document.body.appendChild(cover);
    }
    location.assign(documentPageURL(target));
  };
  document.addEventListener('click', event => goToCurrentPage(event, false), true);
  document.addEventListener('keydown', event => goToCurrentPage(event, true), true);
  const alignCurrentPageLinks = root => {
    const anchors = root instanceof HTMLAnchorElement ? [root] : root.querySelectorAll?.('a[href]') || [];
    anchors.forEach(anchor => {
      const target = canonicalRouteForHref(anchor.getAttribute('href')) || canonicalRouteForLabel(anchor.textContent);
      if (!target) return;
      anchor.href = documentPageURL(target);
      if (target === CURRENT_PAGE_ROUTES.quantSkills) {
        anchor.target = '_blank';
        anchor.rel = 'noopener';
      } else if (target === CURRENT_PAGE_ROUTES.llmCompetition) {
        anchor.target = '_blank';
        anchor.rel = 'opener';
      } else {
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
      }
      anchor.dataset.currentPageRoute = 'true';
    });
  };
  const markLoginRequiredEntrances = root => {
    const scope = root instanceof Element ? root : document;
    const selector = 'a,button,[role="button"],[role="link"],.new-navbar .ranking,.new-navbar .my-invite,.my-invite_box';
    const controls = scope.matches?.(selector)
      ? [scope]
      : scope.querySelectorAll?.(selector) || [];
    controls.forEach(control => {
      const target = canonicalRouteForControl(control);
      if (!target.startsWith('/login')) return;
      if (/^登录(?:\/注册)?$/.test(compactLabel(control.textContent))) return;
      if (mobileViewport.matches) {
        enableMobileLoginControl(control, target);
        return;
      }
      disableDesktopLoginControl(control);
    });
  };
  window.PandaAlignCurrentPageLinks = alignCurrentPageLinks;
  window.PandaMarkLoginRequiredEntrances = markLoginRequiredEntrances;
  const startCurrentPageAlignment = () => {
    alignCurrentPageLinks(document);
    markLoginRequiredEntrances(document);
    const observerRoot = document.body || document.documentElement;
    if (!observerRoot) return;
    let alignmentFrame = 0;
    const queueAlignment = () => {
      if (alignmentFrame) return;
      alignmentFrame = requestAnimationFrame(() => {
        alignmentFrame = 0;
        alignCurrentPageLinks(document);
        markLoginRequiredEntrances(document);
      });
    };
    new MutationObserver(records => {
      let needsFullAlignment = false;
      records.forEach(record => {
        if (record.type === 'characterData') {
          needsFullAlignment = true;
          return;
        }
        record.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          alignCurrentPageLinks(node);
          markLoginRequiredEntrances(node);
        });
      });
      if (needsFullAlignment) queueAlignment();
    }).observe(observerRoot, {
      childList: true,
      characterData: true,
      subtree: true
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startCurrentPageAlignment, { once: true });
  else startCurrentPageAlignment();
  document.addEventListener('panda:routechange', () => {
    alignCurrentPageLinks(document);
    markLoginRequiredEntrances(document);
  });
  const refreshLoginRequiredEntrances = () => markLoginRequiredEntrances(document);
  if (typeof mobileViewport.addEventListener === 'function') mobileViewport.addEventListener('change', refreshLoginRequiredEntrances);
  else mobileViewport.addListener?.(refreshLoginRequiredEntrances);
  const disabledFooterTarget = target => {
    const origin = target instanceof Element ? target : target?.parentElement;
    const social = origin?.closest('.footer-social .social-link, .about3__social, .about3__btn');
    const jobApply = origin?.closest('.join .apply');
    const github = origin?.closest('.footer-link');
    if (social) return social;
    if (jobApply && (jobApply.textContent || '').trim() === '立即投递') return jobApply;
    return github && (github.textContent || '').trim() === 'PandaAI GitHub' ? github : null;
  };
  const markDisabledFooterTargets = root => {
    const scope = root instanceof Element ? root : document;
    const candidates = scope.matches?.('.footer-social .social-link, .about3__social, .about3__btn, .footer-link, .join .apply')
      ? [scope]
      : scope.querySelectorAll?.('.footer-social .social-link, .about3__social, .about3__btn, .footer-link, .join .apply') || [];
    candidates.forEach(candidate => {
      if (!disabledFooterTarget(candidate)) return;
      if (mobileViewport.matches) {
        enableMobileLoginControl(candidate, mobileLoginHref());
        return;
      }
      disableDesktopLoginControl(candidate);
    });
  };
  const unavailableStyle = document.createElement('style');
  unavailableStyle.id = 'panda-global-unavailable-style';
  unavailableStyle.textContent = `
    @media (min-width: 769px) {
      [data-panda-unavailable="true"],
      [data-panda-unavailable="true"] *,
      [aria-disabled="true"],
      [aria-disabled="true"] * {
        cursor: not-allowed !important;
      }
    }
    [data-panda-mobile-login="true"],
    [data-panda-mobile-login="true"] * { cursor: pointer !important; }
    .join .gallery {
      cursor: default !important;
    }
    .join .cursor {
      display: none !important;
    }
    @media (min-width: 769px) {
      .join .gallery {
        box-sizing: border-box;
        padding-bottom: 10px;
        padding-top: 3px;
      }
      .join .track {
        height: min(clamp(380px, 60vh, 600px), calc(100% - 13px)) !important;
      }
    }
  `;
  document.head.append(unavailableStyle);
  const pointerHoverStyles = new WeakMap();
  const pointerStyleRestores = new WeakMap();
  let pressedPointerControl = null;
  let hoverCaptureControl = null;
  let hoverCaptureFrame = 0;
  const POINTER_VISUAL_PROPERTIES = [
    'background-color', 'background-image', 'background-position', 'background-size',
    'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
    'box-shadow', 'color', 'filter', 'opacity', 'outline-color', 'outline-style',
    'outline-width', 'transform'
  ];
  const stopPointerHoverCapture = () => {
    if (hoverCaptureFrame) cancelAnimationFrame(hoverCaptureFrame);
    hoverCaptureFrame = 0;
    hoverCaptureControl = null;
  };
  const capturePointerHoverStyle = control => {
    if (!(control instanceof HTMLElement) || control.matches(':disabled,[aria-disabled="true"]')) return;
    if (hoverCaptureControl === control && hoverCaptureFrame) return;
    stopPointerHoverCapture();
    hoverCaptureControl = control;
    const sample = () => {
      if (hoverCaptureControl !== control || !control.matches(':hover') || control.dataset.pandaPointerPressed === 'true') {
        stopPointerHoverCapture();
        return;
      }
      const style = getComputedStyle(control);
      pointerHoverStyles.set(control, POINTER_VISUAL_PROPERTIES.map(property => [property, style.getPropertyValue(property)]));
      hoverCaptureFrame = requestAnimationFrame(sample);
    };
    hoverCaptureFrame = requestAnimationFrame(sample);
  };
  const applyPointerHoverStyle = control => {
    stopPointerHoverCapture();
    if (pressedPointerControl) pointerStyleRestores.get(pressedPointerControl)?.();
    pressedPointerControl = null;
    const snapshot = pointerHoverStyles.get(control);
    if (!snapshot) return;
    const previous = [...snapshot.map(([property]) => property), 'transition'].map(property => [
      property,
      control.style.getPropertyValue(property),
      control.style.getPropertyPriority(property)
    ]);
    control.style.setProperty('transition', 'none', 'important');
    snapshot.forEach(([property, value]) => control.style.setProperty(property, value, 'important'));
    control.dataset.pandaPointerPressed = 'true';
    const restore = () => {
      previous.forEach(([property, value, priority]) => {
        if (value) control.style.setProperty(property, value, priority);
        else control.style.removeProperty(property);
      });
      delete control.dataset.pandaPointerPressed;
      if (document.activeElement === control) control.blur();
    };
    pointerStyleRestores.set(control, restore);
    pressedPointerControl = control;
  };
  const releasePointerHoverStyle = () => {
    const control = pressedPointerControl;
    pressedPointerControl = null;
    if (!control) return;
    pointerStyleRestores.get(control)?.();
    pointerStyleRestores.delete(control);
  };
  const normalizePointerButtonState = event => {
    if (event.type === 'click' && event.detail === 0) return;
    if (event.type === 'pointerup' || event.type === 'pointercancel' || event.type === 'click') {
      releasePointerHoverStyle();
    }
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,input[type="button"],input[type="submit"],[role="button"],[role="link"]');
    if (!control) return;
    if (event.type === 'pointerover') {
      capturePointerHoverStyle(control);
      return;
    }
    if (event.type === 'pointerdown' && event.button === 0) applyPointerHoverStyle(control);
    if ((event.type === 'pointerup' || event.type === 'click') && control.matches(':hover')) capturePointerHoverStyle(control);
    requestAnimationFrame(() => {
      if (document.activeElement === control) control.blur();
    });
  };
  // Pointer activation must never leave a persistent focus/pressed skin. The
  // keyboard focus-visible state remains intact for accessibility.
  document.addEventListener('pointerover', normalizePointerButtonState, true);
  document.addEventListener('pointerdown', normalizePointerButtonState, true);
  document.addEventListener('pointerup', normalizePointerButtonState, true);
  document.addEventListener('pointercancel', normalizePointerButtonState, true);
  document.addEventListener('click', normalizePointerButtonState, true);
  window.addEventListener('blur', releasePointerHoverStyle, { passive: true });
  document.addEventListener('pointerover', event => {
    if (mobileViewport.matches) return;
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,[role="button"],[role="link"],.new-navbar .ranking,.new-navbar .my-invite,.my-invite_box');
    if (!control || /^登录(?:\/注册)?$/.test(compactLabel(control.textContent))) return;
    if (canonicalRouteForControl(control).startsWith('/login')) disableDesktopLoginControl(control);
  }, true);
  const blockDesktopUnavailable = event => {
    if (mobileViewport.matches) return;
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,[role="button"],[role="link"],.new-navbar .ranking,.new-navbar .my-invite,.my-invite_box');
    if (!control) return;
    const target = canonicalRouteForControl(control);
    const explicitLogin = /^登录(?:\/注册)?$/.test(compactLabel(control.textContent));
    if (control.dataset.pandaUnavailable !== 'true' && (!target.startsWith('/login') || explicitLogin)) return;
    markLoginRequiredEntrances(control);
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  document.addEventListener('pointerdown', blockDesktopUnavailable, true);
  document.addEventListener('pointerup', blockDesktopUnavailable, true);
  document.addEventListener('click', blockDesktopUnavailable, true);
  document.addEventListener('keydown', blockDesktopUnavailable, true);
  const startDisabledFooterTargets = () => {
    markDisabledFooterTargets(document);
    if (document.documentElement.dataset.pandaNavigationOnly === 'true') return;
    new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(markDisabledFooterTargets)))
      .observe(document.body || document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startDisabledFooterTargets, { once: true });
  else startDisabledFooterTargets();
  const joinWheelOffsets = new WeakMap();
  // Mobile cards use the browser's overflow scrolling, including momentum,
  // direction recognition and tap cancellation. Do not prevent Touch Events.
  // Keep the compiled Vue transform-drag handler out of this native scroller.
  ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'].forEach(type => {
    document.addEventListener(type, event => {
      if (!matchMedia('(max-width: 767px)').matches) return;
      const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (origin?.closest('.join .gallery')) event.stopPropagation();
    }, { capture: true, passive: true });
  });
  document.addEventListener('wheel', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const gallery = origin?.closest('.join .gallery');
    if (!gallery || event.defaultPrevented || matchMedia('(max-width: 768px)').matches) return;
    const track = gallery.querySelector(':scope > .track');
    if (!track) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const inlineX = Number.parseFloat((track.style.transform.match(/translate3d\((-?[\d.]+)px/) || [])[1] || '0');
    const current = joinWheelOffsets.has(gallery) ? joinWheelOffsets.get(gallery) : inlineX;
    const minimum = Math.min(0, gallery.clientWidth - track.scrollWidth);
    const next = Math.max(minimum, Math.min(0, current - delta));
    joinWheelOffsets.set(gallery, next);
    track.style.transform = `translate3d(${next}px, 0, 0)`;
  }, { passive: false });
  document.addEventListener('click', event => {
    if (!disabledFooterTarget(event.target)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  document.addEventListener('keydown', event => {
    if ((event.key !== 'Enter' && event.key !== ' ') || !disabledFooterTarget(event.target)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  const RETIRED_NAV_LABELS = new Set(['专业版客户端', '商城', '课程', '课程中心']);
  const RETIRED_NAV_PATHS = new Set(['/download', '/hypermarket', '/learninghub/newcourse']);
  const CURRENT_NAVIGATION_GROUPS = [
    ['产品', [
      ['数据服务', '全市场数据底座', '/data-service', 'database'],
      ['AI 工作流', '智能体驱动的量化研究', '/quantflow/', 'workflow'],
      ['超级图表', '所见即所得的策略可视化', '/quantflow/charts/index.html', 'chart']
    ]],
    ['活动', [
      ['第四届因子大赛', '深耕 Alpha，穿越周期', '/factorhub/fourthFactorCompetition/?wechat-live=20260909-2', 'trophy'],
      ['第三届因子大赛颁奖典礼', '见证优秀策略的诞生', '/activities/strategyshare', 'medal'],
      ['第三届因子大赛', '真实数据的因子角逐', '/factorhub/thirdFactorcompetition', 'trophy'],
      ['LLM 对抗赛', '大模型驱动的策略对抗', '/competition/llm?channel_id=061&page=0', 'swords']
    ]],
    ['解决方案', [
      ['个人研究者', '低门槛上手量化研究', '/solutions/personal', 'user'],
      ['私募 / 机构', '提效、合规、可落地', '/solutions/institution', 'building'],
      ['量化教育', '好用的教学与实训工具', '/solutions/education', 'education']
    ]],
    ['学习', [
      ['量枢院', '共创型研究社区', '/quant-pivot-academy', 'academy'],
      ['知识库', '随取随用的文档中心', '/knowledge-base/', 'bookmark'],
      ['数据API文档', '数据服务接口调用指南', '/data-service/api-docs', 'code']
    ]],
    ['关于', [
      ['关于我们', 'PandaAI 的故事与愿景', '/about', 'info'],
      ['加入我们', '与我们一起重塑量化', '/join', 'userplus'],
      ['商务合作', '开放共赢的合作机会', '/partnership', 'handshake']
    ]],
    ['社区', [
      ['用户社区', '与万千量化研究者同行', '/community', 'community'],
      ['QUANTSKILLS', '开源量化能力社区', '/quantskills/', 'expand']
    ]]
  ];
  window.PandaNavigationGroups = CURRENT_NAVIGATION_GROUPS;
  const finalFooterHref = (label, href) => {
    if (label === 'AI 工作流') return '/login?redirect=%2Fquantflow%2F';
    if (label === '超级图表') return '/login?redirect=%2Fquantflow%2Fcharts';
    if (label === 'LLM 对抗赛') return '/competition/llm?channel_id=061&page=0&render=static1';
    if (href === '/factorhub/fourthFactorCompetition/') return '/factorhub/fourthFactorCompetition/?wechat-live=20260909-2';
    if (href === '/knowledge-base/') return '/knowledge-base';
    return href;
  };
  const syncFooterNavigation = root => {
    const footerNavigation = root.querySelector?.('footer .footer-cols,.site-footer .footer-cols');
    if (!footerNavigation) return;
    const current = [...footerNavigation.querySelectorAll(':scope > .footer-col')].map(column => [
      (column.querySelector('.footer-col-title')?.textContent || '').trim(),
      [...column.querySelectorAll('a.footer-link')].map(link => [
        (link.textContent || '').trim(),
        link.getAttribute('href') || ''
      ])
    ]);
    const expected = CURRENT_NAVIGATION_GROUPS.map(([title, items]) => [
      title,
      items.map(([label, , href]) => [label, finalFooterHref(label, href)])
    ]);
    if (JSON.stringify(current) === JSON.stringify(expected)) return;

    const reference = footerNavigation.querySelector('.footer-col,.footer-col-title,.footer-link');
    const scopeNames = reference
      ? [...reference.attributes].map(attribute => attribute.name).filter(name => name.startsWith('data-v-'))
      : [];
    footerNavigation.replaceChildren();
    CURRENT_NAVIGATION_GROUPS.forEach(([title, items]) => {
      const column = document.createElement('div');
      column.className = 'footer-col';
      const heading = document.createElement('h4');
      heading.className = 'footer-col-title';
      heading.textContent = title;
      scopeNames.forEach(name => {
        column.setAttribute(name, '');
        heading.setAttribute(name, '');
      });
      column.appendChild(heading);
      items.forEach(([label, , href]) => {
        const anchor = document.createElement('a');
        anchor.className = 'footer-link';
        anchor.href = finalFooterHref(label, href);
        anchor.textContent = label;
        scopeNames.forEach(name => anchor.setAttribute(name, ''));
        column.appendChild(anchor);
      });
      footerNavigation.appendChild(column);
    });
  };
  const pruneRetiredFooterItems = root => {
    const selector = 'footer a,footer .footer-link,.site-footer a,.site-footer .footer-link';
    const items = root instanceof Element && root.matches(selector)
      ? [root]
      : root.querySelectorAll?.(selector) || [];
    items.forEach(item => {
      if (RETIRED_NAV_LABELS.has((item.textContent || '').trim())) item.remove();
    });
    syncFooterNavigation(root);
  };
  const pruneRetiredNavigationItems = root => {
    const selector = [
      '.nav-container .dropdown-item',
      '.nav-container .nav-link',
      '.nav-container .meau-list .link',
      '.dropdown-portal .dropdown-item',
      '.community-nav-portal .community-nav-link'
    ].join(',');
    const items = root instanceof Element && root.matches(selector)
      ? [root]
      : root.querySelectorAll?.(selector) || [];
    items.forEach(item => {
      const labelNode = item.querySelector?.('.dropdown-item-title,.nav-link-title') || item;
      const label = (labelNode.textContent || '').replace(/\s+/g, '').trim();
      let path = '';
      const anchor = item.matches?.('a[href]') ? item : item.querySelector?.('a[href]');
      try { path = anchor ? new URL(anchor.getAttribute('href'), location.href).pathname.replace(/\/+$/, '') || '/' : ''; } catch (_) {}
      if (RETIRED_NAV_LABELS.has(label) || RETIRED_NAV_PATHS.has(path)) item.remove();
    });
  };
  window.PandaPruneRetiredNavigationItems = pruneRetiredNavigationItems;
  const startRetiredFooterPruning = () => {
    pruneRetiredFooterItems(document);
    window.PandaPruneRetiredNavigationItems?.(document);
    if (document.documentElement.dataset.pandaNavigationOnly === 'true') return;
    // Keep the historical startup cleanup, but do not observe the entire
    // responsive document. Breakpoint reconciliation changes text and nodes;
    // rewriting those mutations here makes the renderer rebuild forever.
    window.setTimeout(() => pruneRetiredFooterItems(document), 250);
    window.setTimeout(() => pruneRetiredFooterItems(document), 900);
    window.setTimeout(() => pruneRetiredNavigationItems(document), 250);
    window.setTimeout(() => pruneRetiredNavigationItems(document), 900);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startRetiredFooterPruning, { once: true });
  else startRetiredFooterPruning();

  const dataServiceTarget = value => {
    if (value == null) return '';
    try {
      const url = new URL(String(value), location.href);
      if (url.origin !== location.origin && url.hostname !== 'panda-demo.invalid' && url.hostname !== 'design-ui-pandaai.pages.dev') return '';
      return url.pathname === '/data-service' || url.pathname.startsWith('/data-service/')
        ? url.pathname + url.search + url.hash
        : '';
    } catch (_) { return ''; }
  };
  const originalDataPushState = history.pushState.bind(history);
  const originalDataReplaceState = history.replaceState.bind(history);
  const originalWindowOpen = window.open.bind(window);
  const currentLocalTarget = () => location.pathname + location.search + location.hash;
  const sameLocalTarget = value => {
    try {
      const current = new URL(currentLocalTarget(), location.origin);
      const target = new URL(value, location.origin);
      const normalize = path => path.replace(/\/+$/, '') || '/';
      return normalize(current.pathname) === normalize(target.pathname) &&
        current.search === target.search && current.hash === target.hash;
    } catch (_) { return false; }
  };
  history.pushState = function (state, title, url) {
    const protectedProductLogin = productLoginRoute(url);
    if (protectedProductLogin) {
      location.assign(documentPageURL(protectedProductLogin));
      return;
    }
    const target = dataServiceTarget(url);
    if (target && !sameLocalTarget(target)) {
      location.assign(documentPageURL(target));
      return;
    }
    return originalDataPushState(state, title, url);
  };
  history.replaceState = function (state, title, url) {
    const protectedProductLogin = productLoginRoute(url);
    if (protectedProductLogin) {
      location.replace(documentPageURL(protectedProductLogin));
      return;
    }
    const target = dataServiceTarget(url);
    if (target && !sameLocalTarget(target)) {
      location.replace(documentPageURL(target));
      return;
    }
    return originalDataReplaceState(state, title, url);
  };
  window.open = function (url, target, features) {
    const protectedProductLogin = productLoginRoute(url);
    if (protectedProductLogin) {
      location.assign(documentPageURL(protectedProductLogin));
      return window;
    }
    const localDataTarget = dataServiceTarget(url);
    if (localDataTarget) {
      location.assign(documentPageURL(localDataTarget));
      return window;
    }
    return originalWindowOpen(url, target, features);
  };

  // Data service is a fully localized standalone page. Force a document
  // navigation before any hydrated SPA router can render the retired view.
  document.addEventListener('click', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const logoControl = origin?.closest('.brand-logo,.logo,[data-login-home],[aria-label="返回首页"],[aria-label="首页"]');
    const control = logoControl || origin?.closest('a,button,[role="button"]');
    if (!control) return;
    const href = control.getAttribute('href') || '';
    const text = (control.textContent || '').replace(/\s+/g, '');
    let target = '';
    if (href) {
      try {
        const url = new URL(href, location.href);
        if (url.origin === location.origin || url.hostname === 'panda-demo.invalid' || url.hostname === 'design-ui-pandaai.pages.dev') {
          if (url.pathname === '/data-service' || url.pathname.startsWith('/data-service/')) target = url.pathname + url.search + url.hash;
        }
      } catch (_) {}
    }
    if (!target && /数据服务/.test(text)) {
      target = '/data-service';
    }
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.href = documentPageURL(target);
  }, true);

  // These event pages are public. The mobile navigation's generic route
  // helper currently applies its default auth gate, so resolve them before
  // the hydrated menu handler runs.
  document.addEventListener('click', event => {
    if (window.innerWidth > 768) return;
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const control = origin?.closest('a,button,[role="button"]');
    if (!control) return;
    const text = (control.textContent || '').replace(/\s+/g, '');
    let target = '';
    if (text === '第三届因子大赛颁奖典礼') target = '/activities/strategyshare/';
    else if (text === '第三届因子大赛') target = '/factorhub/thirdFactorcompetition/';
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = documentPageURL(target);
  }, true);

  const localTarget = link => {
    let url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return null; }
    if (url.hostname === 'quantskills-demo.invalid') return '/quantskills/';
    if (url.hostname === 'design-ui-pandaai.pages.dev' || url.hostname === 'panda-demo.invalid' || url.origin === window.location.origin) return url.pathname + url.search + url.hash;
    return null;
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const target = localTarget(link);
    if (!target) return;
    if (target.startsWith('/community')) {
      link.href = target;
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }
    if (target.startsWith('/competition/llm')) {
      link.href = CURRENT_PAGE_ROUTES.llmCompetition;
      link.target = '_blank';
      link.rel = 'opener';
      event.stopImmediatePropagation();
      return;
    }
    link.href = target;
    link.target = target.startsWith('/quantskills') ? '_blank' : '_self';
    link.removeAttribute('rel');
  }, true);
})();

/* The partnership contact options are placeholders. Present them consistently
   as unavailable instead of allowing mailto/form actions to fire. */
(function () {
  if (window.__PANDA_PARTNERSHIP_PLACEHOLDERS__) return;
  window.__PANDA_PARTNERSHIP_PLACEHOLDERS__ = true;

  const SELECTOR = '.bp-btn, .ap-cell';
  const isPartnership = () => location.pathname === '/partnership' || location.pathname === '/partnership/';
  const markUnavailable = root => {
    const active = isPartnership();
    document.documentElement.toggleAttribute('data-panda-partnership-placeholders', active);
    if (!active) return;
    const scope = root instanceof Element ? root : document;
    const controls = scope.matches?.(SELECTOR) ? [scope] : scope.querySelectorAll?.(SELECTOR) || [];
    controls.forEach(control => {
      if (matchMedia('(max-width: 768px)').matches) {
        const actionTarget = '/login?entry=action&redirect=' + encodeURIComponent(location.pathname + location.search + location.hash);
        control.removeAttribute('aria-disabled');
        control.removeAttribute('tabindex');
        control.dataset.pandaMobileLogin = 'true';
        control.dataset.pandaActionLoginHref = actionTarget;
        if (control instanceof HTMLAnchorElement) control.href = actionTarget;
        return;
      }
      control.setAttribute('aria-disabled', 'true');
      control.setAttribute('tabindex', '-1');
    });
  };

  const style = document.createElement('style');
  style.id = 'panda-partnership-placeholder-style';
  style.textContent = `
    html[data-panda-partnership-placeholders] .bp .bp-btn {
      background-color: #fff !important;
      background-image: linear-gradient(#0a0a0a, #0a0a0a) !important;
      background-position: 0 50% !important;
      background-repeat: no-repeat !important;
      background-size: 0 100% !important;
      border: 1px solid #fff !important;
      box-shadow: none !important;
      transition: background-size .32s cubic-bezier(.65,0,.35,1), color .32s cubic-bezier(.65,0,.35,1), border-color .32s cubic-bezier(.65,0,.35,1) !important;
    }
    html[data-panda-partnership-placeholders] .bp .bp-btn:hover {
      background-size: 100% 100% !important;
      box-shadow: none !important;
      color: #fff !important;
      gap: .65rem !important;
      transform: none !important;
    }
    @media (min-width: 769px) {
      html[data-panda-partnership-placeholders] .bp-btn,
      html[data-panda-partnership-placeholders] .bp-btn *,
      html[data-panda-partnership-placeholders] .ap-cell,
      html[data-panda-partnership-placeholders] .ap-cell * {
        cursor: not-allowed !important;
      }
    }
  `;
  document.head.append(style);

  const assistantStyle = document.createElement('style');
  assistantStyle.id = 'panda-partnership-route-assistant-style';
  assistantStyle.textContent = `
    .assistant[data-panda-route-assistant="true"] { display:contents; }
    .assistant[data-panda-route-assistant="true"] .assistant-btn { align-items:center; background:#fff; border:0; border-radius:50%; bottom:clamp(16px,2vw,28px); box-shadow:0 8px 30px rgba(0,0,0,.28); color:#000; cursor:pointer; display:flex; height:58px; justify-content:center; mix-blend-mode:difference; padding:0; position:fixed; right:clamp(16px,2vw,28px); transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease; width:58px; z-index:990; }
    .assistant[data-panda-route-assistant="true"] .assistant-btn:hover { box-shadow:0 16px 40px rgba(0,0,0,.4); transform:translateY(-3px); }
    .assistant[data-panda-route-assistant="true"] .assistant-icon { height:48px; width:48px; }
    .assistant[data-panda-route-assistant="true"] .assistant-icon--chevron { height:28px; width:28px; }
    .assistant[data-panda-route-assistant="true"] .ap-panel { background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:20px; bottom:calc(clamp(16px,2vw,28px) + 74px); box-shadow:0 44px 90px -24px rgba(0,0,0,.32),0 14px 34px -16px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.7); box-sizing:border-box; color:#0a0a0a; display:flex; height:560px; overflow:hidden; position:fixed; right:clamp(16px,2vw,28px); width:400px; z-index:991; }
    .assistant[data-panda-route-assistant="true"] .ap-page { box-sizing:border-box; padding:26px 23px; width:100%; }
    .assistant[data-panda-route-assistant="true"] .ap-hero { align-items:center; display:flex; flex-direction:column; padding:8px 0 26px; }
    .assistant[data-panda-route-assistant="true"] .ap-hero-logo { display:block; height:58px; width:58px; }
    .assistant[data-panda-route-assistant="true"] .ap-hero-logo svg { height:100%; width:100%; }
    .assistant[data-panda-route-assistant="true"] .ap-hero-title { font-size:22px; font-weight:600; margin:12px 0 0; }
    .assistant[data-panda-route-assistant="true"] .ap-divider { background:#e8e8e8; height:1px; }
    .assistant[data-panda-route-assistant="true"] .ap-list { padding-top:10px; }
    .assistant[data-panda-route-assistant="true"] .ap-cell { align-items:center; appearance:none; background:transparent; border:0; border-radius:16px; box-sizing:border-box; color:#000; display:flex; height:73px; padding:15px 14px; text-align:left; width:100%; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-ico { align-items:center; border:1px solid #dedede; border-radius:50%; display:flex; flex:0 0 48px; height:48px; justify-content:center; width:48px; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-ico svg { height:24px; width:24px; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-main { display:flex; flex:1; flex-direction:column; gap:4px; margin-left:14px; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-title { font-size:17px; font-weight:600; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-sub { color:#999; font-size:13px; }
    .assistant[data-panda-route-assistant="true"] .ap-cell-arrow { color:#aaa; font-size:26px; }
    @media(max-width:768px) {
      .assistant[data-panda-route-assistant="true"] .assistant-btn { bottom:16px; height:54px; right:16px; width:54px; }
      .assistant[data-panda-route-assistant="true"] .ap-panel { bottom:84px; height:min(560px,calc(100dvh - 110px)); right:16px; width:calc(100vw - 32px); }
    }
  `;
  document.head.append(assistantStyle);

  const assistantButtonIcon = open => open
    ? '<svg class="assistant-icon assistant-icon--chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path d="M6 9.5 12 15.5 18 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg class="assistant-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 60"><path d="M41.216 29.026c0 3.576-.895 5.847-2.647 7.268-.92.745-1.02 1.08-1.121 1.84l-.461 3.654c-.09.41-.16.31-1.061-.545l-2.98-2.244c-.67-.49-.86-.6-1.776-.563-.496.023-1.014.034-1.553.034-4.41 0-7.28-.758-9.048-2.22-1.721-1.421-2.602-3.683-2.602-7.23s.88-5.808 2.602-7.23c1.769-1.46 4.639-2.22 9.048-2.22s7.28.76 9.048 2.22c1.721 1.422 2.602 3.684 2.602 7.23Z" stroke="currentColor" stroke-width="2"/></svg>';
  const assistantPanel = () => {
    const logo = document.querySelector('.nav-container .logo svg')?.outerHTML || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 4 7v10l8 5 8-5V7Z"/><path d="m8 15 4-9 4 9-4 5Z"/></svg>';
    return `<div class="ap-panel"><div class="ap-page ap-home"><div class="ap-hero"><span class="ap-hero-logo">${logo}</span><h3 class="ap-hero-title">有什么可以帮助你？</h3></div><div class="ap-divider"></div><div class="ap-list"><button class="ap-cell" aria-disabled="true" tabindex="-1"><span class="ap-cell-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></span><span class="ap-cell-main"><span class="ap-cell-title">在线咨询</span><span class="ap-cell-sub">实时联系 PandaAI</span></span><span class="ap-cell-arrow">›</span></button><button class="ap-cell" aria-disabled="true" tabindex="-1"><span class="ap-cell-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18 3 3 3-9 9-3 1 1-3Z"/></svg></span><span class="ap-cell-main"><span class="ap-cell-title">问题反馈</span><span class="ap-cell-sub">提交 Bug / 建议</span></span><span class="ap-cell-arrow">›</span></button><button class="ap-cell" aria-disabled="true" tabindex="-1"><span class="ap-cell-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="10" cy="8" r="5"/><path d="M2 21a8 8 0 0 1 13.3-6M19 16v6M22 19h-6"/></svg></span><span class="ap-cell-main"><span class="ap-cell-title">添加微信</span><span class="ap-cell-sub">商务合作 / 技术支持</span></span><span class="ap-cell-arrow">›</span></button></div></div></div>`;
  };
  const ensureRouteAssistant = () => {
    if (!isPartnership() || document.querySelector('.assistant-btn')) return;
    const root = document.querySelector('.assistant') || document.body.appendChild(document.createElement('div'));
    root.classList.add('assistant');
    root.dataset.pandaRouteAssistant = 'true';
    let open = false;
    const button = document.createElement('button');
    button.className = 'assistant-btn';
    const render = () => {
      root.querySelector('.ap-panel')?.remove();
      button.classList.toggle('open', open);
      button.setAttribute('aria-label', open ? '收起小助理' : '打开小助理');
      button.innerHTML = assistantButtonIcon(open);
      if (open) button.insertAdjacentHTML('beforebegin', assistantPanel());
    };
    button.addEventListener('click', () => { open = !open; render(); });
    root.replaceChildren(button);
    render();
  };

  const blockUnavailableAction = event => {
    if (!isPartnership()) return;
    const control = event.target instanceof Element ? event.target.closest(SELECTOR) : null;
    if (!control) return;
    if (matchMedia('(max-width: 768px)').matches) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.assign('/login?entry=action&redirect=' + encodeURIComponent(location.pathname + location.search + location.hash));
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  document.addEventListener('click', blockUnavailableAction, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') blockUnavailableAction(event);
  }, true);

  const start = () => {
    markUnavailable(document);
    if (!isPartnership() || document.documentElement.dataset.pandaNavigationOnly === 'true') return;
    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(markUnavailable));
    }).observe(document.body || document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  window.addEventListener('pageshow', () => markUnavailable(document));
  document.addEventListener('panda:routechange', () => {
    markUnavailable(document);
    ensureRouteAssistant();
  });
})();

/* Keep the GLDH partner contact intentionally non-interactive on every device.
   The visible address is masked and the QR is shared with the fourth factor
   competition so routed and direct page loads render the same contact block. */
(function () {
  if (window.__PANDA_GLDH_CONTACT__) return;
  window.__PANDA_GLDH_CONTACT__ = true;

  const PATH = '/partners/gldh';
  const MASKED_URL = 'https://work.xxxxxx.qq.com/xxxxx';
  const SHARED_QR = '/knowledge-base/factorhub/fourthFactorCompetition/assets/site-home-qr.svg';
  const isGldh = () => location.pathname.replace(/\/$/, '') === PATH;
  const syncGldhContact = root => {
    if (!isGldh()) return;
    const scope = root instanceof Element ? root : document;
    const link = scope.matches?.('.gp-link') ? scope : scope.querySelector?.('.gp-link');
    if (link && link.textContent.trim() !== MASKED_URL) link.textContent = MASKED_URL;
    if (link) {
      link.removeAttribute('href');
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
      link.dataset.pandaGldhDisabled = 'true';
    }
    const qr = scope.matches?.('.gp-qr img') ? scope : scope.querySelector?.('.gp-qr img');
    if (qr && qr.getAttribute('src') !== SHARED_QR) qr.setAttribute('src', SHARED_QR);
  };

  const style = document.createElement('style');
  style.id = 'panda-gldh-contact-style';
  style.textContent = `
    [data-panda-gldh-disabled="true"], [data-panda-gldh-disabled="true"] * { cursor:not-allowed!important; pointer-events:auto!important; }
    .gp-qr { box-sizing:border-box!important; height:160px!important; overflow:hidden!important; padding:6px!important; width:160px!important; }
    .gp-qr img { height:100%!important; max-width:none!important; object-fit:contain!important; transform:scale(1.07)!important; width:100%!important; }
  `;
  document.head.append(style);

  const blockGldhContact = event => {
    if (!isGldh()) return;
    const disabled = event.target instanceof Element ? event.target.closest('[data-panda-gldh-disabled="true"],.gp-link') : null;
    if (!disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  document.addEventListener('click', blockGldhContact, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') blockGldhContact(event);
  }, true);

  const start = () => {
    syncGldhContact(document);
    if (!isGldh() || document.documentElement.dataset.pandaNavigationOnly === 'true') return;
    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(syncGldhContact));
    }).observe(document.body || document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  window.addEventListener('pageshow', () => syncGldhContact(document));
  document.addEventListener('panda:routechange', () => syncGldhContact(document));
})();

/* Keep the homepage persona cards interactive after a browser back/forward
   cache restore. The homepage component is torn down during navigation, while
   its restored DOM can outlive the Vue listeners that originally owned it. */
(function () {
  if (window.__PANDA_PERSONA_CARD_RECOVERY__) return;
  window.__PANDA_PERSONA_CARD_RECOVERY__ = true;

  const PERSONA_ROUTES = new Map([
    ['persona--workspace', '/solutions/personal'],
    ['persona--pipeline', '/solutions/institution'],
    ['persona--studio', '/solutions/education'],
    ['persona--cluster', '/partnership']
  ]);
  let activeCard = null;
  let cursorFrame = 0;
  let cursorX = 0;
  let cursorY = 0;
  let renderedX = 0;
  let renderedY = 0;

  const isHomepage = () => location.pathname === '/' || location.pathname === '/index.html';
  const supportsCustomCursor = () => window.matchMedia?.('(hover: hover)').matches;
  const getCursor = () => document.querySelector('.solutions-cursor');
  const ensureCursor = () => {
    let cursor = getCursor();
    if (cursor || !isHomepage() || !supportsCustomCursor() || !document.querySelector('.persona-cards')) return cursor;
    cursor = document.createElement('div');
    cursor.className = 'solutions-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.setAttribute('data-v-2abc3f3f', '');
    cursor.dataset.pandaPersonaRecovery = 'true';
    cursor.innerHTML = '<span class="sc-inner" data-v-2abc3f3f><span class="sc-label" data-v-2abc3f3f>了解更多</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-2abc3f3f><path d="M5 12h14" data-v-2abc3f3f></path><path d="m13 6 6 6-6 6" data-v-2abc3f3f></path></svg></span>';
    document.body.append(cursor);
    return cursor;
  };
  const getPersonaCard = target => target instanceof Element
    ? target.closest('.persona-cards .persona')
    : null;
  const routeForCard = card => {
    for (const [className, route] of PERSONA_ROUTES) {
      if (card.classList.contains(className)) return route;
    }
    return '';
  };
  const stopCursorFrame = () => {
    if (!cursorFrame) return;
    cancelAnimationFrame(cursorFrame);
    cursorFrame = 0;
  };
  const drawCursor = () => {
    const cursor = getCursor();
    if (!cursor || !activeCard || !isHomepage()) {
      cursorFrame = 0;
      return;
    }
    renderedX = cursorX;
    renderedY = cursorY;
    cursor.style.transform = `translate3d(${renderedX.toFixed(2)}px, ${renderedY.toFixed(2)}px, 0)`;
    cursorFrame = 0;
  };
  const showCursor = (card, event) => {
    if (!supportsCustomCursor()) return;
    const cursor = ensureCursor();
    if (!cursor) return;
    activeCard = card;
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (!cursor.classList.contains('is-visible')) {
      renderedX = cursorX;
      renderedY = cursorY;
    }
    const label = cursor.querySelector('.sc-label');
    if (label) label.textContent = card.classList.contains('persona--cluster') ? '联系销售' : '了解更多';
    cursor.classList.add('is-visible');
    if (!cursorFrame) cursorFrame = requestAnimationFrame(drawCursor);
  };
  const hideCursor = () => {
    activeCard = null;
    const cursor = getCursor();
    cursor?.classList.remove('is-visible', 'is-pressed');
    window.setTimeout(() => {
      if (!activeCard) stopCursorFrame();
    }, 450);
  };
  const resetPersonaState = () => {
    activeCard = null;
    stopCursorFrame();
    const cursor = getCursor();
    cursor?.classList.remove('is-visible', 'is-pressed');
  };

  document.addEventListener('pointerover', event => {
    if (!isHomepage()) return;
    const card = getPersonaCard(event.target);
    if (card) showCursor(card, event);
  }, true);
  document.addEventListener('pointermove', event => {
    if (!isHomepage()) return;
    const card = getPersonaCard(event.target);
    if (card && card !== activeCard) showCursor(card, event);
    if (!activeCard) return;
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(drawCursor);
  }, { capture: true, passive: true });
  document.addEventListener('pointerout', event => {
    if (!activeCard) return;
    const nextCard = getPersonaCard(event.relatedTarget);
    if (!nextCard) hideCursor();
  }, true);
  document.addEventListener('pointerdown', event => {
    if (getPersonaCard(event.target)) getCursor()?.classList.add('is-pressed');
  }, true);
  document.addEventListener('pointerup', () => {
    getCursor()?.classList.remove('is-pressed');
  }, true);
  document.addEventListener('click', event => {
    if (!isHomepage()) return;
    const card = getPersonaCard(event.target);
    const route = card && routeForCard(card);
    if (!route) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (route === '/solutions/education') {
      const cover = document.createElement('div');
      cover.setAttribute('aria-hidden', 'true');
      cover.dataset.pandaNavigationCover = 'true';
      cover.style.cssText = 'position:fixed;inset:0;background:#0c0d11;z-index:2147483646;pointer-events:none;';
      document.body.appendChild(cover);
      requestAnimationFrame(() => location.assign(documentPageURL(route)));
      return;
    }
    location.assign(documentPageURL(route));
  }, true);
  window.addEventListener('pagehide', resetPersonaState);
  window.addEventListener('scroll', () => {
    if (activeCard || cursorFrame) resetPersonaState();
  }, { passive: true });
  window.addEventListener('pageshow', () => {
    resetPersonaState();
    requestAnimationFrame(() => requestAnimationFrame(ensureCursor));
  });
})();

(function () {
  if (window.__PANDA_AUTH_RETURN_INSTALLED__) return;
  window.__PANDA_AUTH_RETURN_INSTALLED__ = true;
  const CURRENT_HOME_ENTRY = '/?release=20260908-smooth-30';
  document.documentElement.dataset.pandaAuthReturn = 'ready';

  const STORAGE_KEY = 'pandaai:auth-return-url';
  const AUTH_PATH_RE = /^\/login(?:\/|$)/;
  const RETIRED_EMBEDDED_AUTH_PATH_RE = /^\/(?:factorhub\/fourthFactorCompetition|competition\/llm)\/login(?:\/|$)/;
  const nativePushState = history.pushState.bind(history);
  const nativeReplaceState = history.replaceState.bind(history);
  const isAuthPath = value => {
    try {
      const pathname = new URL(value, location.href).pathname;
      return AUTH_PATH_RE.test(pathname) || RETIRED_EMBEDDED_AUTH_PATH_RE.test(pathname);
    }
    catch (_) { return false; }
  };
  const isRetiredEmbeddedAuthPath = value => {
    try { return RETIRED_EMBEDDED_AUTH_PATH_RE.test(new URL(value, location.href).pathname); }
    catch (_) { return false; }
  };
  const isFourthCompetitionRulesPath = value => {
    try {
      const pathname = new URL(value, location.href).pathname.replace(/\/$/, '');
      return pathname === '/factorhub/fourthFactorCompetition/rules';
    } catch (_) { return false; }
  };
  const safeLocalUrl = value => {
    if (!value) return '';
    try {
      const url = new URL(value, location.origin);
      if (url.origin !== location.origin || isAuthPath(url.href)) return '';
      return url.pathname + url.search + url.hash;
    } catch (_) { return ''; }
  };
  const saveReturnUrl = value => {
    const target = safeLocalUrl(value);
    if (target) sessionStorage.setItem(STORAGE_KEY, target);
    return target;
  };
  const readReturnUrl = () => safeLocalUrl(sessionStorage.getItem(STORAGE_KEY)) || '/';
  const rememberAuthEntry = () => {
    if (!isAuthPath(location.href)) return;
    const params = new URLSearchParams(location.search);
    const explicitTarget = safeLocalUrl(params.get('redirect') || params.get('returnUrl') || params.get('from'));
    const referrerTarget = safeLocalUrl(document.referrer);
    if (explicitTarget || referrerTarget) saveReturnUrl(explicitTarget || referrerTarget);
    else if (!safeLocalUrl(sessionStorage.getItem(STORAGE_KEY))) saveReturnUrl('/');
  };
  const returnFromAuth = () => location.replace(readReturnUrl());
  const goLogin = (value, actionEntry = false) => {
    const target = saveReturnUrl(value || location.href) || '/';
    const entry = actionEntry ? '&entry=action' : '';
    location.href = '/login/?redirect=' + encodeURIComponent(target) + entry;
  };
  window.PandaAuth = Object.assign(window.PandaAuth || {}, {
    goLogin,
    getReturnUrl: readReturnUrl
  });

  let pendingAuthControl = null;
  const compactAuthLabel = control => (control?.textContent || '').replace(/[\uFE0E\uFE0F]/g, '').replace(/\s+/g, '');
  const isExplicitLoginControl = control => /^(?:登录|登入|登录\/注册|立即登录)$/.test(compactAuthLabel(control));
  const markAuthControlUnavailable = control => {
    if (!control || isExplicitLoginControl(control)) return false;
    if (matchMedia('(max-width: 768px)').matches) {
      delete control.dataset.pandaUnavailable;
      control.removeAttribute('aria-disabled');
      control.removeAttribute('tabindex');
      control.dataset.pandaMobileLogin = 'true';
      return false;
    }
    return disableDesktopLoginControl(control);
  };
  document.addEventListener('click', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    pendingAuthControl = origin?.closest('a,button,[role="button"],[role="link"]') || null;
    queueMicrotask(() => {
      if (pendingAuthControl === origin || pendingAuthControl?.contains?.(origin)) pendingAuthControl = null;
    });
  }, true);

  history.pushState = function (state, title, url) {
    if (url != null) {
      const currentIsAuth = isAuthPath(location.href);
      const targetIsAuth = isAuthPath(url);
      if (!currentIsAuth && targetIsAuth && markAuthControlUnavailable(pendingAuthControl)) return;
      if (isRetiredEmbeddedAuthPath(url)) {
        goLogin(currentIsAuth ? readReturnUrl() : location.href, !isExplicitLoginControl(pendingAuthControl));
        return;
      }
      if (!currentIsAuth && targetIsAuth) saveReturnUrl(location.href);
      if (currentIsAuth && targetIsAuth) return nativeReplaceState(state, title, url);
    }
    return nativePushState(state, title, url);
  };
  history.replaceState = function (state, title, url) {
    if (url != null && !isAuthPath(location.href) && isAuthPath(url) && markAuthControlUnavailable(pendingAuthControl)) return;
    if (url != null && isRetiredEmbeddedAuthPath(url)) {
      goLogin(isAuthPath(location.href) ? readReturnUrl() : location.href, !isExplicitLoginControl(pendingAuthControl));
      return;
    }
    if (url != null && !isAuthPath(location.href) && isAuthPath(url)) saveReturnUrl(location.href);
    return nativeReplaceState(state, title, url);
  };

  document.addEventListener('click', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const logoControl = origin?.closest('.brand-logo,.logo,[data-login-home],[aria-label="返回首页"],[aria-label="首页"]');
    const control = logoControl || origin?.closest('a,button,[role="button"]');
    if (!control) return;
    if (!isAuthPath(location.href)) {
      const href = control.getAttribute('href');
      if (
        location.pathname.startsWith('/factorhub/fourthFactorCompetition') &&
        href &&
        isFourthCompetitionRulesPath(href)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        markAuthControlUnavailable(control);
        return;
      }
      if (href && isAuthPath(href)) {
        if (isExplicitLoginControl(control)) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        markAuthControlUnavailable(control);
        return;
      }
      const authText = (control.textContent || '').replace(/\s+/g, '');
      if (/^(?:快速试用|立即试用)$/.test(authText)) {
        if (matchMedia('(max-width: 768px)').matches) {
          event.preventDefault();
          event.stopImmediatePropagation();
          goLogin(location.href, true);
          return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        markAuthControlUnavailable(control);
        return;
      }
      if (!href && /^(?:登录|登入|登录\/注册|立即登录)$/.test(authText)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goLogin(location.href);
      }
      return;
    }
    const isLogoControl = !!logoControl;
    if (isLogoControl) {
      event.preventDefault();
      event.stopImmediatePropagation();
      sessionStorage.removeItem(STORAGE_KEY);
      location.replace('/');
      return;
    }
    const text = (control.textContent || '').replace(/\s+/g, '');
    const label = control.getAttribute('aria-label') || '';
    const className = typeof control.className === 'string' ? control.className : '';
    const isBackControl = text.includes('返回') || /返回|back/i.test(label) || /(^|[-_\s])back($|[-_\s])/i.test(className);
    if (!isBackControl) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    returnFromAuth();
  }, true);

  document.addEventListener('keydown', event => {
    if (!isAuthPath(location.href) || (event.key !== 'Enter' && event.key !== ' ')) return;
    const origin = event.target instanceof Element ? event.target : null;
    const logoControl = origin?.closest('.brand-logo,.logo,[data-login-home],[aria-label="返回首页"],[aria-label="首页"]');
    if (!logoControl) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    sessionStorage.removeItem(STORAGE_KEY);
    location.replace('/');
  }, true);

  const prepareAuthLogo = () => {
    if (!isAuthPath(location.href)) return false;
    const logo = document.querySelector('.brand-logo,.logo,[data-login-home],[aria-label="返回首页"],[aria-label="首页"]');
    if (!logo) return false;
    logo.setAttribute('data-login-home', '');
    if (!logo.hasAttribute('role')) logo.setAttribute('role', 'link');
    if (!logo.hasAttribute('tabindex')) logo.setAttribute('tabindex', '0');
    if (!logo.hasAttribute('aria-label')) logo.setAttribute('aria-label', '返回首页');
    return true;
  };
  const watchForAuthLogo = () => {
    if (prepareAuthLogo()) return;
    const observer = new MutationObserver(() => {
      if (prepareAuthLogo()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  /*
   * One mobile navigation implementation for every normal site page.  It is
   * intentionally installed from this shared bootstrap (rather than copied
   * into individual pages) so homepage and data-service cannot drift apart.
   */
  const mobileGroups = window.PandaNavigationGroups;
  const mobileAccountLogin = '/login?redirect=%2F&entry=action';
  const mobileIconPaths = {
    workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    building: '<path d="M3 22h18M6 18v-7m4 7v-7m4 7v-7m4 7v-7M4 7h16L12 2Z"/>',
    education: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    book: '<path d="M12 7v14M3 18V4a1 1 0 0 1 1-1h4a4 4 0 0 1 4 4 4 4 0 0 1 4-4h4a1 1 0 0 1 1 1v14h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
    academy: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    bookmark: '<path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    code: '<path d="m10 13-2 2 2 2m4-4 2 2-2 2M14 2v5h5"/><path d="M19 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2Z"/>',
    community: '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3-2-6-4-8"/>',
    expand: '<path d="m4 4 16 16M20 4 4 20M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 15v3m4-3v3M18 2H6v7a6 6 0 0 0 12 0Z"/>',
    medal: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    swords: '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6m-3-3h6"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 0 0 3-3l-5-5a1 1 0 0 0-3 3l1 1"/><path d="M3 4h5l3 3m10-3h-5l-2 2M3 3 2 14l7 7m12-18 1 11-4 4"/>'
  };
  const sharedNavIcon = type => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + (mobileIconPaths[type] || mobileIconPaths.info) + '</svg>';
  const escapeMobileText = value => String(value).replace(/[&<>\"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  const CANONICAL_NAV_TITLES = '产品|活动|解决方案|学习|关于|社区';
  const normalizedNavigationPath = () => location.pathname.replace(/\/+$/, '') || '/';
  const AWARDS_NAV_STYLE_ID = 'panda-awards-route-navigation-runtime';
  const syncAwardsNavigationSurface = () => {
    const active = normalizedNavigationPath() === '/activities/strategyshare';
    document.documentElement.toggleAttribute('data-panda-awards-route', active);
    let style = document.getElementById(AWARDS_NAV_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = AWARDS_NAV_STYLE_ID;
      style.textContent = `
        html[data-panda-awards-route] .nav-container,
        html[data-panda-awards-route] .nav-container.nav-blend,
        html[data-panda-awards-route] .nav-container.nav-blend[data-v-c9736b5b],
        html[data-panda-awards-route] .nav-container .nav-pc-container,
        html[data-panda-awards-route] .nav-container .nav-mobile-container,
        html[data-panda-awards-route] .nav-container .navbar,
        html[data-panda-awards-route] .nav-container .navbar-inner {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
          border: 0 !important;
          box-shadow: none !important;
          isolation: auto !important;
          mix-blend-mode: normal !important;
        }
        html[data-panda-awards-route] .nav-container::before,
        html[data-panda-awards-route] .nav-container::after,
        html[data-panda-awards-route] .nav-container .nav-pc-container::before,
        html[data-panda-awards-route] .nav-container .nav-pc-container::after {
          content: none !important;
          display: none !important;
        }
        @media (min-width: 769px) {
          html[data-panda-awards-route] .nav-container,
          html[data-panda-awards-route] .nav-container.nav-blend {
            display: contents !important;
          }
          html[data-panda-awards-route] .nav-container .nav-pc-container {
            position: fixed !important;
            top: 0 !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    if (active) {
      const video = document.querySelector('.hero-video');
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        const attempt = video.play();
        if (attempt?.catch) attempt.catch(() => {});
      }
    }
  };
  syncAwardsNavigationSurface();
  document.addEventListener('panda:routechange', syncAwardsNavigationSurface);
  window.addEventListener('pageshow', syncAwardsNavigationSurface, { passive: true });
  window.addEventListener('popstate', syncAwardsNavigationSurface, { passive: true });
  const awardsNavigationIntent = event => {
    const target = event.target instanceof Element ? event.target.closest('a,button') : null;
    if (!target) return false;
    const href = target instanceof HTMLAnchorElement ? normalizedNavigationHref(target.href) : '';
    const label = target.textContent.replace(/\s+/g, ' ').trim();
    return href === '/activities/strategyshare' || label.includes('第三届因子大赛颁奖典礼');
  };
  const armAwardsNavigationSurface = event => {
    if (!awardsNavigationIntent(event)) return;
    document.documentElement.setAttribute('data-panda-awards-route', '');
    if (event.type === 'click' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey &&
        document.pandaAppShellNavigate?.('/activities/strategyshare')) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  document.addEventListener('pointerdown', armAwardsNavigationSurface, true);
  document.addEventListener('click', armAwardsNavigationSurface, true);
  const FORCED_NAVIGATION_ROUTES = new Set(['/knowledge-base']);
  const SHARED_NAVIGATION_EXCLUDED_RE = /^\/(?:login|competition\/llm|factorhub\/fourthFactorCompetition|quantskills)(?:\/|$)/i;
  const ownsSharedNavigation = () => !SHARED_NAVIGATION_EXCLUDED_RE.test(normalizedNavigationPath());
  const normalizedNavigationHref = value => {
    try { return new URL(value, location.href).pathname.replace(/\/+$/, '') || '/'; }
    catch (_) { return ''; }
  };
  const navigationTitles = root => [...(root?.querySelectorAll('.menu-title') || [])]
    .map(item => item.textContent.trim())
    .join('|');
  const HOME_NAV_SCOPE = 'data-v-e983e1fe';
  const HOME_NAV_SHELL_SCOPE = 'data-v-c9736b5b';
  const findTopNavigationShell = () => {
    const shell = [...document.querySelectorAll('.nav-container')].find(candidate =>
      candidate.dataset.navigationMasterShell === 'true' ||
      candidate.querySelector(':scope > .nav-pc-container,:scope > .nav-mobile-container')
    ) || null;
    if (shell) document.documentElement.dataset.pandaSharedNavigationExpected = 'true';
    return shell;
  };
  const pruneDuplicateNavigationShells = () => {
    const master = document.querySelector('.navbar[data-navigation-master="true"]');
    const shell = master?.closest('.nav-container');
    if (!shell) return false;
    document.querySelectorAll('.nav-container').forEach(candidate => {
      if (candidate !== shell) candidate.remove();
    });
    return true;
  };
  const ensureHomeNavigationShell = () => {
    let shell = findTopNavigationShell();
    if (shell || !document.body || (!ownsSharedNavigation() && !FORCED_NAVIGATION_ROUTES.has(normalizedNavigationPath()))) return shell;
    shell = document.createElement('div');
    shell.className = 'nav-container nav-blend';
    shell.innerHTML = '<div class="nav-pc-container"></div><div class="nav-mobile-container"></div>';
    document.body.prepend(shell);
    document.documentElement.dataset.pandaSharedNavigationExpected = 'true';
    return shell;
  };
  const prepareHomeNavigationShell = () => {
    const shell = ensureHomeNavigationShell();
    if (!shell) return false;
    let desktop = shell.querySelector(':scope > .nav-pc-container');
    let mobile = shell.querySelector(':scope > .nav-mobile-container');
    if (!desktop) {
      desktop = document.createElement('div');
      desktop.className = 'nav-pc-container';
      shell.prepend(desktop);
    }
    if (!mobile) {
      mobile = document.createElement('div');
      mobile.className = 'nav-mobile-container';
      shell.appendChild(mobile);
    }
    desktop.dataset.homeNavHost = 'true';
    desktop.dataset.navigationMasterHost = 'true';
    mobile.dataset.homeNavHost = 'true';
    desktop.setAttribute(HOME_NAV_SHELL_SCOPE, '');
    mobile.setAttribute(HOME_NAV_SHELL_SCOPE, '');
    shell.dataset.homeNavShellCopy = 'true';
    shell.dataset.navigationMasterShell = 'true';
    if (FORCED_NAVIGATION_ROUTES.has(normalizedNavigationPath())) shell.dataset.navigationTone = 'light';
    else delete shell.dataset.navigationTone;
    shell.className = 'nav-container nav-blend';
    shell.setAttribute(HOME_NAV_SHELL_SCOPE, '');
    return shell;
  };
  const scopeHomeNav = root => {
    [root, ...root.querySelectorAll('*')].forEach(node => node.setAttribute(HOME_NAV_SCOPE, ''));
  };
  const colorChannels = value => {
    const match = String(value).match(/rgba?\(([^)]+)\)/i);
    if (!match) return null;
    const channels = match[1].split(/[ ,/]+/).map(Number);
    if (channels.length < 3 || channels.slice(0, 3).some(Number.isNaN)) return null;
    return { r: channels[0], g: channels[1], b: channels[2], a: channels[3] == null ? 1 : channels[3] };
  };
  const isLightColor = color => {
    if (!color) return null;
    const linear = [color.r, color.g, color.b].map(channel => {
      const value = channel / 255;
      return value <= .04045 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
    });
    return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722 > .48;
  };
  const useLightDropdownFor = rect => {
    const x = Math.max(1, Math.min(innerWidth - 2, rect.left + Math.min(150, rect.width / 2)));
    const y = Math.max(1, Math.min(innerHeight - 2, rect.bottom + 18));
    const hitLayers = document.elementsFromPoint
      ? document.elementsFromPoint(x, y)
      : [document.elementFromPoint(x, y)].filter(Boolean);
    const layers = hitLayers.filter(element => !element.closest('.nav-container,.dropdown-portal'));
    for (const element of layers) {
      const style = getComputedStyle(element);
      const background = colorChannels(style.backgroundColor);
      if (background && background.a >= .72) return isLightColor(background);
      if (style.backgroundImage !== 'none') {
        const foreground = isLightColor(colorChannels(style.color));
        if (foreground != null) return !foreground;
      }
    }
    const bodyBackground = colorChannels(getComputedStyle(document.body).backgroundColor);
    if (bodyBackground && bodyBackground.a >= .72) return isLightColor(bodyBackground);
    return location.pathname.startsWith('/data-service') || (location.pathname === '/' && scrollY >= innerHeight * .9);
  };
  const installSharedDesktopNav = () => {
    const host = document.querySelector('.nav-pc-container');
    const master = window.PandaSiteNavigationMaster;
    if (!host || !master?.createNavbar) return false;
    const existing = host.querySelector(':scope > .navbar[data-navigation-master="true"]');
    if (existing && existing.dataset.navigationMasterBound === 'true' &&
      existing.querySelectorAll('.menu-title').length === mobileGroups.length) return false;
    const navbar = master.createNavbar();
    if (!navbar) return false;
    navbar.dataset.navigationMasterBound = 'true';
    host.replaceChildren();
    host.appendChild(navbar);
    host.dataset.navigationMasterHost = 'true';
    window.PandaAlignCurrentPageLinks?.(navbar);
    window.PandaMarkLoginRequiredEntrances?.(navbar);
    [host, host.closest('.nav-container')].forEach(shell => {
      if (!shell) return;
      [...shell.attributes].forEach(attribute => {
        if (attribute.name.startsWith('data-v-')) shell.removeAttribute(attribute.name);
      });
      shell.setAttribute(HOME_NAV_SHELL_SCOPE, '');
    });
    scopeHomeNav(navbar);
    let portal = null;
    let openedIndex = -1;
    let closeTimer = 0;
    let portalOpenedAtY = 0;
    const close = () => {
      clearTimeout(closeTimer);
      const closingPortal = portal;
      portal = null;
      openedIndex = -1;
      if (closingPortal) {
        closingPortal.style.pointerEvents = 'none';
        if (typeof closingPortal.animate === 'function') {
          const exitAnimation = closingPortal.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-6px) scale(.97)' }
          ], {
            duration: 300,
            easing: 'cubic-bezier(.16,1,.3,1)',
            fill: 'forwards'
          });
          exitAnimation.finished.then(
            () => closingPortal.remove(),
            () => closingPortal.remove()
          );
        } else {
          closingPortal.remove();
        }
      }
      navbar.querySelectorAll('.menu-title').forEach(title => {
        title.classList.remove('menu-title--open');
        title.setAttribute('aria-expanded', 'false');
      });
    };
    const keepsDropdownOpen = related => related instanceof Element &&
      (related.closest('.menu-title') || portal?.contains(related));
    const closeFromTitle = event => {
      clearTimeout(closeTimer);
      if (keepsDropdownOpen(event?.relatedTarget)) return;
      closeTimer = window.setTimeout(close, 650);
    };
    const closeFromPortal = event => {
      clearTimeout(closeTimer);
      if (keepsDropdownOpen(event?.relatedTarget)) return;
      close();
    };
    const open = (index, title) => {
      clearTimeout(closeTimer);
      if (openedIndex === index && portal?.isConnected) return;
      if (portal) {
        portal.remove();
        portal = null;
      }
      navbar.querySelectorAll('.menu-title').forEach(candidate => {
        candidate.classList.remove('menu-title--open');
        candidate.setAttribute('aria-expanded', 'false');
      });
      openedIndex = index;
      title.classList.add('menu-title--open');
      title.setAttribute('aria-expanded', 'true');
      const rect = title.getBoundingClientRect();
      portalOpenedAtY = window.scrollY;
      const navBottom = navbar.closest('.nav-pc-container')?.getBoundingClientRect().bottom ?? rect.bottom;
      portal = document.createElement('div');
      portal.className = 'dropdown-portal';
      portal.style.left = rect.left + 'px';
      portal.style.top = navBottom + 'px';
      const dropdown = document.createElement('div');
      const useLightDropdown = useLightDropdownFor({ left: rect.left, width: 340, bottom: navBottom });
      dropdown.className = 'dropdown dropdown--rich' + (useLightDropdown ? ' dropdown--light' : '');
      mobileGroups[index][1].forEach(([label, description, href, iconType]) => {
        window.PandaAppShellRouter?.prefetch?.(href);
        const anchor = document.createElement('a');
        anchor.className = 'dropdown-item';
        anchor.href = href;
        anchor.innerHTML = '<span class="dropdown-item-inner"><span class="dropdown-item-icon">' + sharedNavIcon(iconType) + '</span><span class="dropdown-item-content"><span class="dropdown-item-title">' + escapeMobileText(label) + '</span><span class="dropdown-item-desc">' + escapeMobileText(description) + '</span></span></span><svg class="dropdown-item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>';
        dropdown.appendChild(anchor);
      });
      portal.appendChild(dropdown);
      scopeHomeNav(portal);
      portal.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      portal.addEventListener('mouseleave', closeFromPortal);
      document.body.appendChild(portal);
      window.PandaAlignCurrentPageLinks?.(portal);
      window.PandaMarkLoginRequiredEntrances?.(portal);
    };
    navbar.querySelectorAll('.menu-item').forEach((item, index) => {
      const title = item.querySelector('.menu-title');
      title.addEventListener('mouseenter', () => open(index, title));
      title.addEventListener('pointerdown', event => {
        if (event.button === 0) open(index, title);
      });
      title.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') open(index, title);
      });
      title.addEventListener('mouseleave', closeFromTitle);
    });
    const home = () => location.assign(CURRENT_HOME_ENTRY);
    navbar.querySelector('.logo').addEventListener('click', home);
    navbar.querySelector('.logo').addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') home();
    });
    const actions = navbar.querySelectorAll('.actions .btn');
    actions[0]?.addEventListener('click', () => goLogin(location.href));
    actions[1]?.addEventListener('click', () => goLogin(location.href));
    // Warm every shell-compatible destination as soon as the singleton
    // navigation is ready. Opening a category should never be the moment its
    // first route request begins.
    mobileGroups.flatMap(([, links]) => links).forEach(([, , href]) => {
      window.PandaAppShellRouter?.prefetch?.(href);
    });
    document.documentElement.dataset.sharedNavReady = 'true';
    window.addEventListener('scroll', () => {
      if (portal && Math.abs(window.scrollY - portalOpenedAtY) > 4) close();
    }, { passive: true });
    return true;
  };
  const setSharedMobileNavigationOpen = (navigation, open) => {
    const toggle = navigation?.querySelector('.panda-mobile-toggle');
    const burger = navigation?.querySelector('.panda-mobile-burger');
    const drawer = navigation?.querySelector('.panda-mobile-drawer');
    if (!toggle || !burger || !drawer) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    burger.classList.toggle('is-open', open);
    drawer.hidden = !open;
    document.documentElement.classList.toggle('panda-mobile-nav-open', open);
    requestAnimationFrame(() => queueSharedMobileContrastRefresh());
  };
  const closeReturnedMobileNavigationWindows = () => {
    if (!matchMedia('(max-width: 900px)').matches) return;
    document.querySelectorAll('.panda-mobile-navigation').forEach(navigation => {
      setSharedMobileNavigationOpen(navigation, false);
      navigation.querySelectorAll('.panda-mobile-group-title').forEach(title => {
        title.setAttribute('aria-expanded', 'false');
        title.classList.remove('is-open');
        const body = navigation.querySelector('#' + title.getAttribute('aria-controls'));
        if (body) body.hidden = true;
      });
    });
    document.documentElement.classList.remove('panda-mobile-nav-open');
    document.body.classList.remove('mobile-nav-open');
    document.querySelectorAll('.dropdown-portal,.community-nav-portal').forEach(portal => portal.remove());
  };
  window.addEventListener('pageshow', closeReturnedMobileNavigationWindows, { passive: true });
  window.addEventListener('popstate', closeReturnedMobileNavigationWindows, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') closeReturnedMobileNavigationWindows();
  });
  if ((location.pathname.replace(/\/+$/, '') || '/') === '/') {
    requestAnimationFrame(closeReturnedMobileNavigationWindows);
  }
  document.addEventListener('click', event => {
    const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
    const toggle = origin?.closest('.panda-mobile-toggle');
    if (toggle) {
      const navigation = toggle.closest('.panda-mobile-navigation');
      event.preventDefault();
      event.stopImmediatePropagation();
      setSharedMobileNavigationOpen(navigation, toggle.getAttribute('aria-expanded') !== 'true');
      return;
    }
    const link = origin?.closest('.panda-mobile-link,.panda-mobile-account a');
    if (link) {
      return;
    }
    const title = origin?.closest('.panda-mobile-group-title');
    if (!title) return;
    const navigation = title.closest('.panda-mobile-navigation');
    const open = title.getAttribute('aria-expanded') !== 'true';
    event.preventDefault();
    event.stopImmediatePropagation();
    title.setAttribute('aria-expanded', String(open));
    title.classList.toggle('is-open', open);
    const body = navigation?.querySelector('#' + title.getAttribute('aria-controls'));
    if (body) body.hidden = !open;
  }, true);
  let mobileContrastFrame = 0;
  let mobileContrastThrottleTimer = 0;
  let mobileContrastSettleTimer = 0;
  let mobileContrastLateTimer = 0;
  const mobileBackgroundSample = (x, y) => {
    const layers = document.elementsFromPoint
      ? document.elementsFromPoint(x, y)
      : [document.elementFromPoint(x, y)].filter(Boolean);
    for (const element of layers) {
      if (element.closest('.nav-container,.dropdown-portal,.panda-mobile-drawer')) continue;
      const style = getComputedStyle(element);
      const background = colorChannels(style.backgroundColor);
      if (background && background.a >= .55) return isLightColor(background);
      if (element.matches('img,video,canvas,picture')) return false;
      if (style.backgroundImage !== 'none') {
        const imageColor = colorChannels(style.backgroundImage);
        return imageColor ? isLightColor(imageColor) : false;
      }
    }
    const bodyBackground = colorChannels(getComputedStyle(document.body).backgroundColor);
    return bodyBackground && bodyBackground.a >= .55 ? isLightColor(bodyBackground) : false;
  };
  const syncSharedMobileContrast = () => {
    cancelAnimationFrame(mobileContrastFrame);
    mobileContrastFrame = requestAnimationFrame(() => {
      const bar = document.querySelector('.panda-mobile-navigation > .panda-mobile-bar');
      if (!bar) return;
      const menuOpen = document.documentElement.classList.contains('panda-mobile-nav-open');
      const rect = bar.getBoundingClientRect();
      const y = Math.max(1, Math.min(innerHeight - 2, rect.top + rect.height / 2));
      const points = [24, innerWidth / 2, innerWidth - 24]
        .map(x => mobileBackgroundSample(Math.max(1, Math.min(innerWidth - 2, x)), y));
      const onLight = !menuOpen && points.filter(Boolean).length >= 2;
      bar.classList.toggle('panda-mobile-on-light', onLight);
      bar.classList.toggle('panda-mobile-on-dark', !onLight);
    });
  };
  const queueSharedMobileContrastRefresh = () => {
    if (!matchMedia('(max-width: 900px)').matches) return;
    if (!mobileContrastThrottleTimer) {
      mobileContrastThrottleTimer = window.setTimeout(() => {
        mobileContrastThrottleTimer = 0;
        syncSharedMobileContrast();
      }, 72);
    }
    clearTimeout(mobileContrastSettleTimer);
    clearTimeout(mobileContrastLateTimer);
    mobileContrastSettleTimer = window.setTimeout(syncSharedMobileContrast, 120);
    mobileContrastLateTimer = window.setTimeout(syncSharedMobileContrast, 480);
  };
  if (!window.__pandaMobileContrastReady) {
    window.__pandaMobileContrastReady = true;
    const refreshSharedMobileNavigation = queueSharedMobileContrastRefresh;
    window.addEventListener('scroll', refreshSharedMobileNavigation, { passive: true });
    window.addEventListener('resize', refreshSharedMobileNavigation, { passive: true });
    window.addEventListener('pageshow', refreshSharedMobileNavigation, { passive: true });
    window.addEventListener('focus', refreshSharedMobileNavigation, { passive: true });
    window.visualViewport?.addEventListener('resize', refreshSharedMobileNavigation, { passive: true });
    window.visualViewport?.addEventListener('scroll', refreshSharedMobileNavigation, { passive: true });
    window.addEventListener('popstate', queueSharedMobileContrastRefresh, { passive: true });
    document.addEventListener('panda:routechange', refreshSharedMobileNavigation);
    const startContrastObserver = () => {
      if (window.__pandaMobileContrastObserverReady || !document.body) return;
      window.__pandaMobileContrastObserverReady = true;
      if (document.documentElement.dataset.pandaNavigationOnly === 'true') {
        queueSharedMobileContrastRefresh();
        return;
      }
      const contrastObserver = new MutationObserver(queueSharedMobileContrastRefresh);
      contrastObserver.observe(document.body || document.documentElement, { childList: true, subtree: true });
      queueSharedMobileContrastRefresh();
    };
    if (document.body) startContrastObserver();
    else document.addEventListener('DOMContentLoaded', startContrastObserver, { once: true });
  }
  const installSharedMobileNav = () => {
    if (!document.body) return false;
    let host = document.getElementById('panda-mobile-navigation-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'panda-mobile-navigation-root';
      document.body.appendChild(host);
    } else if (host.parentElement !== document.body) {
      document.body.appendChild(host);
    }
    const existingNavigation = host.firstElementChild?.classList.contains('panda-mobile-navigation')
      ? host.firstElementChild
      : null;
    const existingNavigationIsComplete = existingNavigation &&
      existingNavigation.dataset.mobileNavigationVersion === '20260827-root-1' &&
      existingNavigation.querySelectorAll('.panda-mobile-bar .panda-mobile-logo').length === 1 &&
      existingNavigation.querySelector('.panda-mobile-bar .panda-mobile-toggle') &&
      existingNavigation.querySelector('.panda-mobile-drawer');
    if (existingNavigationIsComplete) return false;
    const navigation = document.createElement('div');
    navigation.className = 'panda-mobile-navigation';
    navigation.dataset.mobileNavigationVersion = '20260827-root-1';
    navigation.innerHTML = `
      <div class="panda-mobile-bar">
        <a class="panda-mobile-home" href="${CURRENT_HOME_ENTRY}" aria-label="返回首页"><span class="panda-mobile-logo-stack" aria-hidden="true"><img class="panda-mobile-logo" src="/knowledge-base/_nuxt/icon.DpwKN-kR.png" alt=""></span></a>
        <button class="panda-mobile-toggle" type="button" aria-label="打开菜单" aria-expanded="false" aria-controls="panda-mobile-drawer">
          <svg class="panda-mobile-burger" viewBox="0 0 1024 1024" fill="none" stroke="currentColor" stroke-width="64" stroke-linecap="round" aria-hidden="true"><line class="top" x1="96" y1="512" x2="928" y2="512"></line><line class="mid" x1="96" y1="512" x2="928" y2="512"></line><line class="bottom" x1="96" y1="512" x2="928" y2="512"></line></svg>
        </button>
      </div>
      <div class="panda-mobile-drawer" id="panda-mobile-drawer" hidden>
        <div class="panda-mobile-scroll">
          ${mobileGroups.map(([title, items], groupIndex) => `
            <section class="panda-mobile-group">
              <button class="panda-mobile-group-title" type="button" aria-expanded="false" aria-controls="panda-mobile-group-${groupIndex + 1}"><span>${escapeMobileText(title)}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg></button>
              <div class="panda-mobile-group-body" id="panda-mobile-group-${groupIndex + 1}" hidden>
                ${items.filter(([label]) => label !== '知识库').map(([label, description, href, iconType]) => `<a class="panda-mobile-link${normalizedNavigationHref(href) === normalizedNavigationPath() ? ' panda-mobile-link--current' : ''}" href="${href}"><span class="panda-mobile-link-icon">${sharedNavIcon(iconType)}</span><span class="panda-mobile-link-text"><span class="panda-mobile-link-title">${escapeMobileText(label)}</span><span class="panda-mobile-link-desc">${escapeMobileText(description)}</span></span></a>`).join('')}
              </div>
            </section>`).join('')}
          <div class="panda-mobile-account"><div>我的</div><a href="${mobileAccountLogin}" data-panda-login-link="true" rel="nofollow">每日签到 / 邀请好友</a><a href="${mobileAccountLogin}" data-panda-login-link="true" rel="nofollow">个人中心</a></div>
        </div>
        <div class="panda-mobile-actions"><button type="button">登录 / 注册</button></div>
      </div>`;
    host.replaceChildren(navigation);
    window.PandaAlignCurrentPageLinks?.(navigation);
    window.PandaMarkLoginRequiredEntrances?.(navigation);
    navigation.querySelector('.panda-mobile-actions button')?.addEventListener('click', () => goLogin(location.href));
    return true;
  };
  const ensureIosChromeHeroNavigation = () => {
    const html = document.documentElement;
    if (!html.classList.contains('panda-ios-chrome') || !matchMedia('(max-width: 768px)').matches || normalizedNavigationPath() !== '/') {
      document.getElementById('panda-ios-chrome-hero-navigation')?.remove();
      html.classList.remove('panda-ios-chrome-hero-nav-ready');
      html.classList.remove('panda-ios-chrome-hero-nav-active');
      return false;
    }
    const hero = document.querySelector('.index[data-v-2abc3f3f] .hero[data-v-2abc3f3f]');
    if (!hero) return false;
    let navigation = document.getElementById('panda-ios-chrome-hero-navigation');
    if (!navigation) {
      navigation = document.createElement('div');
      navigation.id = 'panda-ios-chrome-hero-navigation';
      navigation.setAttribute('aria-hidden', 'true');
      navigation.innerHTML = `
        <a href="${CURRENT_HOME_ENTRY}" tabindex="-1">
          <svg viewBox="0 0 195 206" aria-hidden="true"><path fill="currentColor" d="M96.07 94.87 95 98.99l-5.41 18.32-14.01 42.6-8.34 26.55 14.6 8.35c1.09.62 15.78 8.19 15.89 8.19.1 0 15.91-8.04 16.9-8.59l15.33-8.58-1.35-2.67-14.98-43.2c-.18-.56-13.63-42.6-13.63-42.63 0-.59-1.03-2.94-1.43-3.27-1.14-.95-1.65-.79-2.5.81Z"/><path fill="currentColor" d="m91.21 4.05-19.5 4.55c-10.31 2.18-17.89 4.29-18.9 5.27-.26.26-21.96 42.99-25.83 50.87L2.83 113.99l4.76 8.75L21.8 148l11.82 19.67c1.58 2.13 6.81 5.48 16.02 10.26l13.97 6.79-3.67-11.26-10.52-30.78c-2.51-7.61-6.35-21.1-6.23-21.9.23-1.56 6.83-5.79 26.56-17.02L96 88.81v-42.9c0-33.7-.27-42.9-1.25-42.85l-3.54.99Z"/><path fill="currentColor" d="M100.02 45.14c0 16.37.46 43.01.75 43.43l6.73 4.4 25.75 14.76c16.67 9.64 19.75 11.78 19.75 13.73 0 .2-5.83 19.54-6.38 21.17l-10.58 30.21-3.87 11.61 14.71-6.84 14.38-7.11 12.88-22 16.01-28.01 3.13-6.02-14.38-29.48-24.88-50.49c-10.45-20.85-10.55-21.01-14.52-22.16l-20.38-4.83-17.75-4.2c-1.15-.44-1.37 6.3-1.35 41.83Z"/></svg>
        </a>
        <button type="button" tabindex="-1">
          <svg viewBox="0 0 1024 1024" fill="none" stroke="currentColor" stroke-width="86" stroke-linecap="round" aria-hidden="true"><line x1="96" y1="192" x2="928" y2="192"/><line x1="96" y1="512" x2="928" y2="512"/><line x1="96" y1="832" x2="928" y2="832"/></svg>
        </button>`;
      navigation.querySelector('button')?.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector('#panda-mobile-navigation-root .panda-mobile-toggle')?.click();
      });
    }
    if (navigation.parentElement !== hero) hero.appendChild(navigation);
    const handoffOffset = Math.max(0, window.scrollY || window.visualViewport?.pageTop || 0);
    const active = handoffOffset <= 1;
    navigation.style.transform = '';
    html.classList.toggle('panda-ios-chrome-hero-nav-active', active);
    html.classList.add('panda-ios-chrome-hero-nav-ready');
    return true;
  };
  let iosChromeHeroNavigationObserver;
  let iosChromeHandoffVisibleAt = performance.now();
  let iosChromeLastScrollIntentAt = -Infinity;
  let iosChromeHandoffResetFrame = 0;
  let iosChromeHandoffResetCount = 0;
  const exposeIosChromeHandoffState = (offset, reason) => {
    window.__pandaIosChromeHandoffState = {
      visibleAt: Math.round(iosChromeHandoffVisibleAt),
      lastScrollIntentAt: Number.isFinite(iosChromeLastScrollIntentAt) ? Math.round(iosChromeLastScrollIntentAt) : null,
      resetCount: iosChromeHandoffResetCount,
      offset: Math.round(offset || 0),
      reason
    };
  };
  const armIosChromeHandoffStabilizer = reason => {
    iosChromeHandoffVisibleAt = performance.now();
    exposeIosChromeHandoffState(Math.max(0, window.scrollY || window.visualViewport?.pageTop || 0), `armed:${reason}`);
    [0, 80, 180, 350, 700, 1200, 2000, 3200, 4800, 7000, 9500].forEach(delay => {
      window.setTimeout(() => stabilizeIosChromeHandoffScroll(`armed:${reason}:${delay}`), delay);
    });
  };
  const stabilizeIosChromeHandoffScroll = (reason = 'event') => {
    const now = performance.now();
    const offset = Math.max(0, window.scrollY || window.visualViewport?.pageTop || 0);
    const isIosChromeHome = document.documentElement.classList.contains('panda-ios-chrome') &&
      matchMedia('(max-width: 768px)').matches && normalizedNavigationPath() === '/';
    const recentlyScrolledByUser = now - iosChromeLastScrollIntentAt < 800;
    const insideForegroundWindow = now - iosChromeHandoffVisibleAt < 12000;
    const looksLikeHandoffOffset = offset > 0 && offset < 180;
    exposeIosChromeHandoffState(offset, `${reason}:${looksLikeHandoffOffset ? 'candidate' : 'ignored'}`);
    if (!isIosChromeHome || !insideForegroundWindow || recentlyScrolledByUser || !looksLikeHandoffOffset) return false;
    iosChromeHandoffResetCount += 1;
    window.scrollTo(0, 0);
    cancelAnimationFrame(iosChromeHandoffResetFrame);
    iosChromeHandoffResetFrame = requestAnimationFrame(() => {
      const confirmationOffset = Math.max(0, window.scrollY || window.visualViewport?.pageTop || 0);
      if (performance.now() - iosChromeLastScrollIntentAt >= 800 && confirmationOffset > 0 && confirmationOffset < 180) window.scrollTo(0, 0);
      exposeIosChromeHandoffState(Math.max(0, window.scrollY || window.visualViewport?.pageTop || 0), `${reason}:reset`);
      ensureIosChromeHeroNavigation();
    });
    return true;
  };
  const startIosChromeHeroNavigation = () => {
    ensureIosChromeHeroNavigation();
    if (iosChromeHeroNavigationObserver || !document.body) return;
    iosChromeHeroNavigationObserver = new MutationObserver(() => ensureIosChromeHeroNavigation());
    iosChromeHeroNavigationObserver.observe(document.querySelector('#__nuxt') || document.body, { childList: true, subtree: true });
    [0, 120, 320, 700, 1400].forEach(delay => window.setTimeout(ensureIosChromeHeroNavigation, delay));
    const syncHandoffViewport = () => {
      stabilizeIosChromeHandoffScroll('viewport');
      ensureIosChromeHeroNavigation();
    };
    const noteRealScrollIntent = () => { iosChromeLastScrollIntentAt = performance.now(); };
    window.addEventListener('touchmove', noteRealScrollIntent, { passive: true, capture: true });
    window.addEventListener('wheel', noteRealScrollIntent, { passive: true, capture: true });
    window.addEventListener('pageshow', () => {
      armIosChromeHandoffStabilizer('pageshow');
      syncHandoffViewport();
    }, { passive: true });
    window.addEventListener('scroll', syncHandoffViewport, { passive: true });
    window.addEventListener('resize', syncHandoffViewport, { passive: true });
    window.visualViewport?.addEventListener('resize', syncHandoffViewport, { passive: true });
    window.visualViewport?.addEventListener('scroll', syncHandoffViewport, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        armIosChromeHandoffStabilizer('visible');
        syncHandoffViewport();
      }
    });
    armIosChromeHandoffStabilizer('install');
  };
  const installNavigationMaster = () => {
    if (!prepareHomeNavigationShell()) return false;
    const desktopChanged = installSharedDesktopNav();
    let mobileChanged = false;
    try {
      mobileChanged = installSharedMobileNav();
      startIosChromeHeroNavigation();
      document.documentElement.dataset.pandaMobileNavigationReady = String(Boolean(document.querySelector('.panda-mobile-navigation')));
      queueSharedMobileContrastRefresh();
    } catch (error) {
      document.documentElement.dataset.pandaMobileNavigationError = String(error?.message || error);
    }
    const navigationReady = Boolean(document.querySelector('.navbar[data-navigation-master="true"]')) &&
      Boolean(document.querySelector('.panda-mobile-navigation'));
    document.documentElement.dataset.pandaNavigationReady = String(navigationReady);
    pruneDuplicateNavigationShells();
    window.PandaPruneRetiredNavigationItems?.(document);
    return desktopChanged || mobileChanged;
  };
  let curveAnimationFrame = 0;
  let curveLoopObserver = null;
  const installFixedCurveLoop = () => {
    const source = document.querySelector('.curved-loop-jacket:not([data-uniform-loop])');
    const sourcePath = source?.querySelector('textPath');
    const measure = source?.querySelector('.curved-loop-svg > text');
    if (!source || !sourcePath || !measure || !sourcePath.textContent.trim()) return false;
    const loop = source.cloneNode(true);
    loop.dataset.uniformLoop = 'true';
    loop.style.visibility = 'visible';
    loop.style.cursor = 'default';
    loop.style.userSelect = 'none';
    loop.style.touchAction = 'pan-y';
    source.replaceWith(loop);
    const path = loop.querySelector('textPath');
    const loopMeasure = loop.querySelector('.curved-loop-svg > text');
    const length = Math.max(1, loopMeasure.getComputedTextLength());
    const pixelsPerSecond = 120;
    const startedAt = performance.now();
    cancelAnimationFrame(curveAnimationFrame);
    curveLoopObserver?.disconnect();
    let isAnimating = false;
    const tick = now => {
      if (!isAnimating || document.visibilityState !== 'visible') return;
      const distance = ((now - startedAt) * pixelsPerSecond / 1000) % length;
      path.setAttribute('startOffset', (-distance) + 'px');
      curveAnimationFrame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (isAnimating || document.visibilityState !== 'visible') return;
      isAnimating = true;
      curveAnimationFrame = requestAnimationFrame(tick);
    };
    const stop = () => {
      isAnimating = false;
      cancelAnimationFrame(curveAnimationFrame);
      curveAnimationFrame = 0;
    };
    if ('IntersectionObserver' in window) {
      curveLoopObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) start();
        else stop();
      }, { rootMargin: '120px 0px' });
      curveLoopObserver.observe(loop);
    } else {
      start();
    }
    document.addEventListener('visibilitychange', () => {
      const rect = loop.isConnected ? loop.getBoundingClientRect() : null;
      if (document.visibilityState === 'visible' && rect && rect.bottom >= -120 && rect.top <= innerHeight + 120) start();
      else stop();
    }, { passive: true });
    return true;
  };
  window.PandaNavigationMasterController = { install: installNavigationMaster };
  const startNavigationMaster = () => {
    const hasCatalogNavigation = () => {
      const navbar = document.querySelector('.nav-container .nav-pc-container .navbar');
      const titles = navigationTitles(navbar);
      return titles === CANONICAL_NAV_TITLES ||
        titles === '产品|解决方案|学习|社区|活动|关于' ||
        titles === '产品|定价|学习|社区|活动|关于';
    };
    const installCatalogNavigation = () => {
      if (!ownsSharedNavigation()) {
        document.querySelectorAll('.nav-container,#panda-mobile-navigation-root').forEach(node => node.remove());
        return;
      }
      const hasDesktopMaster = Boolean(document.querySelector('.nav-pc-container .navbar[data-navigation-master="true"]'));
      const hasMobileMaster = Boolean(document.querySelector('#panda-mobile-navigation-root > .panda-mobile-navigation'));
      if (hasDesktopMaster && hasMobileMaster) return;
      if (hasCatalogNavigation() || ownsSharedNavigation() || FORCED_NAVIGATION_ROUTES.has(normalizedNavigationPath())) installNavigationMaster();
    };
    installCatalogNavigation();
    installFixedCurveLoop();
    if (document.documentElement.dataset.pandaNavigationOnly === 'true') return;
    window.setTimeout(() => { installCatalogNavigation(); installFixedCurveLoop(); }, 160);
    window.setTimeout(() => { installCatalogNavigation(); installFixedCurveLoop(); }, 600);
    // Route replacement needs one reinstall pass, but a whole-body observer
    // also reacts to the framework's desktop/mobile breakpoint reconciliation.
    // At 768 -> mobile it can alternate replacing the same navigation host
    // forever. Route lifecycle events provide the intended coverage without
    // observing responsive DOM churn.
    const reinstallCatalogNavigation = () => {
      installCatalogNavigation();
      installFixedCurveLoop();
    };
    document.addEventListener('panda:routechange', reinstallCatalogNavigation);
    window.addEventListener('pageshow', reinstallCatalogNavigation, { passive: true });
    window.addEventListener('popstate', reinstallCatalogNavigation, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reinstallCatalogNavigation();
    });
  };

  if (isRetiredEmbeddedAuthPath(location.href)) {
    const params = new URLSearchParams(location.search);
    const requestedReturn = safeLocalUrl(params.get('redirect') || params.get('returnUrl') || params.get('from'));
    const fallbackReturn = location.pathname.startsWith('/factorhub/fourthFactorCompetition/')
      ? '/factorhub/fourthFactorCompetition/'
      : '/competition/llm/';
    goLogin(requestedReturn || fallbackReturn);
    return;
  }

  rememberAuthEntry();
  if (isAuthPath(location.href)) {
    const purgeAuthNavigationShells = () => {
      document.querySelectorAll('.nav-container,#panda-mobile-navigation-root,.dropdown-portal,.community-nav-portal')
        .forEach(node => node.remove());
      delete document.documentElement.dataset.pandaSharedNavigationExpected;
      delete document.documentElement.dataset.pandaNavigationReady;
      delete document.documentElement.dataset.pandaMobileNavigationReady;
    };
    purgeAuthNavigationShells();
    watchForAuthLogo();
    // Retired Nuxt auth chunks can append their historical site navigation
    // after hydration. Login owns exactly one brand; discard every late site
    // navigation shell instead of trying to hide one of two visible logos.
    const authNavigationObserver = new MutationObserver(purgeAuthNavigationShells);
    authNavigationObserver.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener('pagehide', () => authNavigationObserver.disconnect(), { once: true });
    return;
  }
  let navigationMasterBooted = false;
  let navigationSingletonGuardStarted = false;
  const startNavigationSingletonGuard = () => {
    if (navigationSingletonGuardStarted) return;
    navigationSingletonGuardStarted = true;
    const enforce = () => {
      if (!pruneDuplicateNavigationShells()) return;
      const portals = [...document.querySelectorAll('.dropdown-portal')];
      portals.slice(0, -1).forEach(candidate => candidate.remove());
    };
    // Enforce the historical single owner once at startup. Continuously
    // deleting framework-owned navigation nodes during a breakpoint change
    // creates a rebuild/remove loop in both WebKit and Chromium.
    enforce();
    document.addEventListener('panda:routechange', enforce);
    window.addEventListener('pageshow', enforce, { passive: true });
    window.addEventListener('popstate', enforce, { passive: true });
    window.setTimeout(enforce, 180);
    window.setTimeout(enforce, 700);
  };
  const bootNavigationMaster = () => {
    if (navigationMasterBooted || !document.body) return false;
    ensureHomeNavigationShell();
    startIosChromeHeroNavigation();
    if (!document.querySelector('.nav-container .nav-pc-container')) return false;
    navigationMasterBooted = true;
    watchForAuthLogo();
    startNavigationMaster();
    window.setTimeout(startNavigationSingletonGuard, 0);
    return true;
  };
  const bootNavigationAfterHydration = () => {
    if (bootNavigationMaster()) return;
    const navigationObserver = new MutationObserver(() => {
      if (!bootNavigationMaster()) return;
      navigationObserver.disconnect();
    });
    navigationObserver.observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootNavigationAfterHydration, { once: true });
  else window.setTimeout(bootNavigationAfterHydration, 0);
})();
/* Load the production navigation cache on every archived page, including auth routes. */
(function () {
  var secureLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if ((location.protocol !== 'https:' && !secureLocalhost) || document.querySelector('script[data-panda-navigation-cache]')) return;
  var script = document.createElement('script');
  script.src = '/shared-pages/navigation-cache-client.js?v=20260907-scroll-release-13';
  script.defer = true;
  script.dataset.pandaNavigationCache = 'true';
  document.head.appendChild(script);
}());
