import React, { useState } from "react";


function GiveAppeal() {
    const [appeal, setAppeal] = useState("");

    const SendAppeal = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const auth = localStorage.getItem("user");
        const userDetails = JSON.parse(auth);
        console.log(userDetails);
        const reqbody = { studentid: userDetails.Student_ID, appeal };
        console.log(reqbody);
        let result = await fetch("http://localhost:5000/giveAppeal", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        console.log(result);
        alert("Appeal submitted successfully");
        setAppeal("");
    };

    return (
        <div>
            <div className="appealNav">
                <img className="appealLogo" src="/newpeslogo.png" alt="pes university logo" />
            </div>
            <div className="appealContainer">
                <h1>Give Appeal</h1>
                <form className="appealForm">
                    <label className="appealLabel">Enter your appeal:</label>
                    <input
                        type="text"
                        name="appeal"
                        className="appealInput"
                        value={appeal}
                        onChange={(e) => setAppeal(e.target.value)}
                    />
                    <button type="submit" className="appealButton" onClick={SendAppeal}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default GiveAppeal;