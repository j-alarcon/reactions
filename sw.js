// Name of the current version of app
const cacheName = "reactions_v1.0";

// All the files we want to storage in cache to work offline
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
  "./img/icons/blizzard.svg",
  "./img/icons/explosion.svg",
  "./img/icons/fire.svg",
  "./img/icons/heat-wave.svg",
  "./img/icons/hurricane.svg",
  "./img/icons/ice.svg",
  "./img/icons/machine.svg",
  "./img/icons/snowbot.svg",
  "./img/icons/water.svg",
  "./img/icons/wind.svg",
  "./img/icons/reset.svg",
  "./img/logos/favicon.svg",
  "./img/logos/reactions.svg",
  "./img/logos/pwa/reactions_icon_32x32.png",
  "./img/logos/pwa/reactions_icon_48x48.png",
  "./img/logos/pwa/reactions_icon_64x64.png",
  "./img/logos/pwa/reactions_icon_72x72.png",
  "./img/logos/pwa/reactions_icon_96x96.png",
  "./img/logos/pwa/reactions_icon_128x128.png",
  "./img/logos/pwa/reactions_icon_192x192.png",
  "./img/logos/pwa/reactions_icon_256x256.png",
  "./img/logos/pwa/reactions_icon_384x384.png",
  "./img/logos/pwa/reactions_icon_512x512.png",
  "./js/main.js",
  "./js/model.js",
  "./js/utility.js",
  "./sounds/pop1.mp3",
  "./sounds/pop2.mp3",
  "./sounds/whoosh.mp3",
  "./index.html",
  "./img/portraits/default.jpg",
];

function addImagesToArray(array, totalNumber){
  const portraits = [];
  for (let i = 1; i <= totalNumber; i++) {
    portraits.push("./img/portraits/" + i + ".jpg");
  }
  return array.concat(portraits)
}

// Merge of images to current cache storage
const contentToCache = addImagesToArray(appShellFiles, 50);

// Installation of service-workers
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

// Fetching all data
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