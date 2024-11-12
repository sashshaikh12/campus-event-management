import React,{useState} from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome


export default function HODNav(){
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    return(
        <div className="studentNav">
            <img className = "peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                    <Link to="/studentinfo"><button>Students</button></Link>
                    <button>Faculty</button>
                    <button>Events</button>
            </div>
            <div className="notificationContainer">
                <button className="NotificationButton" onClick={toggleNotifications}> 
                    <i class="fa-solid fa-bell"></i>  
                </button>
                {showNotifications && (
                    <div className="notifications">
                        <p>No new notifications</p>
                    </div>
                )}
            </div>
            <div className={`profileOptions ${showProfileOptions ? 'show' : ''}`}>
                <button>View Profile</button>
                <div className="spacer"></div>
                <button className="logout">Logout</button>
            </div>
            <button className="ProfileButton" onClick={toggleProfileOptions}>Profile</button>
            
        </div>
    );
}