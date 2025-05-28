// src/Layouts/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => (
  <nav
      className="navbar navbar-expand-lg p-0 m-0 fixed-top"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand ms-2 d-flex align-items-center" href="/">
          <img
            src="/logo.png" // Adjust your path accordingly
            alt="CyberNinja Logo"
            className="img-fluid"
            style={{ maxWidth: '70px' }}
          />
          <span className="text-white fs-4 ms-2">
            Cyber<span className="text-danger">Ninja</span>
          </span>
        </a>

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
          <i className="fa-solid fa-bars-staggered text-white"></i>
        </button>

        {/* Navbar links */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          {/* Left side menu */}
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <a className="nav-link text-white" href="#learn-section">
                Learn
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link text-white" href="#">
                Compete
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link text-white" href="#">
                For Education
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link text-white" href="#">
                For Business
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link text-white" href="/pricing">
                Pricing
              </a>
            </li>
          </ul>

          {/* Right side login/signup */}
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <a className="nav-link text-white" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-danger text-white px-3"
                href="/signup"
                style={{ borderRadius: '20px' }}
              >
                Join for FREE
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
);

export default Header;
