import React from "react";
import HODNav from "./HODNav";
import Slider from "../Slider";

export default function HODDash(){
    return(
        <div>
            <HODNav/>
            <form className="dashform">
                <Slider/>
            </form>
            
        </div>
    );
}