/* ═══════════════════════════════════════════════════════════════
   Noodrop Service Worker — v5
   ⚠️  BUMP THIS VERSION STRING ON EVERY DEPLOY
       e.g. noodrop-v5 → noodrop-v6
       This is what triggers cache invalidation for all users.
═══════════════════════════════════════════════════════════════ */
const CACHE = 'noodrop-v5';
const OFFLINE_URL = '/404.html';

// Only static assets are cached — HTML is always fetched fresh.
// Add new static files here if needed (css, js, fonts).
const ASSET_CACHE = [
  '/global.css',
  '/data.js',
  '/i18n.js',
  '/firebase-config.js',
  '/manifest.json'
];

// ── INSTALL: cache assets immediately, skip waiting ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSET_CACHE))
  );
  // Activate new SW immediately without waiting for old tabs to close
  self.skipWaiting();
});

// ── ACTIVATE: delete all old caches, then claim clients ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Tell all open tabs: new version active, reload to get it
        self.clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clients => clients.forEach(c => c.postMessage({ type: 'SW_UPDATED' })));
      })
  );
});

// ── FETCH ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // ── HTML pages: ALWAYS network-first, never serve stale ──
  // This is the key fix — HTML changes on every deploy,
  // serving cached HTML = serving the old site.
  const acceptHeader = event.request.headers.get('accept') || '';
  if (acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // ── Static assets: cache-first, update in background ──
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
      // Return cached immediately, but fetch in background to stay fresh
      return cached || fetchPromise;
    })
  );
});
