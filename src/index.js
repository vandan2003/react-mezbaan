import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux-config/store"
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = "928980168925-ek2i5ljakienabmevg3u1tgkoqtp4vge.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider
    clientId={clientId}
    redirectUri={"https://localhost:3001"}
    scope={['profile', 'email']}
  >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>

);


reportWebVitals();
