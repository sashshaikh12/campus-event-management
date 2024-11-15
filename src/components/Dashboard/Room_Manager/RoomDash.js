import React from "react";
import RoomManagerNAV from "./RoomManagerNav";
import Slider from "../Slider";

export default function RoomDash(){
    return(
        <div>
            <RoomManagerNAV/>
            <form className="dashform">
                <Slider/>
            </form>
            
        </div>
    );
}