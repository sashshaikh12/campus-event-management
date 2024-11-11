import React,{useState} from "react";


export default function HODNav(){
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    return(
        <div className="studentNav">
            <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                    <button>Students</button>
                    <button>Faculty</button>
                    <button>Room Manager    </button>
                    <button>Events</button>
            </div>
            <button className="ProfileButton" onClick={toggleProfileOptions}>Profile</button>
            <div className={`profileOptions ${showProfileOptions ? 'show' : ''}`}>
                <button>View Profile</button>
                <div className="spacer"></div>
                <button className="logout">Logout</button>
            </div>
        </div>
    );
}