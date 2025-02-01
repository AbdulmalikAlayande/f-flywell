import CallToActionButton from "./callToActionButton";
import React from "react";
import "../../../styles/components/reusableComponents/callToActionNavBar.css";
import Logo from "../../../assets/images/svg/logo-no-background.svg";

function CallToActionNavBar() {
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    let eventTarget = event.target as HTMLButtonElement;
    let currentButton = document.querySelector(`.${eventTarget.className}`);
    if (currentButton) currentButton.className = "Current-Button";
  }

  return (
    <div className="Call-To-Action-Navbar">
      <div className="Call-To-Action-Navbar-Logo-Frame">
        <img src={Logo} alt="" />
      </div>
      <div className="Call-To-Action-Frame">
        <CallToActionButton
          onClick={handleClick}
          buttonPlaceHolder={"Home"}
          className="Action-Button"
        />
        <CallToActionButton
          buttonPlaceHolder={"About"}
          className="Action-Button"
        />
        <CallToActionButton
          buttonPlaceHolder={"Socials"}
          className="Action-Button"
        />
        <CallToActionButton
          buttonPlaceHolder={"Services"}
          className="Action-Button"
        />
      </div>
    </div>
  );
}

export default CallToActionNavBar;
