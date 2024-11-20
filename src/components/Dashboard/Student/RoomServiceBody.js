import React, { useEffect, useState } from "react";

function RoomServiceBody() {
    const [services, setServices] = useState([]); // State to store fetched services
    const auth = localStorage.getItem('user');
    const userDetails = JSON.parse(auth);
    const reqbody = { studentID: userDetails['Student_ID'] };

    const fetchServices = async () => {
        try {
            let result = await fetch("http://localhost:5000/roomService", {
                method: "POST",
                body: JSON.stringify(reqbody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();
            console.log(result);
            setServices(result); // Save result to state
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div style={styles.container}>
            {services.map((service, index) => (
                <div key={index} style={styles.card}>
                    <h3>{service.Event_name}</h3>
                    <p><strong>Description:</strong> {service.Event_description}</p>
                    <p><strong>Date:</strong> {new Date(service.Event_date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {service.Event_time}</p>
                    <p><strong>Service Issue:</strong> {service.service_desc}</p>
                </div>
            ))}
        </div>
    );
}

export default RoomServiceBody;

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#f4f4f9",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
        textAlign: "left",
    },
};
