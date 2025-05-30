import React from "react";
import Header from "../Layouts/Header/header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <>
    <Header />
    <main style={{ paddingTop: '80px' }}>
      <Outlet />
    </main>

  </>
);

export default PublicLayout;
