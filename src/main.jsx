import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // ✅ Use App here instead of MainRoutes directly

// Import CSS files in the correct order
import "./styles/variables.css"; // Design system variables first
import "./styles/global.css"; // Global styles second
import "./index.css"; // App-specific styles last

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
