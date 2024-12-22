import React, { useState, useEffect } from "react";

function YourEventsBody({ events }) {
    const [currentEvents, setCurrentEvents] = useState(events);
    const [serviceDesc, setServiceDesc] = useState({}); // Object to manage individual textarea states

    const RemoveEvent = async (eventId) => {
        const reqbody = { event_Id: eventId }; // Use event_Id instead of eventId
        let result = await fetch("http://localhost:5000/eventReq/removeEvent", {
            method: "PUT",
            body: JSON.stringify(reqbody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);

        // Update the state to remove the event
        setCurrentEvents(currentEvents.filter((event) => event.Event_ID !== eventId));
    };

    const SendService = async (eventId) => {
        const reqbody = { event_Id: eventId, service: serviceDesc[eventId] }; // Use event_Id instead of eventId
        console.log(reqbody);
        let result = await fetch("http://localhost:5000/eventReq/sendService", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);

        // Update the state to remove the event
        handleTextAreaChange(eventId, ""); // Reset the textarea content

    }

    const handleTextAreaChange = (eventId, value) => {
        setServiceDesc((prevState) => ({
            ...prevState,
            [eventId]: value, // Update the specific event's textarea content
        }));
    };

    useEffect(() => {
        setCurrentEvents(events);
    }, [events]); // No need to add `currentEvents` as a dependency

    const getStatusClass = (status) => {
        switch (status) {
            case "YES":
                return "approved";
            case "waiting":
                return "waiting";
            default:
                return "rejected";
        }
    };

    return (
        <div className="eventsContainer">
            {currentEvents.map((event, index) => (
                <div
                    key={index}
                    className={`eventBox ${getStatusClass(event.Approved)}`}
                    id={index}
                >
                    <h1>{event.Event_name}</h1>
                    <hr />
                    <h2>{event.Event_description}</h2>
                    <hr />
                    <div className="eventDetails">
                        <div className="eventDateTime">
                            <h3>Date: {event.Event_date}</h3>
                            <h3>
                                Time: {event.Event_time} to {event.Event_End_Time}
                            </h3>
                        </div>
                        <div className="eventVenueLocation">
                            <h3>Venue: {event.Room_name}</h3>
                            <h3>Location: {event.Location}</h3>
                            <h3>Budget: {event.Budget}</h3>
                        </div>
                    </div>
                    {event.Approved === "NO" && (
                        <>
                            <button
                                className="eventButton"
                                onClick={() => RemoveEvent(event.Event_ID)}
                            >
                                Remove
                            </button>
                        </>
                    )}
                    {event.Approved === "YES" && (
                        <>
                            <textarea
                                className="roomService"
                                placeholder="Enter any Room service Needed"
                                value={serviceDesc[event.Event_ID] || ""} // Bind the state to this specific textarea
                                onChange={(e) =>
                                    handleTextAreaChange(event.Event_ID, e.target.value)
                                }
                            ></textarea>
                            <button
                                className="eventButton"
                                onClick={() => SendService(event.Event_ID)}
                            >
                                Submit
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default YourEventsBody;
