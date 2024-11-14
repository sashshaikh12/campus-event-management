import React, { useState ,useEffect} from "react";
import HODNav from "./HODNav";


export default function FacultyInfo(){
    const [faculties,setFaculties] = useState([]);
    useEffect(()=> {
        const fetchFaculty = async () =>{
            try{
                let result = await fetch("http://localhost:5000/facultyinfo",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                result = await result.json();
                setFaculties(result);
            }catch(e){
                console.error(e.message);
            }
        }

        fetchFaculty();
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
                        <th>Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {faculties.map(faculty => (
                        <tr key={faculty.Faculty_ID}>
                            <td>{faculty.Faculty_ID}</td>
                            <td>{faculty.Name}</td>
                            <td>{faculty.Department}</td>
                            <td>{faculty.Email}</td>
            
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}