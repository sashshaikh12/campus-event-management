import React, { useState ,useEffect} from "react";
import HODNav from "./HODNav";

export default function StudentInfo(){
    const [students,setStudents] = useState([]);
    const [refresh,setRefresh] = useState(false);
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
            }catch(e){
                console.error(e.message);
            }
        }

        fetchStudents();
    },[refresh]);


    async function BlacklistStudent(id,blacklist) {
        console.log({id,blacklist});
        const reqbody = { id,blacklist };
        try {
            let result = await fetch("http://localhost:5000/blacklist", {
                method: "POST",
                body: JSON.stringify(reqbody),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            result = await result.json();
            console.warn(result);
            setRefresh(prev=>!prev);
        } catch (e) {
            console.log(e);
        }
    };

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
                                <button className="blacklistButton" onClick={()=>BlacklistStudent(student.Student_ID,student.Blacklist_status)} >Blacklist</button>                            
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};