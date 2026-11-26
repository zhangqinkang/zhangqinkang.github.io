(async () => {
  const status = document.getElementById('status');
  try {
    if (!navigator.serviceWorker) throw new Error('Service workers unavailable');
    if (document.currentScript?.hasAttribute('data-fallback') &&
        !/^\/(hk(?:\/|$)|en(?:\/|$)|docs(?:\/|$)|agent_quant(?:\/|$)|tqx(?:-|\.|Api))/.test(location.pathname)) {
      throw new Error('Unknown entry');
    }
    await navigator.serviceWorker.register('/_pages-worker.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise(resolve => {
        navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
        if (navigator.serviceWorker.controller) resolve();
      });
    }
    const confirmation = await fetch('/__pages_ready');
    if (confirmation.headers.get('X-Portfolio-Pages') !== 'e16a4ed') {
      throw new Error('Service worker did not take control');
    }
    location.reload();
  } catch {
    status.textContent = '当前浏览器无法初始化展示页面。';
    const link = document.createElement('a');
    link.href = 'https://e1fc82ea.zhangqinkang.pages.dev' + location.pathname + location.search + location.hash;
    link.textContent = '打开首发作品集';
    status.append(' ', link);
  }
})();
