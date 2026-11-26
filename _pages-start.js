(async () => {
  const entries = JSON.parse(document.getElementById('pages-entries').textContent);
  const mobile = /iPhone|iPad|Android|Mobile/i.test(navigator.userAgent);
  const selected = entries[mobile && entries.length === 2 ? 1 : 0];
  for (const url of selected?.preload || []) {
    const filename = new URL(url, location.href).pathname;
    const link = document.createElement('link');
    link.href = url;
    if (filename.endsWith('.js')) {
      link.crossOrigin = 'anonymous';
      link.rel = 'modulepreload';
    } else {
      link.rel = 'preload';
      link.as = filename.endsWith('.css') ? 'style' : 'image';
    }
    document.head.appendChild(link);
  }

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
    // The original document is already in this response. Mount it at the
    // existing route as soon as resource routing is ready, without a reload.
    const html = selected?.html || await fetch(location.href).then(response => {
      if (!response.ok) throw new Error('Entry request failed');
      return response.text();
    });
    document.open();
    document.write(html);
    document.close();
  } catch {
    const link = document.createElement('a');
    link.href = 'https://e1fc82ea.zhangqinkang.pages.dev' + location.pathname + location.search + location.hash;
    link.textContent = '打开首发作品集';
    document.body.append(link);
  }
})();
