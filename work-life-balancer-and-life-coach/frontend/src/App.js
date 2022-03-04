import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
const webpush = require('web-push');

function App() {

  useEffect(() => {
    const validKeys = webpush.generateVAPIDKeys();
    console.log("WEB-PUSH", validKeys);

    askForNotificationPermission();
  }, [])

  const askForNotificationPermission = () => {
    window.Notification.requestPermission(function (result) {
      console.log('User Choice', result);
      if (result !== 'granted') {
        console.log('No notification permission granted!');
      } else {
        console.log('Permission granted !');
      }
    });
  }

  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
