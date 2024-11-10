import React from "react";

function StudentNav()
{
    return(

    <div className="studentNav">
        <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
        <div className="centerButtons">
                <button>Event Request</button>
                <button>Event Register</button>
                <button>About</button>
                <button>Contacts</button>
        </div>
        <button className="ProfileButton">Profile</button>
    </div>


    );
}

export default StudentNav;