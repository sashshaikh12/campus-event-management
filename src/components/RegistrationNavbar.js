import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegistrationNavbar.css"; // Ensure the CSS file is correctly imported

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/register" className="nav-link">Student Register</Link>
      <Link to="/faculty-register" className="nav-link">Faculty Register</Link>
    </div>
  );
};

export default NavBar;