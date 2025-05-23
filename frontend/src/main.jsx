import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App.jsx'
import { loadUser } from './utils/authUtils';

// Load user authentication state when app starts
loadUser().then(() => {
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
