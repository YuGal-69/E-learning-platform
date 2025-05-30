import React from 'react';
import './SideBar.css';

const SideBar = () => (
  <div className="sidebar">
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/learn">Learn</a></li>
      <li><a href="/challenges">Challenges</a></li>
    </ul>
  </div>
);

export default SideBar;
