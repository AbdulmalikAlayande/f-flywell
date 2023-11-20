import {Icon} from "@iconify/react";
import CallToActionButton from "./callToActionButton";
import React from "react";
import "../../../styles/components/reusableComponents/callToActionNavBar.css"

function CallToActionNavBar() {
    return <div className="Call-To-Action-Navbar">
        <div className="Logo-Frame">
            <Icon className={"Logo-Icon"} icon={"noto:airplane"} height={"40px"} width={"40px"}/>
            <label>Bola-Air</label>
        </div>
        <div className="Call-To-Action-Frame">
            <CallToActionButton buttonPlaceHolder={"Home"} className="Action-Button"/>
            <CallToActionButton buttonPlaceHolder={"About"} className="Action-Button"/>
            <CallToActionButton buttonPlaceHolder={"Socials"} className="Action-Button"/>
            <CallToActionButton buttonPlaceHolder={"Services"} className="Action-Button"/>
        </div>
    </div>;
}

export default CallToActionNavBar