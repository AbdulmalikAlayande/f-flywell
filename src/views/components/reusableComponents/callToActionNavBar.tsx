import CallToActionButton from "./callToActionButton";
import React from "react";
import "../../../styles/components/reusableComponents/callToActionNavBar.css";
import Logo from "../../../assets/images/jpg/logo-classic.jpg";


function CallToActionNavBar() {
    return <div className="Call-To-Action-Navbar">
        <div className="Logo-Frame">
            <img src={Logo} alt="" />
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