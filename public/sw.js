/* Noodrop Service Worker – v1 */
const CACHE = 'noodrop-v1';
const OFFLINE_URL = '/404.html';

const PRECACHE = [
  '/landing.html',
  '/index.html',
  '/stack.html',
  '/marketplace.html',
  '/global.css',
  '/data.js',
  '/manifest.json',
  OFFLINE_URL
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
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
  // Only cache same-origin requests
  if (url.origin !== location.origin) return;

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
