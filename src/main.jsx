import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getLightMode } from './utilities/LightMode';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/custom.scss';

const html = document.documentElement;
// Set light mode
html.setAttribute('data-bs-theme', getLightMode());

// Set height values on html parent elements
html.style.height = '100%';
html.style.overflow = 'none';
document.getElementById('root').style.height = '100%';
document.body.style.height = '100%';

// Initalize root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
