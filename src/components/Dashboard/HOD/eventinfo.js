import React, { useState ,useEffect} from "react";
import HODNav from "./HODNav";


export default function EventInfo(){
    const [events,setEvents] = useState([]);


    useEffect(()=>{
        const fetchEvents = async ()=>{
            try{
                let result = await fetch("http://localhost:5000/notification",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    }
                });
                result = await result.json();
                console.warn(result);
            }catch(e){
                console.error(e);
            }
        }
    })
    
    return(
        <div>
            <HODNav/>
            <form className="unapprovedEvents">

            </form>
            <form className="approvedEvents">

            </form>
        </div>
    )
}