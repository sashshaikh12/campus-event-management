import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StudentEventReqNav from "./StudentEventReqNav";


function StudentEventRegForm() {
    const location = useLocation();
    const { eventID } = location.state || {};
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    const auth = localStorage.getItem("user");
    const userDetails = JSON.parse(auth);
    const studentID = userDetails.Student_ID;

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!name) newErrors.name = "Name is required";
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }
        if (!department) newErrors.department = "Department is required";
        if (!year) newErrors.year = "Year is required";
        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Invalid phone number format";
        }
        return newErrors;
    };

    const handleRegister = async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const reqbody = { name, email, department, year, phone, eventID, studentID };
        console.warn(reqbody);
        let result = await fetch("http://localhost:5000/StudentEventRegForm", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.warn(result);
        setName("");
        setEmail("");
        setDepartment("");
        setYear("");
        setPhone("");
    };

    return (
        <div>
            <StudentEventReqNav />


            <div className="eventRegBody">
                <form className="login">
                    <h1>Register Event</h1>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="LoginInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="LoginInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <select
                        id="department"
                        className="LoginInput"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Department
                        </option>
                        <option value="CSE">CSE</option>
                        <option value="EEE">EEE</option>
                        <option value="ECE">ECE</option>
                        <option value="MECH">MECH</option>
                    </select>
                    {errors.department && <p className="error">{errors.department}</p>}
                    <select
                        id="year"
                        className="LoginInput"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Year
                        </option>
                        <option value="1st Year">1</option>
                        <option value="2nd Year">2</option>
                        <option value="3rd Year">3</option>
                        <option value="4th Year">4</option>
                    </select>
                    {errors.year && <p className="error">{errors.year}</p>}
                    <input
                        type="text"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="LoginInput"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                    <button type="button" onClick={handleRegister} className="SubmitButton">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentEventRegForm;