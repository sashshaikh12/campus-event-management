import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import FacultyRegister from "./components/LoginRegister/FacultyRegister";
import HODRegister from "./components/LoginRegister/HODRegister";
import RoomRegister from "./components/LoginRegister/RoomRegister";
import StudentDash from "./components/Dashboard/studentDash";
import HODDash from "./components/Dashboard/HODDash";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="faculty-register" element={<FacultyRegister />} />
        <Route path="hod-register"  element={<HODRegister/>}/>
        <Route path="room-register" element={<RoomRegister/>}/>
        <Route path = "/studentdash" element = {<StudentDash />} />
        <Route path="/hoddash" element={<HODDash />} />
      </Routes>
    </BrowserRouter>
  );
}