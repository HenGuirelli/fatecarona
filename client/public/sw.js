//bellow there are listeners and other code related to push notifications

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  if (e.action !== 'close') {
    clients.matchAll().then( client => {
      console.log(clients);
      client[0].focus();
    });
    clients.openWindow('/caronas/historico');
  }

  notification.close();
});

self.addEventListener('push', function(e) {
  var body;

  if (e.data) {
    body = JSON.parse(e.data.text());
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body.msg,
    icon: "http://192.168.0.100:8080/images/" + body.img, //Cannot use external config file =/
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  e.waitUntil(
    self.registration.showNotification('', options)
  );
});
