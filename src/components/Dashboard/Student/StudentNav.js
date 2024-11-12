import React from "react";
import {  useNavigate } from "react-router-dom";



function StudentNav()
{
    const navigate = useNavigate();

    const GetEvents = async () => {
        const auth = localStorage.getItem("user");
        console.log(auth);
        const userDetails = JSON.parse(auth);
        const reqbody = { studentid: userDetails.Student_ID };
        let result = await fetch("http://localhost:5000/eventReq", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        result = await result.json();
        var cango = result.exists;
        console.log(result);
        if (cango) {
            navigate("/eventReq");
          }
        else alert("You are not a club head");
    };

    return(

    <div className="studentNav">
        <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
        <div className="centerButtons">
                <button type="button" onClick={GetEvents}>Event Request</button>
                <button>Event Register</button>
                <button>About</button>
                <button>Contacts</button>
        </div>
        <button className="ProfileButton">Profile</button>
    </div>


    );
}

export default StudentNav;