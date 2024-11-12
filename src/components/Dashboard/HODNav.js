import React,{useState} from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 60292c9f40ffe47bdb0c26f02d7da1575e3c2d9c


export default function HODNav(){
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    return(
        <div className="studentNav">
            <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
<<<<<<< HEAD
                    <Link to="/student"><button>Students</button></Link>
                    <button>Faculty</button>
=======
                    <button>Students</button>
                    <button>Faculty</button>
                    <button>Room Manager    </button>
>>>>>>> 60292c9f40ffe47bdb0c26f02d7da1575e3c2d9c
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