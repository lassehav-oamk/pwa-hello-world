var CACHE_VERSION = 'app-v2';
var CACHE_FILES = [
    '/',
    'page2.html',
    
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('activate');
    console.log(event);
});

self.addEventListener('fetch', function (event) {
    console.log('fetch');
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            if(response)
            {
                console.log('cache match');
                return response;
            }            
            else
            {
                return fetch(event.request);
            }
        })        
    );
    // return something for each interception
});