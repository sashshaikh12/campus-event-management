import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; 

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handlelogin = async () => {
    console.warn(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      result = await result.json();
      console.warn(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <form className="login">
      <h1>SIGN IN</h1>
      <input
        type="email"
        id="Email"
        placeholder="Enter your E-mail ID"
        className="LoginInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
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
      <button type="button" onClick={handlelogin} className="SubmitButton">
        SUBMIT
      </button>
      <p>
        Don't have an account? <a href="register">Register</a>
      </p>
    </form>
  );
};

export default Login;