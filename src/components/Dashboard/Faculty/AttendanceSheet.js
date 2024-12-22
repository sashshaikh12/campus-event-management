import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function AttendanceSheet() {
    const location = useLocation();
    const { event_id } = location.state || {};
    const [attendanceData, setAttendanceData] = useState([]);

    const [attendanceStatus, setAttendanceStatus] = useState({}); // To store attendance status

    useEffect(() => {
        const fetchAttendanceSheet = async () => {
            const reqbody = { event_id };
            try {
                let result = await fetch("http://localhost:5000/GiveAttendanceSheet", {
                    method: "POST",
                    body: JSON.stringify(reqbody),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                setAttendanceData(result);
            } catch (err) {
                console.error("Fetch error:", err.message);
            }
        };

        if (event_id) {
            fetchAttendanceSheet();
        }
    }, [event_id]);

    const markAttendance = (registration_id, status, student_id, event_id) => {
        setAttendanceStatus((prevState) => ({
            ...prevState,
            [registration_id]: status,
        }));
        
        const reqbody = {student_id, event_id};
        fetch("http://localhost:5000/MarkAttendance", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
                "Content-Type": "application/json",
            },
        });

    };

    return (
        <div>
            <div className="studentNav">
                <img className="peslogo" src="/newpeslogo.png" alt="PES University Logo" />
            </div>
            <h1 className="sheet-title">Attendance Sheet</h1>
            <div className="attendance-table">
                <table>
                    <thead>
                        <tr>
                            <th>Registration ID</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Year</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.length > 0 ? (
                            attendanceData.map((student) => (
                                <tr
                                    key={student.registration_id}
                                    className={
                                        attendanceStatus[student.registration_id] === "present"
                                            ? "present-row"
                                            : attendanceStatus[student.registration_id] === "absent"
                                            ? "absent-row"
                                            : ""
                                    }
                                >
                                    <td>{student.registration_id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone_number}</td>
                                    <td>{student.year}</td>
                                    <td>{student.department}</td>
                                    <td>
                                        <button
                                            className="present-btn"
                                            onClick={() =>
                                                markAttendance(student.registration_id, "present")
                                            }
                                        >
                                            Present
                                        </button>
                                        <button
                                            className="absent-btn"
                                            onClick={() =>
                                                markAttendance(student.registration_id, "absent", student.student_id, student.event_id)
                                            }
                                        >
                                            Absent
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AttendanceSheet;
