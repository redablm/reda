import React from 'react';
import ReactDOM from 'react-dom/client'; // Notez l'utilisation de createRoot
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Utilisation de createRoot
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
