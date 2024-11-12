import React, { useState } from "react";
import EventReqNav from "./EventReqNav";
import EventRegBody from "./EventRegBody";
import ShowRooms from "./ShowRooms";

function EventReq() {
    const [showForm, setShowForm] = useState(true);

    const handleShowRooms = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <EventReqNav onShowRooms={handleShowRooms} />
            {showForm && <EventRegBody />}
            {!showForm && <ShowRooms />}
        </div>
    );
}

export default EventReq;