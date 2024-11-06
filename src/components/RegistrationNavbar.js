import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegistrationNavbar.css"; // Ensure the CSS file is correctly imported

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/register" className="nav-link">Student</Link>
      <Link to="/faculty-register" className="nav-link">Faculty</Link>
      <Link to="/hod-register" className="nav-link">HOD</Link>
      <Link to="/room-register" className="nav-link">Room Manager</Link>
    </div>
  );
};

export default NavBar;