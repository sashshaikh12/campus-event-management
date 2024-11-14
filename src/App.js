import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import FacultyRegister from "./components/LoginRegister/FacultyRegister";
import HODRegister from "./components/LoginRegister/HODRegister";
import RoomRegister from "./components/LoginRegister/RoomRegister";
import StudentDash from "./components/Dashboard/Student/studentDash";
import HODDash from "./components/Dashboard/HOD/HODDash";
import StudentInfo from "./components/Dashboard/HOD/studentsInfo";
import EventReq from "./components/Dashboard/Student/EventReq";
import YourEvents from "./components/Dashboard/Student/YourEvents";
import FacultyInfo from "./components/Dashboard/HOD/facultyinfo";
import EventInfo from "./components/Dashboard/HOD/eventinfo";

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
        <Route path="/studentinfo" element={<StudentInfo/>}/>
        <Route path = "/eventReq" element = {<EventReq />} />
        <Route path = "/yourEvents" element = {<YourEvents />} />
        <Route path="/facultyinfo" element={<FacultyInfo/>}/>
        <Route path="events" element={<EventInfo/>}/>
      </Routes>
    </BrowserRouter>
  );
}