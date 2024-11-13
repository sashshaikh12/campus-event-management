import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

export default function HODNav() {
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications]= useState([]);
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


    useEffect(()=>{
        const fetchNotifications = async () =>{
            try{
                let result = await fetch("http://localhost:5000/notification",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                result = await result.json();
                console.warn(result);
                setNotifications(result);
            }catch(e){
                console.error(e.message);
            }
        }
        fetchNotifications();
    },[showNotifications]);

    async function blacklist(id,blacklist,decision){
        console.log({id,blacklist,decision});
        const reqbody = {id,blacklist,decision}
        try{
            let result = await fetch("http://localhost:5000/blacklist",{
                method:"POST",
                body:JSON.stringify(reqbody),
                headers:{
                    "Content-Type":"application/json",
                }
            });
            result = await result.json();
            console.warn(result);
        }catch(e){
            console.log(e);
        }
    }
    

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
                    {notifications.length === 0 ? (
                        <p className="texy-content">No notifications for now.</p>
                    ) : (
                        notifications.map(notification => (
                            <form className="NotificationForm" key={notification.Appeal_ID}>
                                <div className="text-content">
                                    <p><strong>Name:</strong> <b>{notification.Name}</b></p>
                                    <p><strong>Appeal:</strong> {notification.Appeal}</p>
                                </div>
                                <div className="buttons">
                                    <button className="accept" onClick={() => blacklist(notification.Student_ID, 'YES', "accept")}><i className="fa-solid fa-check"></i></button>
                                    <button className="reject"><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </form>
                        ))
                    )}
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