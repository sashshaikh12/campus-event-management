import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./RegistrationNavbar";


export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [year, setYear] = React.useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }   
    if (!password) newErrors.password = "Password is required";
    if (!department) newErrors.department = "Department is required";
    if (!phone) {
        newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone)) {
        newErrors.phone = "Invalid phone number format";
    }
    if (!address) newErrors.address = "Address is required";
    if (!year) newErrors.year = "Year is required";
    if (isNaN(phone)) newErrors.phone = "Phone number must be a number";
    return newErrors;
  };

  const collectData = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const reqbody = { name, email, password, department, phone, address, year };
    console.warn(reqbody);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", result);
    if (result) {
      navigate("/studentdash");
    }
  };

  return (
    <div>
      <NavBar className="NavBarWrapper"/>
      <form className="login">
        <h1>Register</h1>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          className="LoginInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="email"
          id="Email"
          placeholder="Enter your E-mail ID"
          className="LoginInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="form-row">
          <div className="form-group">
            <select
              id="department"
              className="LoginInput"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="" disabled>
                Department
              </option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
            {errors.department && <p className="error">{errors.department}</p>}
          </div>
          
          <div className="form-group">
          <select
              id="year"
              className="LoginInput"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
          >
                  <option value="" disabled>
                      Year
                  </option>
                  <option value="1st Year">1</option>
                  <option value="2nd Year">2</option>
                  <option value="3rd Year">3</option>
                  <option value="4th Year">4</option>
              </select>
              {errors.year && <p className="error">{errors.year}</p>}
          </div>
        </div>
        <input
              type="phone"
              id="Phone"
              placeholder="Enter your Phone number"
              className="LoginInput"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
        <input
          type="text"
          id="address"
          placeholder="Enter your address"
          className="LoginInput"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        {errors.address && <p className="error">{errors.address}</p>}
        <input
          type="password"
          id="password"
          autoComplete="on"
          placeholder="Enter your password"
          className="LoginInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          {errors.password && <p className="error">{errors.password}</p>}
        <button type="button" onClick={collectData} className="SubmitButton">
          SUBMIT
        </button>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}