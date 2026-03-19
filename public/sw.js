/* Noodrop Service Worker — v5 */
const CACHE = 'noodrop-v5';
const OFFLINE_URL = '/404.html';

// Only cache static assets — never cache HTML pages
const ASSET_CACHE = [
  '/global.css',
  '/data.js',
  '/i18n.js',
  '/firebase-config.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSET_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // HTML pages: always network-first, never serve stale
  if (event.request.headers.get('accept') &&
      event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
