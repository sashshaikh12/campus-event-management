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
import RoomDash from "./components/Dashboard/Room_Manager/RoomDash";
import StudentEventReg from "./components/Dashboard/Student/StudentEventReg";
import StudentEventRegForm from "./components/Dashboard/Student/StudentEventRegForm";
import RoomService from "./components/Dashboard/Student/RoomService";
import FacultyDash from "./components/Dashboard/Faculty/FacultyDash";
import FacultyShowEvents from "./components/Dashboard/Faculty/FacultyShowEvents";
import FacultyClubEvents from "./components/Dashboard/Faculty/FacultyClubEvents";
import AttendanceSheet from "./components/Dashboard/Faculty/AttendanceSheet";
import GiveAppeal from "./components/Dashboard/Student/giveAppeal";
import AttendanceSummary from "./components/Dashboard/Faculty/AttendanceSummary";
import PopularEvents from "./components/Dashboard/Faculty/PopularEvents";

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
        <Route path="/events" element={<EventInfo/>}/>
        <Route path="/roomdash" element={<RoomDash/>}/>
        <Route path="/studentEventReg" element={<StudentEventReg/>}/>
        <Route path="/studentEventRegForm" element={<StudentEventRegForm/>}/>
        <Route path="/roomService" element={<RoomService/>}/>
        <Route path="/facultyDash" element={<FacultyDash/>}/>
        <Route path="/FacultyShowEvents" element={<FacultyShowEvents/>}/>
        <Route path="/FacultyClubEvents" element={<FacultyClubEvents/>}/>
        <Route path="/AttendanceSheet" element={<AttendanceSheet/>}/>
        <Route path="/GiveAppeal" element={<GiveAppeal/>}/>
        <Route path="/AttendanceSummary" element={<AttendanceSummary/>}/>
        <Route path="/PopularEvents" element={<PopularEvents/>}/>
      </Routes>
    </BrowserRouter>
  );
}