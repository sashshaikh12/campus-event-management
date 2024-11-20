import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function FacultyClubEvents() {
    const [events, setEvents] = useState([]);
    const auth = localStorage.getItem('user');
    const userDetails = JSON.parse(auth);
    const reqbody = { faculty_id: userDetails['Faculty_ID'] };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let result = await fetch("http://localhost:5000/FacultyClubEvents", {
                    method: "POST",
                    body: JSON.stringify(reqbody),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                console.log(result);
                setEvents(result);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchEvents();
    }, []);

    const GiveAttendanceSheet = (event_id) => {
        navigate("/AttendanceSheet", { state: { event_id } });
    };

    const GiveAttendanceSummary = (event_id) => {
        navigate("/AttendanceSummary", { state: { event_id } });

    };

    return (
        <div>
            <div className="facultyNav">
                <img className="facultyLogo" src="/newpeslogo.png" alt="pes university logo" />
            </div>
            <div className="facultyEventsContainer">
                {events.map((event, index) => (
                    <div key={index} className="facultyEventBox">
                        <h1>{event.Event_name}</h1>
                        <p>{event.Event_description}</p>
                        <p><strong>Date:</strong> {event.Event_date}</p>
                        <p><strong>Time:</strong> {event.Event_time} to {event.Event_End_Time}</p>
                        <button className="facultyAttendanceButton" onClick={() => GiveAttendanceSheet(event.Event_ID)}>Attendance</button>
                        <button className="facultyAttendanceButton" onClick={() => GiveAttendanceSummary(event.Event_ID)}>Summary</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FacultyClubEvents;