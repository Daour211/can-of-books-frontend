import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId= {process.env.REACT_APP_CLIENTID}
    // domain='dev--wn3kj7b.eu.auth0.com'
    // clientId= 'zH4zHZiKKvAQWqZnw98CmwLVN8gxu90F'
    redirectUri={window.location.origin}
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);
