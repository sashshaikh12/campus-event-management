import React, { useState } from "react";


function YourEventsBody({ events }) {
    const [urls, setUrls] = useState({});

    const handleUrlChange = (eventId, value) => {
        setUrls(prevUrls => ({
            ...prevUrls,
            [eventId]: value
        }));
    };

    const GiveUrl = async (eventId) => {
        const url = urls[eventId];
        console.log(eventId, url);
        const reqbody = { event_Id: eventId, url };
        console.log(reqbody);
        let result = await fetch("http://localhost:5000/eventReq/addURL", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);
        setUrls(prevUrls => ({
            ...prevUrls,
            [eventId]: ""
        }));
    };

    return (
        <div className="eventsContainer">
            {events.map((event, index) => (
                <div key={index} className="eventBox" id={index}>
                    <h1>{event.Event_name}</h1>
                    <hr />
                    <h2>{event.Event_description}</h2>
                    <hr />
                    <div className="eventDetails">
                        <div className="eventDateTime">
                            <h3>Date: {event.Event_date}</h3>
                            <h3>Time: {event.Event_time} to {event.Event_End_Time}</h3>
                        </div>
                        <div className="eventVenueLocation">
                            <h3>Venue: {event.Room_name}</h3>
                            <h3>Location: {event.Location}</h3>
                            <h3>Budget: {event.Budget}</h3>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={urls[event.Event_ID] || ""}
                        placeholder="Enter Image URL"
                        className="eventInput"
                        onChange={(e) => handleUrlChange(event.Event_ID, e.target.value)}
                    />
                    <button className="eventButton" onClick={() => GiveUrl(event.Event_ID)}>Submit</button>
                </div>
            ))}
        </div>
    );
}

export default YourEventsBody;