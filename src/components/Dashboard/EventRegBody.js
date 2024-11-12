import React from "react";

function EventRegBody() {
    return(
        <div className="eventRegBody">
            <form className="eventForm">
                    <label for="clubheadname">Name:</label><br />
                    <input type="text" id="clubheadname" name="clubheadname" /><br />
                    
                    <label for="clubname">Club Name:</label><br />
                    <input type="text" id="clubname" name="clubname" /><br />

                    <label for="eventname">Event Name:</label><br />
                    <input type="text" id="eventname" name="eventname" /><br />

                    <label for="eventdate">Event Date:</label><br />
                    <input type="date" id="eventdate" name="eventdate" /><br />

                    <label for="eventstarttime">Event Start Time:</label><br />
                    <input type="time" id="eventstarttime" name="eventstarttime" /><br />

                    <label for="eventendtime">Event End Time:</label><br />
                    <input type="time" id="eventendtime" name="eventendtime" /><br />

                    <label for="eventvenue">Event Venue:</label><br />
                    <input type="text" id="eventvenue" name="eventvenue" /><br />

                    <label for="eventdesc">Event Description:</label><br />
                    <textarea id="eventdesc" name="eventdesc" rows="4" cols="50"></textarea><br />

                    <button type="button"> SUBMIT </button>
            </form>
        </div>

    );
}

export default EventRegBody;