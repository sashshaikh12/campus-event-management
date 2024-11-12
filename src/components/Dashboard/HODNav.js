import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

export default function HODNav() {
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setShowProfileOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="studentNav">
            <img className="peslogo" src="/newpeslogo.png" alt="pes university logo" />
            <div className="centerButtons">
                <Link to="/studentinfo"><button>Students</button></Link>
                <button>Faculty</button>
                <button>Events</button>
            </div>
            <div className="notificationContainer" ref={notificationRef}>
                <button className="NotificationButton" onClick={toggleNotifications}>
                    <i className="fa-solid fa-bell"></i>
                </button>
                {showNotifications && (
                    <div className="notifications">
                        <form>
                            
                        </form>
                    </div>
                )}
            </div>
            <div className="profileContainer" ref={profileRef}>
                <button className="ProfileButton" onClick={toggleProfileOptions}>Profile</button>
                <div className={`profileOptions ${showProfileOptions ? 'show' : ''}`}>
                    <button>View Profile</button>
                    <div className="spacer"></div>
                    <button className="logout">Logout</button>
                </div>
            </div>
        </div>
    );
}