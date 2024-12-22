import React, { useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import StudentEventReqNav from "../Student/StudentEventReqNav";
import StudentEventReqBody from "../Student/StudentEventReqBody";
import StudentEventRegForm from "../Student/StudentEventRegForm";

function FacultyShowEvents() {
    const [showCards, setShowCards] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [location, setLocation] = useState("");
    const [EventID, setEventID] = useState(0);
    const Navigate = useNavigate();

    const SeeDetailsClick = async (eventDetails) => {
        setShowCards(false);
        setSelectedEvent(eventDetails);
        console.log(eventDetails);
        setEventID(eventDetails.Event_ID);

        // Fetch location based on roomid
        try {
            const response = await fetch("http://localhost:5000/getLocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roomid: eventDetails.Room_ID }),
            });
            const result = await response.json();
            console.log(result);
            setLocation(result);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getLocationImage = (location) => {
        switch (location) {
            case "GJB Entrance":
                return "gjb_auditorium.jpeg";
            case "BE Block, First Floor":
                return "B_Block.jpeg";
            case "F - Block, Ground Floor":
                return "F_Block.jpg";
            case "BE Block, Ground Floor":
                return "B_Block.jpeg";
            case "BE Block, 13th Floor":
                return "silentReflections.jpg";
            case "BE Block, Second Floor":
                return "B_Block.jpeg";
            case "Open Air Theatre near BE Block":
                return "open_air_thetre.jpg";
            case "MRD Block, near college entrance":
                return "mrd.jpg";
            case "GJB Building, near college library":
                return "opera_house.jpg";
            default:
                return "peslogo.png";
        }
    };
    

    const goBack = () => {
        setShowCards(true);
        setSelectedEvent(null);
    };

    return (
        <div>
            <StudentEventReqNav />
            <div className="EventTitle">
                <h1>Upcoming Events : </h1>
            </div>
            {showCards && <StudentEventReqBody SeeDetails={SeeDetailsClick} />}
            {!showCards && selectedEvent && (
                <div className="EventDetails">
                    <img src={selectedEvent.URL} alt="Event" className="EventDetailsImage" />
                    <h2 className="EventDetailsName">{selectedEvent.Event_name}</h2>
                    <p className="EventDetailsDescription">{selectedEvent.Event_description}</p>
                    <div className="EventDetailsInfo">
                        <p><strong>Event Date:</strong> {selectedEvent.Event_date}</p>
                        <p><strong>Event Start Time:</strong> {selectedEvent.Event_time}</p>
                        <p><strong>Event End Time:</strong> {selectedEvent.Event_End_Time}</p>
                        <p><strong>Event Venue:</strong> {location.Room_name}</p>
                        <p><strong>Event Location:</strong> {location.Location}</p>
                        <img src={getLocationImage(location.Location)} alt="Event Venue" className="EventVenueImage" />
                    </div>
                    <div className="EventDetailsButtons">
                        <button className="EventDetailsButton" onClick={goBack}>Go back</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacultyShowEvents;