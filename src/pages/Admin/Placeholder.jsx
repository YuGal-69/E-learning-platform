import React from "react";
import { useLocation } from "react-router-dom";
import "./Placeholder.css";

const Placeholder = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop().replace(/-/g, " ");

  return (
    <div className="admin-placeholder">
      <h1>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h1>
      <p>This page is under construction. Coming soon!</p>
      <div className="placeholder-icon">🚧</div>
    </div>
  );
};

export default Placeholder;
