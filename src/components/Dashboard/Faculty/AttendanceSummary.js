import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function AttendanceSummary() {
    const location = useLocation();
    const { event_id } = location.state || {};
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            const reqbody = { event_id };
            try {
                let result = await fetch("http://localhost:5000/EventAttendanceSummary", {
                    method: "POST",
                    body: JSON.stringify(reqbody),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                console.log(result);
                setEventDetails(result);
            } catch (err) {
                console.error("Fetch error:", err.message);
            }
        };

        if (event_id) {
            fetchEventDetails();
        }
    }, [event_id]);

    return (
        <div>
            <div className="facultyNav">
                <img className="facultyLogo" src="/newpeslogo.png" alt="pes university logo" />
            </div>
            <div className="facultyEventsContainer">
                {eventDetails ? (
                    <div className="facultyEventBox">
                        <h1>{eventDetails.Event_name}</h1>
                        <p>{eventDetails.Event_description}</p>
                        <p><strong>Date:</strong> {eventDetails.Event_date}</p>
                        <p><strong>Total Attendees:</strong> {eventDetails.Total_Attendees}</p>
                    </div>
                ) : (
                    <p>Loading event details...</p>
                )}
            </div>
        </div>
    );
}

export default AttendanceSummary;