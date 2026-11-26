importScripts('/_pages-config.js');

const { routes, css, external, origin } = self.releaseConfig;
const externalAssets = new Set(external);
const projectRoutes = new Map([
  ['/', 'home'],
  ['/index.html', 'home'],
  ['/projects/pandaai', 'panda'],
  ['/projects/llm', 'llm'],
  ['/projects/tqx', 'tqx'],
  ['/projects/taskboard', 'taskboard'],
]);

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(serve(request));
  }
});

async function serve(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  if (path === '/__pages_ready') {
    return new Response(null, { status: 204, headers: { 'X-Portfolio-Pages': 'e16a4ed' } });
  }
  if (request.method === 'POST' && /^\/__panda_/.test(path)) {
    return new Response(null, { status: 204 });
  }
  if (!['GET', 'HEAD'].includes(request.method)) return fetch(request);

  const userAgent = request.headers.get('User-Agent') || navigator.userAgent;
  const mobile = /iPhone|iPad|Android|Mobile/i.test(userAgent);
  const project = projectRoutes.get(path) || projectRoutes.get(path.replace(/\/index\.html$/, ''));
  if (project) {
    const entry = project === 'tqx' ? project : project + (mobile ? '-mobile' : '-desktop');
    return sameOriginAsset(routes[entry], request);
  }
  if (path === '/panda-live' || path === '/panda-live/index.html') {
    const fit = url.searchParams.get('full-fit');
    const sourceMobile = url.searchParams.get('embed') === 'source-mobile';
    if (fit === '2') return sameOriginAsset(routes[sourceMobile ? 'panda-fit-mobile' : 'panda-fit-desktop'], request);
    if (fit === '1') return sameOriginAsset(routes['panda-fit-legacy'], request);
    return sameOriginAsset('/__entries/static-panda-live-index.html', request);
  }
  if (Object.hasOwn(css, path)) {
    const referrer = request.referrer ? new URL(request.referrer) : null;
    if (url.searchParams.get('__panda_fit') === '2' || referrer?.searchParams.get('full-fit') === '2') {
      const narrow = url.searchParams.get('__panda_width') === '390' || referrer?.searchParams.get('embed') === 'source-mobile';
      return sameOriginAsset(css[path][narrow ? '390' : '1920'], request);
    }
  }
  if (externalAssets.has(url.pathname) ||
      /^\/(hk(?:\/|$)|en(?:\/|$)|docs(?:\/|$)|agent_quant(?:\/|$)|tqx(?:-|\.|Api))/.test(path)) {
    return originalAsset(url, request);
  }
  const result = await fetch(request);
  if (result.status === 404 && path.startsWith('/_nuxt/')) return originalAsset(url, request);
  return result;
}

async function sameOriginAsset(path, request) {
  return copyResponse(await fetch(new URL(path, self.location.origin), { method: request.method }));
}

async function originalAsset(url, request) {
  const headers = new Headers();
  const range = request.headers.get('Range');
  if (range) headers.set('Range', range);
  const upstream = new URL(origin);
  upstream.pathname = url.pathname;
  upstream.search = url.search;
  const response = await fetch(upstream, { method: request.method, headers, credentials: 'omit' });
  return copyResponse(response);
}

function copyResponse(response) {
  // Use the request URL as the document and style base. Fetch has already decoded the body.
  const headers = new Headers(response.headers);
  if (headers.has('Content-Encoding')) {
    headers.delete('Content-Encoding');
    headers.delete('Content-Length');
  }
  return new Response(response.body, { status: response.status, headers });
}
