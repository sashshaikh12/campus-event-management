import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import FacultyRegister from "./components/LoginRegister/FacultyRegister";
import HODRegister from "./components/LoginRegister/HODRegister";
import RoomRegister from "./components/LoginRegister/RoomRegister";
import StudentDash from "./components/Dashboard/studentDash";
<<<<<<< HEAD
import EventReq from "./components/Dashboard/EventReq";
=======
import HODDash from "./components/Dashboard/HODDash";
>>>>>>> 60292c9f40ffe47bdb0c26f02d7da1575e3c2d9c

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="faculty-register" element={<FacultyRegister />} />
        <Route path="hod-register"  element={<HODRegister/>}/>
        <Route path="room-register" element={<RoomRegister/>}/>
<<<<<<< HEAD
        <Route path = "/studentDash" element = {<StudentDash />} />
        <Route path = "/eventReq" element = {<EventReq />} />
=======
        <Route path = "/studentdash" element = {<StudentDash />} />
        <Route path="/hoddash" element={<HODDash />} />
>>>>>>> 60292c9f40ffe47bdb0c26f02d7da1575e3c2d9c
      </Routes>
    </BrowserRouter>
  );
}