const convertedVapidKey = urlBase64ToUint8Array('BLjH8frNmrzod0GT6B0WqBxAwGyFufwgJjERA8Etz21kwi2BdkAXTbDjsyz529e2TP-D6CXwbLXsOB6jxqFx6X0')

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4)
    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

function sendSubscription(subscription, userDetails) {
    const body = { subscription: subscription, userDetails: userDetails }
    return fetch(`http://localhost:9000/notifications/subscribe`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function subscribeUser(userDetails) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
            if (!registration.pushManager) {
                console.log('Push manager unavailable.')
                return
            }

            registration.pushManager.getSubscription().then(function (existedSubscription) {
                if (existedSubscription === null) {
                    console.log('No subscription detected, make a request.')
                    registration.pushManager.subscribe({
                        applicationServerKey: convertedVapidKey,
                        userVisibleOnly: true,
                    }).then(function (newSubscription) {
                        console.log('New subscription added.')
                        sendSubscription(newSubscription, userDetails)
                    }).catch(function (e) {
                        if (Notification.permission !== 'granted') {
                            console.log('Permission was not granted.')
                        } else {
                            console.error('An error ocurred during the subscription process.', e)
                        }
                    })
                } else {
                    console.log('Existed subscription detected.', existedSubscription)
                    sendSubscription(existedSubscription, userDetails)
                }
            })
        })
            .catch(function (e) {
                console.error('An error ocurred during Service Worker registration.', e)
            })
    }
}