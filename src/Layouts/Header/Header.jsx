// src/Layouts/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Button from "../../components/common/Button";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Code2,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Bell,
} from "lucide-react";
import "./header.css";

// Simulated notifications
const simulatedNotifications = [
  { id: 1, title: "Welcome to CyberNinja!", body: "Start your first challenge today.", read: false },
  { id: 2, title: "New Lab Released", body: "Try the new Network Scanning Lab in Practice Lab.", read: false },
  { id: 3, title: "Profile Updated", body: "Your profile changes have been saved.", read: true },
];

const Header = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(simulatedNotifications);

  // Define pages that have sidebars (where we should hide main navigation)
  const pagesWithSidebar = [
    "/dashboard",
    "/profile",
    "/learning-paths",
    "/practice-lab",
    "/challenges",
  ];

  // Check if current page has a sidebar
  const hasSidebar = pagesWithSidebar.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Don't show header on login/signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const learnDropdownItems = [
    {
      icon: <BookOpen size={18} />,
      label: "Learning Paths",
      path: "/learning-paths",
    },
    { icon: <Target size={18} />, label: "Challenges", path: "/challenges" },
    { icon: <Code2 size={18} />, label: "Practice Lab", path: "/practice-lab" },
    { icon: <Trophy size={18} />, label: "Leaderboard", path: "/leaderboard" },
  ];

  const educationDropdownItems = [
    {
      icon: <GraduationCap size={18} />,
      label: "For Students",
      path: "/education/students",
    },
    {
      icon: <Users size={18} />,
      label: "For Teachers",
      path: "/education/teachers",
    },
    {
      icon: <Building2 size={18} />,
      label: "For Schools",
      path: "/education/schools",
    },
  ];

  const businessDropdownItems = [
    {
      icon: <Briefcase size={18} />,
      label: "Enterprise Solutions",
      path: "/business/enterprise",
    },
    {
      icon: <Users size={18} />,
      label: "Team Training",
      path: "/business/teams",
    },
    {
      icon: <Trophy size={18} />,
      label: "Certifications",
      path: "/business/certifications",
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const handleBellClick = () => setNotifOpen(true);
  const handleNotifClose = () => setNotifOpen(false);
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

  const userDropdownItems = [
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    {
      icon: (
        <span style={{ position: 'relative' }}>
          <Bell size={18} onClick={handleBellClick} style={{ cursor: 'pointer' }} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -4, background: '#ff3e3e', color: '#fff', borderRadius: '50%', fontSize: 10, width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unreadCount}</span>
          )}
        </span>
      ),
      label: "Notifications",
      onClick: handleBellClick,
    },
    { icon: <LogOut size={18} />, label: "Logout", onClick: handleLogout },
  ];

  // Icon map for mobile drawer
  const iconMap = {
    dashboard: (
      <LayoutDashboard
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    "learning-paths": (
      <BookOpen
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    challenges: (
      <Target
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    "practice-lab": (
      <Code2
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    profile: (
      <User
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    login: (
      <LogOut
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    signup: (
      <User
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
    logout: (
      <LogOut
        size={20}
        style={{ marginRight: "0.75rem" }}
        className="mobile-nav-icon"
      />
    ),
  };

  // Notification Modal
  const NotificationModal = () => (
    notifOpen && (
      <div className="notification-modal-overlay" onClick={handleNotifClose}>
        <div className="notification-modal" onClick={e => e.stopPropagation()}>
          <div className="notification-modal-header">
            <h3>Notifications</h3>
            <button className="notif-close" onClick={handleNotifClose}>&times;</button>
          </div>
          <div className="notification-modal-body">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications yet.</p>
            ) : (
              <ul className="notification-list">
                {notifications.map(n => (
                  <li key={n.id} className={n.read ? "read" : "unread"}>
                    <strong>{n.title}</strong>
                    <p>{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {unreadCount > 0 && (
            <button className="notif-mark-read" onClick={() => { markAllRead(); handleNotifClose(); }}>Mark all as read</button>
          )}
        </div>
      </div>
    )
  );

  return (
    <nav className="navbar navbar-expand-lg fixed-top p-0">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="CyberNinja Logo" />
          <span>
            Cyber<span>Ninja</span>
          </span>
        </Link>

        {/* Hamburger menu button - only show on mobile/tablet */}
        {window.innerWidth < 992 && (
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
          >
            <span style={{ fontSize: "2rem", color: "#fff" }}>&#9776;</span>
          </button>
        )}

        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
          style={window.innerWidth < 992 ? { display: "none" } : {}}
        >
          {/* Left side menu - Hide on pages with sidebar */}
          {!hasSidebar && (
            <ul className="navbar-nav">
              {!user ? (
                // Public menu items
                <>
                  <li className="header-nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Learn <ChevronDown size={16} />
                    </button>
                    <ul className="dropdown-menu">
                      {learnDropdownItems.map((item, index) => (
                        <li key={index}>
                          <Link className="dropdown-item" to={item.path}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="header-nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Education <ChevronDown size={16} />
                    </button>
                    <ul className="dropdown-menu">
                      {educationDropdownItems.map((item, index) => (
                        <li key={index}>
                          <Link className="dropdown-item" to={item.path}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="header-nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Business <ChevronDown size={16} />
                    </button>
                    <ul className="dropdown-menu">
                      {businessDropdownItems.map((item, index) => (
                        <li key={index}>
                          <Link className="dropdown-item" to={item.path}>
                            {item.icon}
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="header-nav-item">
                    <Link className="nav-link" to="/pricing">
                      Pricing
                    </Link>
                  </li>
                </>
              ) : (
                // Authenticated menu items - Only show on pages without sidebar
                <>
                  <li className="header-nav-item">
                    <Link className="nav-link" to="/dashboard">
                      <LayoutDashboard size={18} className="me-1" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="header-nav-item">
                    <Link className="nav-link" to="/learning-paths">
                      <BookOpen size={18} className="me-1" />
                      Learning Paths
                    </Link>
                  </li>
                  <li className="header-nav-item">
                    <Link className="nav-link" to="/challenges">
                      <Target size={18} className="me-1" />
                      Challenges
                    </Link>
                  </li>
                  <li className="header-nav-item">
                    <Link className="nav-link" to="/practice-lab">
                      <Code2 size={18} className="me-1" />
                      Practice Lab
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}

          {/* Right side login/signup or user menu */}
          <ul className="navbar-nav">
            {!user ? (
              // Login/Signup buttons
              <>
                <div className="d-flex gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="md">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="danger" size="md">
                      Join for FREE
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              // User menu
              <li className="header-nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User avatar"
                    className="user-avatar"
                  />
                  <span>{user.displayName || "User"}</span>
                  <ChevronDown size={16} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {userDropdownItems.map((item, index) => (
                    <li key={index}>
                      {item.onClick ? (
                        <button
                          className="dropdown-item"
                          onClick={item.onClick}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ) : (
                        <Link className="dropdown-item" to={item.path}>
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
      <NotificationModal />

      {/* Mobile Drawer Overlay */}
      {drawerOpen && window.innerWidth < 992 && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        >
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <button
              className="drawer-close"
              onClick={() => setDrawerOpen(false)}
            >
              &times;
            </button>
            <nav className="mobile-nav-links">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setDrawerOpen(false)}>
                    {iconMap.dashboard}Dashboard
                  </Link>
                  <Link
                    to="/learning-paths"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {iconMap["learning-paths"]}Learning Paths
                  </Link>
                  <Link to="/challenges" onClick={() => setDrawerOpen(false)}>
                    {iconMap.challenges}Challenges
                  </Link>
                  <Link to="/practice-lab" onClick={() => setDrawerOpen(false)}>
                    {iconMap["practice-lab"]}Practice Lab
                  </Link>
                  <Link to="/profile" onClick={() => setDrawerOpen(false)}>
                    {iconMap.profile}Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDrawerOpen(false);
                    }}
                  >
                    {iconMap.logout}Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setDrawerOpen(false)}>
                    {iconMap.login}Login
                  </Link>
                  <Link to="/signup" onClick={() => setDrawerOpen(false)}>
                    {iconMap.signup}Join for FREE
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
