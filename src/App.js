import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import FacultyRegister from "./components/LoginRegister/FacultyRegister";
import HODRegister from "./components/LoginRegister/HODRegister";
import RoomRegister from "./components/LoginRegister/RoomRegister";
import StudentDash from "./components/Dashboard/studentDash";
import EventReq from "./components/Dashboard/EventReq";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="faculty-register" element={<FacultyRegister />} />
        <Route path="hod-register"  element={<HODRegister/>}/>
        <Route path="room-register" element={<RoomRegister/>}/>
        <Route path = "/studentDash" element = {<StudentDash />} />
        <Route path = "/eventReq" element = {<EventReq />} />
      </Routes>
    </BrowserRouter>
  );
}