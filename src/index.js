import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Add Telegram WebApp script
const script = document.createElement('script');
script.src = 'https://telegram.org/js/telegram-web-app.js';
script.async = true;
document.body.appendChild(script);

script.onload = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};