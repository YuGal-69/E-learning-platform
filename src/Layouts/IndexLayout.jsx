import React, { useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  User,
  Code2,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import Header from "./Header/Header";
import "./Layout.css";

// Custom hook to get window width
function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const IndexLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const menuItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      path: "/learning-paths",
      icon: <BookOpen size={20} />,
      label: "Learning Paths",
    },
    { path: "/practice-lab", icon: <Code2 size={20} />, label: "Practice Lab" },
    { path: "/challenges", icon: <Target size={20} />, label: "Challenges" },
    { path: "/profile", icon: <User size={20} />, label: "Profile" },
  ];

  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        {/* Collapsible Sidebar - only show on desktop */}
        {windowWidth >= 992 && (
          <aside
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
            role="navigation"
            aria-label="Main navigation"
          >
            <button
              className="collapse-button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-nav-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  title={isCollapsed ? item.label : ""}
                  aria-current={
                    location.pathname === item.path ? "page" : undefined
                  }
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main
          className={`main-content ${isCollapsed ? "expanded" : ""}`}
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default IndexLayout;
