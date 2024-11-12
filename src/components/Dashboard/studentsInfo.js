import React, { useState ,useEffect} from "react";
import HODNav from "./HODNav";

export default function StudentInfo(){
    const [students,setStudents] = useState([]);
    useEffect(()=> {
        const fetchStudents = async () =>{
            try{
                let result = await fetch("http://localhost:5000/studentinfo",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                result = await result.json();
                setStudents(result);
                console.log(result);
            }catch(e){
                console.error(e.message);
            }
        }

        fetchStudents();
    },[]);

    return(
        <div>
            <HODNav/>
            <h1 className="studentinfo">Student Information</h1>
            <table className="studentTable">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Blacklist Status</th>
                        <th>Absent Count</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.Student_ID}>
                            <td>{student.Student_ID}</td>
                            <td>{student.Name}</td>
                            <td>{student.Department}</td>
                            <td>{student.Year}</td>
                            <td>{student.Email}</td>
                            <td>{student.Blacklist_status}</td>
                            <td>{student.Absent_count}</td>
                            <td>
                                <button className="blacklistButton" >Blacklist</button>                            
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};