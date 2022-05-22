const cacheName = "reactions_v1.0";
const appShellFiles = [
  "./css/animation.css",
  "./css/fonts.css",
  "./css/main.css",
  "./css/position.css",
  "./css/reset.css",
  "./css/responsive.css",
  "./fonts/poppins.ttf",
  "./img/background/panel.svg",
  "./img/background/space.svg",
  "./js/main.js",
  "./js/model.js",
  "./js/utility.js",
  "./sounds/pop1.mp3",
  "./sounds/pop2.mp3",
  "./sounds/whoosh.mp3",
  "./index.html",
];

const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
