// Name of the current version of app
const cacheName = "reactions_v1.0";

// All the files we want to storage in cache to work offline
const appShellFiles = [
  "./",
  "./index.html",
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
  "./img/pwa/icons/reactions_icon_32x32.png",
  "./img/pwa/icons/reactions_icon_48x48.png",
  "./img/pwa/icons/reactions_icon_64x64.png",
  "./img/pwa/icons/reactions_icon_72x72.png",
  "./img/pwa/icons/reactions_icon_96x96.png",
  "./img/pwa/icons/reactions_icon_128x128.png",
  "./img/pwa/icons/reactions_icon_144x144.png",
  "./img/pwa/icons/reactions_icon_192x192.png",
  "./img/pwa/icons/reactions_icon_256x256.png",
  "./img/pwa/icons/reactions_icon_384x384.png",
  "./img/pwa/icons/reactions_icon_512x512.png",
  "./img/pwa/screenshots/battle_computer.webp",
  "./img/pwa/screenshots/battle_mobile.webp",
  "./img/pwa/screenshots/start_computer.webp",
  "./img/pwa/screenshots/start_mobile.webp",
  "./img/pwa/screenshots/finish_computer.webp",
  "./img/pwa/screenshots/finish_mobile.webp",
  "./js/main.js",
  "./js/model.js",
  "./js/utility.js",
  "./img/portraits/default.webp",
];

function addImagesToArray(array, totalNumber) {
  const portraits = [];
  for (let i = 1; i <= totalNumber; i++) {
    portraits.push("./img/portraits/" + i + ".webp");
  }
  return array.concat(portraits);
}

// Merge of images to current cache storage
const contentToCache = addImagesToArray(appShellFiles, 50);

// Installation of service-workers
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })()
  );
});

// Delete old cache
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetching all data
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
