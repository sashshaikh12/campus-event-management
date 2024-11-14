import React from "react";
import {  useNavigate } from "react-router-dom";

function EventReqNav({ onShowRooms }) {

    const navigate = useNavigate();

    const ShowEvents = async () => {
        const auth = localStorage.getItem("user");
        const userDetails = JSON.parse(auth);
        console.log(userDetails); 
        const reqbody = { studentid: userDetails.Student_ID };
        let result = await fetch("http://localhost:5000/yourEvents", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        result = await result.json();
        console.log(result);

        if (result.length > 0) {
          navigate("/yourEvents", { state: { events: result } });
          }
        else alert("You do not have amy events");
    };
   
    return (
        <div className="studentNav">
            <img className="peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                <button onClick={onShowRooms}>Rooms</button>
                <button onClick={ShowEvents}>Your Events</button>
                <button>Room Service</button>
                <button>HOD Contacts</button>
            </div>
        </div>
    );
}

export default EventReqNav;