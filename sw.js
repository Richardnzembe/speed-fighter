const CACHE_NAME = "speed-fighter-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",

  // icons (adjust paths to your actual icons)
  "./icons/icon-72x72.png",
  "./icons/icon-192x192.png",

  // all assets folder (images, sounds, etc.)
  "./assets/"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached file, or fallback to index.html if not found
      return response || caches.match("./index.html");
    })
  );
});
