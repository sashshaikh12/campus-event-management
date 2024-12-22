import React from "react";
import {  useNavigate ,Link} from "react-router-dom";
import StudentEventReg from "./StudentEventReg";



function StudentNav()
{
    const navigate = useNavigate();

    const GetEvents = async () => {
        const auth = localStorage.getItem("user");
        const userDetails = JSON.parse(auth);
        console.log(userDetails);
        const reqbody = { studentid: userDetails.Student_ID };
        console.log(reqbody);
        let result = await fetch("http://localhost:5000/eventReq", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        result = await result.json();
        console.log(result);
        var cango = result.exists;
        console.log(result);
        if (cango) {
            navigate("/eventReq");
          }
        else alert("You are not a club head");
    };

    const ShowEventsRegs = async () => {

        const auth = localStorage.getItem("user");
        const userDetails = JSON.parse(auth);
        console.log(userDetails);
        const reqbody = { studentid: userDetails.Student_ID };
        console.log(reqbody);
        let result = await fetch("http://localhost:5000/EventRegCheck", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
            },
          });
        result = await result.json();
        console.log(result);
        var cango = result.exists;
        console.log(result);
        if (cango) {
            navigate("/StudentEventReg");
          }
        else alert("You are blacklisted");

    };

    const GiveAppeal = async () => {
        navigate("/giveAppeal");
    };

    
    return(

    <div className="studentNav">
        <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
        <div className="centerButtons">
                <button type="button" onClick={GetEvents}>Event Request</button>
                {/* <Link to="/StudentEventReg"><button>Event Register</button></Link> */}
                <button onClick={ShowEventsRegs}>Event Register</button>
                <button onClick={GiveAppeal}>Appeal</button>
        </div>
        <button className="ProfileButton">Profile</button>
    </div>


    );
}

export default StudentNav;