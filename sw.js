const CACHE_NAME = "reactions_v1.0",
  urlsToCache = [
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
    "./img/icons/reset.svg",
    "./img/icons/snowbot.svg",
    "./img/icons/water.svg",
    "./img/icons/wind.svg",
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
    "./img/logos/pwa/favicon.svg",
    "./img/logos/pwa/reactions.svg",
    "./img/portraits/1.jpg",
    "./img/portraits/2.jpg",
    "./img/portraits/3.jpg",
    "./img/portraits/4.jpg",
    "./img/portraits/5.jpg",
    "./img/portraits/6.jpg",
    "./img/portraits/7.jpg",
    "./img/portraits/8.jpg",
    "./img/portraits/9.jpg",
    "./img/portraits/10.jpg",
    "./img/portraits/11.jpg",
    "./img/portraits/12.jpg",
    "./img/portraits/13.jpg",
    "./img/portraits/14.jpg",
    "./img/portraits/15.jpg",
    "./img/portraits/16.jpg",
    "./img/portraits/17.jpg",
    "./img/portraits/18.jpg",
    "./img/portraits/19.jpg",
    "./img/portraits/20.jpg",
    "./img/portraits/21.jpg",
    "./img/portraits/22.jpg",
    "./img/portraits/23.jpg",
    "./img/portraits/24.jpg",
    "./img/portraits/25.jpg",
    "./img/portraits/26.jpg",
    "./img/portraits/27.jpg",
    "./img/portraits/28.jpg",
    "./img/portraits/29.jpg",
    "./img/portraits/30.jpg",
    "./img/portraits/31.jpg",
    "./img/portraits/32.jpg",
    "./img/portraits/33.jpg",
    "./img/portraits/34.jpg",
    "./img/portraits/35.jpg",
    "./img/portraits/36.jpg",
    "./img/portraits/37.jpg",
    "./img/portraits/38.jpg",
    "./img/portraits/39.jpg",
    "./img/portraits/40.jpg",
    "./img/portraits/41.jpg",
    "./img/portraits/42.jpg",
    "./img/portraits/43.jpg",
    "./img/portraits/44.jpg",
    "./img/portraits/45.jpg",
    "./img/portraits/46.jpg",
    "./img/portraits/47.jpg",
    "./img/portraits/48.jpg",
    "./img/portraits/49.jpg",
    "./img/portraits/50.jpg",
    "./img/portraits/51.jpg",
    "./img/portraits/52.jpg",
    "./img/portraits/53.jpg",
    "./img/portraits/54.jpg",
    "./img/portraits/55.jpg",
    "./img/portraits/56.jpg",
    "./img/portraits/57.jpg",
    "./img/portraits/58.jpg",
    "./img/portraits/59.jpg",
    "./img/portraits/60.jpg",
    "./img/portraits/61.jpg",
    "./img/portraits/62.jpg",
    "./img/portraits/63.jpg",
    "./img/portraits/64.jpg",
    "./img/portraits/65.jpg",
    "./img/portraits/66.jpg",
    "./img/portraits/67.jpg",
    "./img/portraits/68.jpg",
    "./img/portraits/69.jpg",
    "./img/portraits/70.jpg",
    "./img/portraits/71.jpg",
    "./img/portraits/72.jpg",
    "./img/portraits/73.jpg",
    "./img/portraits/74.jpg",
    "./img/portraits/75.jpg",
    "./img/portraits/76.jpg",
    "./img/portraits/77.jpg",
    "./img/portraits/78.jpg",
    "./img/portraits/79.jpg",
    "./img/portraits/80.jpg",
    "./img/portraits/81.jpg",
    "./img/portraits/82.jpg",
    "./img/portraits/83.jpg",
    "./img/portraits/84.jpg",
    "./img/portraits/85.jpg",
    "./img/portraits/86.jpg",
    "./img/portraits/87.jpg",
    "./img/portraits/88.jpg",
    "./img/portraits/89.jpg",
    "./img/portraits/90.jpg",
    "./img/portraits/91.jpg",
    "./img/portraits/92.jpg",
    "./img/portraits/93.jpg",
    "./img/portraits/94.jpg",
    "./img/portraits/95.jpg",
    "./img/portraits/96.jpg",
    "./img/portraits/97.jpg",
    "./img/portraits/98.jpg",
    "./img/portraits/99.jpg",
    "./img/portraits/100.jpg",
    "./img/portraits/101.jpg",
    "./img/portraits/102.jpg",
    "./img/portraits/103.jpg",
    "./img/portraits/104.jpg",
    "./img/portraits/105.jpg",
    "./img/portraits/106.jpg",
    "./img/portraits/107.jpg",
    "./img/portraits/108.jpg",
    "./img/portraits/109.jpg",
    "./img/portraits/110.jpg",
    "./img/portraits/111.jpg",
    "./img/portraits/112.jpg",
    "./img/portraits/default.jpg",
    "./js/main.js",
    "./js/model.js",
    "./js/sw.js",
    "./js/utility.js",
    "./sounds/pop1.mp3",
    "./sounds/pop2.mp3",
    "./sounds/whoosh.mp3",
    "./index.html",
  ];

// Storage all the files in cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Error when trying to register cache", err))
  );
});

// Look for resources to work without connection
self.addEventListener("activate", (e) => {
  const CACHE_WHITELIST = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.map((cacheName) => {
        // Delete useless data in cache
        if (CACHE_WHITELIST.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      });
    })
    .then(() => self.clients.claim())
  );
});

// If there are any connection and detect new changes will refresh everything
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                // Recover data from cache
                return res;
            }
            return fetch(e.request);
        })
    )
});
