
self.addEventListener('install', function (event) {
  //added to prevent manually clicking "skipWaiting" when sw was updated  
  self.skipWaiting();
});


self.addEventListener('push', function(e) {
  var options = {
    body: e.data.text(),
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'close', title: 'Close',
        },
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Welcome to Work-Life-Balancer', options)
  );
});


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  var action = event.action;
  console.log(action)

  if(action==='close'){
    event.notification.close();
  }
  else{
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == 'http://localhost:3000' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('http://localhost:3000');
  }));
}

});



