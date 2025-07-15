import React from "react";
import Header from "./Header/Header";
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
