import React from 'react';
import ReactDOM from 'react-dom/client'; // Notez l'utilisation de createRoot
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Importation de BrowserRouter
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Utilisation de createRoot
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
