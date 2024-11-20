import React, { useState, useEffect } from "react";
import RoomManagerNAV from "./RoomManagerNav";

export default function RoomDash(){
    const [rooms, setRooms] = useState([]);
    const [showRooms, setShowRooms] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let result = await fetch("http://localhost:5000/roominfo", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                result = await result.json();
                console.warn(result);
                setRooms(result);
            } catch (e) {
                console.error(e);
            }
        }
        fetchRooms();
    }, []);

    const toggleRooms = () => {
        setShowRooms(!showRooms);
    };

    return(
        <div>
            <RoomManagerNAV/>
            <div className="rooms">
                <div className="rooms-header">
                    <button onClick={toggleRooms} className="toggle-button">
                        {showRooms ? <i className="fa-solid fa-chevron-down" /> : <i className="fa-solid fa-chevron-right" />}
                    </button>
                    <h1 className="form-title">ROOMS</h1>
                </div>
                <div className={`rooms-content ${showRooms ? 'show' : 'hide'}`}>
                    {Array.isArray(rooms) && rooms.map(room => (
                        <div className="roomform" key={room.service_ID}>
                            <div className="roomformdetails">
                                <p className="room-name"><span>Room:</span> {room.Room_name}</p>
                                <p className="description"><span>Description:</span> {room.service_desc}</p>
                                <p className="room-location"><span>Name:</span> {room.Event_name}</p>
                                <p className="room-location"><span>Location:</span> {room.Location}</p>
                                <p className="room-capacity"><span>Capacity:</span> {room.Capacity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}