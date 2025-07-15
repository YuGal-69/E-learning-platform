import React from "react";
import Header from "./Header/header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default PublicLayout;
