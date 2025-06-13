import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Authentication Components
import Login from "../authentication/login/login";
import Signup from "../authentication/signup/signup";
import Forgot from "../authentication/forgot/forgot";
import ResetPassword from "../authentication/resetPassword/resetPassword";
import ReMail from "../authentication/re-mail/re-mail";
import PrivateRoute from "../authentication/PrivateRoute";

import IndexLayout from "../Layouts/IndexLayout"; // Header + Sidebar
import PublicLayout from "../Layouts/PublicLayout"; // Header only

// Pages
import HomePage from "../pages/HomePage/homePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import LearningPaths from "../pages/LearningPaths/LearningPaths";
import PracticeLab from "../pages/PracticeLab/PracticeLab";
import ChallengePage from "../Pages/Challenge/ChallengePage";

const router = createBrowserRouter([
  {
    element: <PublicLayout />, // Public layout with header only
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot", element: <Forgot /> },
      { path: "/resetpassword", element: <ResetPassword /> },
      { path: "/re-mail", element: <ReMail /> },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <IndexLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/learning-paths",
        element: <LearningPaths />,
      },
      {
        path: "/practice-lab",
        element: <PracticeLab />,
      },
      {
        path: "/challenges",
        element: <ChallengePage />,
      },
      {
        path: "/challenges/:id",
        element: <ChallengePage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Page Not Found</div>,
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
