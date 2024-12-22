import React, { useState, useEffect, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

export default function RoomManagerNAV() {
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const profileRef = useRef(null);

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    

    const handleClickOutside = (event) => {
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