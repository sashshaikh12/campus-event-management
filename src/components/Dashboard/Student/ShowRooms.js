import React, { useState, useEffect } from "react";

function ShowRooms() {
    console.log("clicked");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let result = await fetch("http://localhost:5000/eventReq", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                setRooms(result);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchRooms();
    }, []);


    return (
        <div className="roomsContainer">
            {rooms.map((room, index) => (
                <div key={index} className="roomDisplay" style={{ animationDelay: `${index * 0.5}s` }}>
                    <h1>{room.Room_name}</h1>
                    <h2>Capacity: {room.Capacity}</h2>
                    <h3>Location: {room.location}</h3>
                </div>
            ))}
        </div>
    );
}

export default ShowRooms;