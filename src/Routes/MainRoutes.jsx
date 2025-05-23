import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Authentication Components
import Login from "../authentication/login/login";
import Signup from "../authentication/signup/signup";
import Forgot from "../authentication/forgot/forgot";
import ResetPassword from "../authentication/resetPassword/resetPassword";
import ReMail from "../authentication/re-mail/re-mail";


// IndexPage Components
import IndexPage from "../Pages/IndexPage/indexPage";
import Dashboard from "../Pages/Dasboard/dashboard";



const router = createBrowserRouter([
    // Authentication Routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/re-mail",
    element: <ReMail />,
  },

//   IndexPage Routes
  {
    path: "*",
    element: <IndexPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }

]);


const MainRoutes = () => {
  return <RouterProvider router={router} />;
}

export default MainRoutes