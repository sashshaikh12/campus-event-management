import React from "react";

function EventReqNav({ onShowRooms }) {
    return (
        <div className="studentNav">
            <img className="peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                <button onClick={onShowRooms}>Rooms</button>
                <button>Your Events</button>
                <button>Room Service</button>
                <button>HOD Contacts</button>
            </div>
        </div>
    );
}

export default EventReqNav;