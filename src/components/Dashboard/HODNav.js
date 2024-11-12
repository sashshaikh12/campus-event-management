import React,{useState} from "react";
import { Link } from "react-router-dom";


export default function HODNav(){
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    return(
        <div className="studentNav">
            <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                    <Link to="/studentinfo"><button>Students</button></Link>
                    <button>Faculty</button>
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