import React, {useState} from "react";

function YourEventsBody({events})
{

    const GiveUrl = async (event_Id) => {

        console.log(event_Id);
        const reqbody = {event_Id, url};
        let result = await fetch("http://localhost:5000/eventReq/addURL", {
            method: "post",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });

        result = await result.json();
        console.log(result);
        setUrl("");
    };

    const [url, setUrl] = useState("");
    console.log(url);  

    console.log(events);
    return(
        <div className="eventsContainer">
            {events.map((event, index) => (
                <div key={index} className="eventBox" id = {index}>
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
                    <input type="text" value={url} placeholder="Enter Image URL" className="eventInput" onChange={(e) => setUrl(e.target.value)} />
                    <button className="eventButton" onClick={() => GiveUrl(event.Event_ID)}>Submit</button>
                </div>
            ))}
        </div>
    );
}

export default YourEventsBody;