import React, { useState } from "react";


function EventRegBody() {
    const [name, setName] = useState("");
    const [clubName, setClubName] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventBudget, setEventBudget] = useState("");
    const [urls, setUrls] = useState("");


    const handleSubmit = async () => {
        // Handle form submission
        const reqbody = {name, clubName, eventName, eventDate, eventStartTime, eventEndTime, eventVenue, eventDesc, eventBudget, urls};
        let result = await fetch("http://localhost:5000/eventReq/reqSubmit", {
            method: "post",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });

        result = await result.json();
        console.log(result);
        setName("");
        setClubName("");
        setEventName("");
        setEventDate("");
        setEventStartTime("");
        setEventEndTime("");
        setEventVenue("");
        setEventDesc("");
        setEventBudget("");
        setUrls("");
    };

    return (
        <div className="eventRegBody">
            <form className="login">
                <h1>Register Event</h1>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Your Name"
                    className="LoginInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="clubname"
                    placeholder="Enter Club Name"
                    className="LoginInput"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="eventname"
                    placeholder="Enter Event Name"
                    className="LoginInput"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    id="eventdate"
                    className="LoginInput"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                />
                <label htmlFor="eventstarttime">Event Start Time:</label>
                <input
                    type="time"
                    id="eventstarttime"
                    className="LoginInput"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                    required
                />
                <label htmlFor="eventendtime">Event End Time:</label>
                <input
                    type="time"
                    id="eventendtime"
                    className="LoginInput"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="eventvenue"
                    placeholder="Enter Event Venue"
                    className="LoginInput"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="budget"
                    placeholder="Enter Budget"
                    className="LoginInput"
                    value={eventBudget}
                    onChange={(e) => setEventBudget(e.target.value)}
                    required
                />
                <input
                        type="text"
                        id = "URL"
                        value={urls}
                        placeholder="Enter Image URL"
                        className="LoginInput"
                        onChange={(e) => setUrls(e.target.value)}
                    />
                <textarea
                    id="eventdesc"
                    placeholder="Enter Event Description"
                    className="LoginInput"
                    rows="4"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    required
                />
                <button type="button" onClick={handleSubmit} className="EventSubmitButton">
                    SUBMIT
                </button>
            </form>
        </div>
    );
}

export default EventRegBody;