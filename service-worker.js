importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

  workbox.precaching.precacheAndRoute([
    {url:'/', revision: '7'},
    {url:'/index.html', revision: '7'},
    {url:'/matches.html', revision: '7'},
    {url:'/nav.html', revision: '7'},
    {url:'/manifest.json', revision: '7'},
    {url:'/push.js', revision: '7'},
    {url:'/regis-sw.js', revision: '7'},
    {url:'/js/idb.js', revision: '7'},
    {url:'/js/db.js', revision: '7'},
    {url:'/js/api.js', revision: '7'},
    {url:'/js/date.js', revision: '7'},
    {url:'/js/materialize.min.js', revision: '7'},
    {url:'/js/nav.js', revision: '7'},
    {url:'/css/materialize.min.css', revision: '7'},
    {url:'/images/icon.png', revision: '7'},
    {url:'/images/icon(72).png', revision: '7'},
    {url:'/images/icon(96).png', revision: '7'},
    {url:'/images/icon(128).png', revision: '7'},
    {url:'/images/icon(144).png', revision: '7'},
    {url:'/images/icon(192).png', revision: '7'},
    {url:'/images/icon(256).png', revision: '7'},
    {url:'/images/icon(384).png', revision: '7'},
    {url:'/images/notfound.png', revision: '1'},

  ],{
    //Ignore all URL parameters.
  ignoreUrlParametersMatching:[/.*/]
  });
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'FetchApi'
    })
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "ligaCempion"
    })
  );

  self.addEventListener('push', event => {
    var body;
    if(event.data){
      body = event.data.text();
    }
    else{
      body = 'Push message no payload';
    }

    var options = {
      body: body,
      icon: 'images/icon.png',
      vibrate:[100, 50, 100],
      data: {
        dateofArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });