import React from "react";
import YourEventsNav from "./YourEventsNav";
import YourEventsBody from "./YourEventsBody";
import { useLocation } from "react-router-dom";

function YourEvents() 
{
    const location = useLocation();
    const events = location.state?.events || [];
    console.log(events);
    return(
        <div>
            <YourEventsNav />
            <YourEventsBody events = {events} />
        </div>
    );
}

export default YourEvents;