import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Target,
  BarChart2,
  Settings,
  Menu,
  X,
} from "lucide-react";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Courses",
      path: "/admin/courses",
    },
    {
      icon: <Users size={20} />,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: <Target size={20} />,
      label: "Challenges",
      path: "/admin/challenges",
    },
    {
      icon: <BarChart2 size={20} />,
      label: "Analytics",
      path: "/admin/analytics",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1>Admin Panel</h1>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <h2>
            {navItems.find((item) => item.path === location.pathname)?.label ||
              "Admin Panel"}
          </h2>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
