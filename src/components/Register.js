import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";



export default function Register(){
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
           navigate("/Home");
        }
    })

    const collectData = async () =>{
        console.warn(name, email, password);
        const reqbody = {name, email, password};
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify(reqbody),
            headers:{
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();   
        console.warn(result);
        localStorage.setItem("user", result);
        if(result){
            navigate("/home");
        }
    }

    return(
        <form className="login">
            <form>

                <h1>REGISTER</h1>
                <input type="text" id="username" placeholder="Enter your username"   className="LoginInput" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input type="email" id="Email" placeholder="Enter your E-mail ID"  className="LoginInput" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" id="password" autoComplete="on" placeholder="Enter your password" className="LoginInput" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <button type="button" onClick={collectData} className="SubmitButton">SUBMIT</button>
            </form>
            <p>Already have an account?<a href="/">Login</a></p>
        </form>
    )
}