import React, { useState ,useEffect} from "react";
import HODNav from "./HODNav";


export default function EventInfo(){
    const [events,setEvents] = useState([]);


    useEffect(()=>{
        const fetchEvents = async ()=>{
            try{
                let result = await fetch("http://localhost:5000/eventinfo",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                result = await result.json();
                console.warn(result);
                setEvents(result);
            }catch(e){
                console.error(e);
            }
        }
        fetchEvents();
    },[]);
    
    return(
        <div>
            <HODNav/>
            <div className="unapprovedEvents">
                <h1 className="form-title">WAITING FOR APPROVAL</h1>
                {events.map(event => (
                    <div className="eventsform" key={event.Event_ID}>
                        <img src={event.URL} alt="event-img" className="event-img" />
                        <div className="eventformdetails">
                            <p className="event-name"><span>Event:</span> {event.Event_name}</p>
                            <p className="description"><span>Description:</span> {event.Event_description}</p>
                            <p className="event-date"><span>Date:</span> {event.Event_date}</p>
                            <p className="event-location"><span>Location:</span> {event.Location}</p>
                            <p className="event-time"><span>Time:</span> {event.Event_time}</p>
                            <p className="event-room"><span>Room:</span> {event.Room_name}</p>
                        </div>
                            <div className="acceptreject">
                        <button className="approve-button"><i className="fa-solid fa-check"/></button>
                        <button className="reject-button"><i className="fa-solid fa-xmark"/></button>
                    </div>
                </div>
                ))}
            </div>
            <form className="approvedEvents">
            <h1 className="form-title">APPROVED</h1>
                {events.map(event => (
                        <div className="eventsform" key={event.Event_ID}>
                            <img src={event.URL} alt="event-img" className="event-img" />
                            <div className="eventformdetails">
                                <p className="event-name"><span>Event:</span> {event.Event_name}</p>
                                <p className="description"><span>Description:</span> {event.Event_description}</p>
                                <p className="event-date"><span>Date:</span> {event.Event_date}</p>
                                <p className="event-location"><span>Location:</span> {event.Location}</p>
                                <p className="event-time"><span>Time:</span> {event.Event_time}</p>
                                <p className="event-room"><span>Room:</span> {event.Room_name}</p>
                            </div>
                                <div className="acceptreject">
                            <button className="reject-button"><i className="fa-solid fa-xmark"/></button>
                        </div>
                    </div>
                    ))}
            </form>
        </div>
    )
}