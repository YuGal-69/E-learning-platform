// src/Layouts/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import Button from "../../components/common/Button";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Code2,
  Trophy,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  User,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
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

  const userDropdownItems = [
    { icon: <User size={18} />, label: "Profile", path: "/profile" },
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      path: "/notifications",
    },
    { icon: <LogOut size={18} />, label: "Logout", onClick: handleLogout },
  ];

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

        {/* Hamburger menu button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars-staggered"></i>
        </button>

        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          {/* Left side menu */}
          <ul className="navbar-nav">
            {!user ? (
              // Public menu items
              <>
                <li className="nav-item dropdown">
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
                <li className="nav-item dropdown">
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
                <li className="nav-item dropdown">
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
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              // Authenticated menu items
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <LayoutDashboard size={18} className="me-1" />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/learning-paths">
                    <BookOpen size={18} className="me-1" />
                    Learning Paths
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/challenges">
                    <Target size={18} className="me-1" />
                    Challenges
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/practice-lab">
                    <Code2 size={18} className="me-1" />
                    Practice Lab
                  </Link>
                </li>
              </>
            )}
          </ul>

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
              <li className="nav-item dropdown">
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
    </nav>
  );
};

export default Header;
