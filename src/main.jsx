import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { getLightMode } from './utilities/LightMode';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/custom.scss';

// Set light mode
const html = document.documentElement;
html.setAttribute('data-bs-theme', getLightMode());

// Set height values on html parent elements
html.style.height = '100%';
html.style.overflow = 'hidden';
document.getElementById('root').style.height = '100%';

// Initalize root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_REACT_DOMAIN}
      clientId={import.meta.env.VITE_REACT_CLIENT}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/gossyp/`,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
