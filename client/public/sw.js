//bellow there are listeners and other code related to push notifications

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://localhost:3000/caronas/historico');
    notification.close();
  }
});

self.addEventListener('push', function(e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon: './favicon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'history', title: 'Verificar caronas',
        icon: 'images/checkmark.png'}
    ]
  };

  e.waitUntil(
    self.registration.showNotification('Alguem solicitou uma carona', options)
  );
});