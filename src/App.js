import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FacultyRegister from "./components/FacultyRegister";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="faculty-register" element={<FacultyRegister />} />
      </Routes>
    </BrowserRouter>
  );
}