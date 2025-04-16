
const CACHE_NAME = 'notepad-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.css',
  '/reset.css',
  '/script.js',
  '/login.js',
  '/firebase-config.js',
  '/img/filter-list.png',
  '/img/mainlogo.png',
  '/img/man.png',
  '/img/pencil.png',
  '/img/search.png',
  '/img/trash.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
