import React, { useEffect, useState } from "react";


function MostBookedRooms() {
    const [roomDetails, setRoomDetails] = useState([]);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                let response = await fetch("http://localhost:5000/mostBookedRooms", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                let result = await response.json();
                console.log(result);
                setRoomDetails(result);
            } catch (err) {
                console.error("Fetch error:", err.message);
            }
        };

        fetchRoomDetails();
    }, []);

    return (
        <div>
            <div className="mostBookedRoomsNav">
                <img className="mostBookedRoomsLogo" src="/newpeslogo.png" alt="pes university logo" />
            </div>
            <div className="mostBookedRoomsContainer">
                {roomDetails.length > 0 ? (
                    roomDetails.map((room, index) => (
                        <div key={index} className="mostBookedRoomBox">
                            <h1>{room.Room_name}</h1>
                            <p><strong>Room ID:</strong> {room.Room_ID}</p>
                            <p><strong>Bookings:</strong> {room.Bookings}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading room details...</p>
                )}
            </div>
        </div>
    );
}

export default MostBookedRooms;