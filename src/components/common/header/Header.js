import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const AppHeader = ({ authenticated, onLogin, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  const navigate = useNavigate();

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

    // 메인 페이지("/")로 이동
    navigate("/");
  };

  const headerStyle = {
    background:
      "linear-gradient(to bottom, #B4D5ED , rgba(255, 255, 255, 0.8))",
    height: "150px",
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
                  <a onClick={handleLogout}>LogOut</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login">SignIn</NavLink>
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
