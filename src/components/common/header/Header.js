import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const AppHeader = ({ authenticated, onLogin, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  useEffect(() => {
    setIsAuthenticated(authenticated);
  }, [authenticated]);

  const handleLogin = () => {
    onLogin();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    onLogout();
    setIsAuthenticated(false);
  };

  const headerStyle = {
    background: "linear-gradient(to bottom, #B5E8EE, rgba(255, 255, 255, 0.8))",
  };

  return (
    <header className="app-header" style={headerStyle}>
      <div className="container">
        <div className="app-branding">
          <Link to="/" className="app-title">
            Mood Canvas
          </Link>
        </div>
        <div className="app-options">
          <nav className="app-nav">
            {isAuthenticated ? (
              <ul>
                <li>
                  <NavLink to="/myPage">Record</NavLink>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login">login</NavLink>
                </li>
                <li>
                  <NavLink to="/quill">Quill</NavLink>
                </li>
                <li></li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
