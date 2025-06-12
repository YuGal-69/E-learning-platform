import React from 'react';
import Header from './Header/header';
import Sidebar from './sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Add your CSS path here

const IndexLayout = () => (
  <div className="layout-container">
    <Header />
    <Outlet />
  </div>
);

export default IndexLayout;
