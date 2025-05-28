import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Use App here instead of MainRoutes directly

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
