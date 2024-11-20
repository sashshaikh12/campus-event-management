import React from "react";
import {  useNavigate ,Link} from "react-router-dom";


function FacultyNav()
{
    const navigate = useNavigate();

    const ShowAllEvents = async () => {
        navigate("/FacultyShowEvents");
    }

    const AttendanceSheet = async () => {
        navigate("/FacultyClubEvents");
    };

    const ShowPopularEvents = async () => {
        navigate("/PopularEvents");
    };

    
    return(

    <div className="studentNav">
        <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
        <div className="centerButtons">
                <button onClick={ShowAllEvents}>Upcoming Events</button>
                <button onClick={AttendanceSheet}>Attendance</button>
                <button onClick={ShowPopularEvents}>Most Booked Room</button>
        </div>
        <button className="ProfileButton">Profile</button>
    </div>


    );
}

export default FacultyNav;