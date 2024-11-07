import React  , {useState} from "react";
import { Link , useLocation} from "react-router-dom";
// import "../../styles/RegistrationNavbar.css"; // Ensure the CSS file is correctly imported

const NavBar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleClick = (path) => {
    setSelected(path);
  };

  return (
    <div className="nav-bar">
      <Link
        to="/register"
        className={`nav-link ${selected === "/register" ? "selected" : ""}`}
        onClick={() => handleClick("/register")}
      >
        Student
      </Link>
      <Link
        to="/faculty-register"
        className={`nav-link ${selected === "/faculty-register" ? "selected" : ""}`}
        onClick={() => handleClick("/faculty-register")}
      >
        Faculty
      </Link>
      <Link
        to="/hod-register"
        className={`nav-link ${selected === "/hod-register" ? "selected" : ""}`}
        onClick={() => handleClick("/hod-register")}
      >
        HOD
      </Link>
      <Link
        to="/room-register"
        className={`nav-link ${selected === "/room-register" ? "selected" : ""}`}
        onClick={() => handleClick("/room-register")}
      >
        Room Manager
      </Link>
    </div>
  );
};

export default NavBar;