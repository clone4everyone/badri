import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from "./redux/store.js"; // Only import store
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
