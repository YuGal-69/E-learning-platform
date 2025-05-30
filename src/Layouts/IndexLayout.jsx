import React from 'react';
import Header from './Header/header';
import Sidebar from './sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Add your CSS path here

const IndexLayout = () => (
  <div className="layout-container">
    <Header />
    <div className="layout-body">
      <Sidebar className="sidebar" />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  </div>
);

export default IndexLayout;
