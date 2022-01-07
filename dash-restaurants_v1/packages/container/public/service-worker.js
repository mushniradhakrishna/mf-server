/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
//importScripts("./idb.js");
const STATIC_FILES = [`/packages/container/build/index.html`];

/*let dbPromise = idb.open("post-store", 1, function (db) {
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
});*/

//Fetching data from api and storing to indexedDB
/*fetch("https://jsonplaceholder.typicode.com/posts")
  .then(function (response) {
    let fetchRequest = response.clone();
    fetchRequest.json().then(function (data) {
      dbPromise.then(function (db) {
        let tx = db.transaction("posts", "readwrite");
        let store = tx.objectStore("posts");
        for (var key in data) {
          store.put(data[key]);
          console.log("data storing to indexedDB", data[key]);
        }
        return tx.complete;
      });
    });
  })
  .catch(function () {
    console.log("Error occured while fetching data response at the end");
  });

//Fetching data from indexedDB
dbPromise.then(function (db) {
  let tx = db.transaction("posts", "readonly");
  let store = tx.objectStore("posts");
  store.getAll().then(function (data) {
    for (var key in data) {
      console.log("From indexedDB", data[key]);
    }
  });
});

readAllData("posts");*/

const CACHE_NAME = 'dash';
// Version 0.6.5
self.addEventListener('install', (e) => {
	console.log('installing service worker!!');
	const timeStamp = Date.now();
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(STATIC_FILES).then(() => self.skipWaiting());
		}),
	);
});

self.addEventListener('activate', (event) => {
	console.log('activating service worker');
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
	//  console.log(`fetching ${event.request.url}`);
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// IMPORTANT: Clone the request. A request is a stream and
			// can only be consumed once. Since we are consuming this
			// once by cache and once by the browser for fetch, we need
			// to clone the response.
			var fetchRequest = event.request.clone();

			return fetch(fetchRequest)
				.then(function (response) {
					// Check if we received a valid response
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}

					// IMPORTANT: Clone the response. A response is a stream
					// and because we want the browser to consume the response
					// as well as the cache consuming the response, we need
					// to clone it so we have two streams.
					var responseToCache = response.clone();

					caches.open(CACHE_NAME).then(function (cache) {
						cache.put(event.request, responseToCache);
					});

					return response;
				})
				.catch(() => {
					if (response) {
						return response;
					}
				});
		}),
	);
});
