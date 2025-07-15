import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Authentication Components
import Login from "../authentication/login/Login";
import Signup from "../authentication/signup/Signup";
import Forgot from "../authentication/forgot/Forgot";
import ResetPassword from "../authentication/resetPassword/ResetPassword";
import ReMail from "../authentication/re-mail/ReMail";
import PrivateRoute from "../authentication/PrivateRoute";
import AdminRoute from "../authentication/AdminRoute";
import AdminLogin from "../authentication/admin/AdminLogin";
import AdminSetup from "../authentication/admin/AdminSetup";

// Layouts
import IndexLayout from "../Layouts/IndexLayout"; // Header + Sidebar
import PublicLayout from "../Layouts/PublicLayout"; // Header only
import AdminLayout from "../Layouts/AdminLayout";

// Pages
import HomePage from "../pages/HomePage/HomePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import LearningPaths from "../pages/LearningPaths/LearningPaths";
import PracticeLab from "../pages/PracticeLab/PracticeLab";
import ChallengePage from "../pages/Challenge/ChallengePage";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import CourseList from "../pages/Admin/Courses/CourseList";
import CourseForm from "../pages/Admin/Courses/CourseForm";
import Placeholder from "../pages/Admin/Placeholder";
import AdminSettings from "../pages/Admin/Settings/AdminSettings";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot", element: <Forgot /> },
      { path: "/resetpassword", element: <ResetPassword /> },
      { path: "/re-mail", element: <ReMail /> },
      { path: "/admin/login", element: <AdminLogin /> },
      { path: "/admin/setup", element: <AdminSetup /> },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <IndexLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/learning-paths", element: <LearningPaths /> },
      { path: "/practice-lab", element: <PracticeLab /> },
      { path: "/challenges", element: <ChallengePage /> },
      { path: "/challenges/:id", element: <ChallengePage /> },
    ],
  },
  {
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/courses", element: <CourseList /> },
      { path: "/admin/courses/create", element: <CourseForm /> },
      { path: "/admin/courses/:id/edit", element: <CourseForm /> },
      { path: "/admin/users", element: <Placeholder /> },
      { path: "/admin/users/:id", element: <Placeholder /> },
      { path: "/admin/challenges", element: <Placeholder /> },
      { path: "/admin/challenges/create", element: <Placeholder /> },
      { path: "/admin/analytics", element: <Placeholder /> },
      {
        path: "/admin/settings",
        element: (
          <AdminRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </AdminRoute>
        ),
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
