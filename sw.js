const assets = ["index.html", "index.css", "app.js"];
const cache_name = "immo-calc";

self.addEventListener("fetch", (event) => {
  console.log("You fetched " + event.url);
  if (event.request.url === "https://bender42.freeboxos.fr/") {
    // or whatever your app's URL is
    event.respondWith(
      fetch(event.request).catch((err) =>
        self.cache
          .open(cache_name)
          .then((cache) => cache.match("/offline.html"))
      )
    );
  } else {
    event.respondWith(
      fetch(event.request).catch((err) =>
        caches.match(event.request).then((response) => response)
      )
    );
  }
});

self.addEventListener("install", (event) => {
  console.log("Installing...");
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(assets);
      })
      .catch((err) => console.log(err))
  );
});
