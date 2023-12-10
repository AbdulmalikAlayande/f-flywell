import React from "react";
import "../../../styles/components/reusableComponents/dashboardSideBar.css";
import ButtonWithIcon from "./buttonWithIcon";
import Logo from "../../../assets/images/svg/logo-no-background.svg";
import { useNavigate } from "react-router-dom";

type CurrentWindow = {
  currentWindow?:
    | "Dashboard"
    | "Profile"
    | "MyTrips"
    | "Flights"
    | "Itinerary"
    | "Settings"
    | "LogOut";
};

const DashBoardSideBar = () => {
  const navigate = useNavigate();

  function navigateToDashBoard(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    let eventTarget = event.target as HTMLButtonElement;
    eventTarget.id = "CurrentWindow";
    console.log("event target ==> ", eventTarget);

    navigate(`/username/${eventTarget.value}`);
  }

  return (
    <div className="Dashbaord-Side-Bar-Main-Frame">
      <div className="Dashboard-Logo-Frame">
        <img src={Logo} />
      </div>
      <div className="Middle-Part">
        <ButtonWithIcon
          value={"dashboard"}
          onClick={(event) => navigateToDashBoard(event)}
          icon={"pixelarticons:dashbaord"}
          buttonPlaceHolder={"Dashboard"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
        <ButtonWithIcon
          value={"profile"}
          onClick={(event) => navigateToDashBoard(event)}
          icon={"gg:profile"}
          buttonPlaceHolder={"Profile"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
        <ButtonWithIcon
          value={"my-trips"}
          onClick={(event) => navigateToDashBoard(event)}
          icon={"icon-park-outline:round-trip"}
          buttonPlaceHolder={"My Trips"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
        <ButtonWithIcon
          value={"flight"}
          onClick={(event) => navigateToDashBoard(event)}
          icon={"mdi:flight"}
          buttonPlaceHolder={"Flight"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
        <ButtonWithIcon
          value={"create-itinerary"}
          onClick={(event) => navigateToDashBoard(event)}
          icon={"carbon:flight-roster"}
          buttonPlaceHolder={"Itinerary"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
      </div>
      <div className="Foot">
        <ButtonWithIcon
          icon={"material-symbols:settings-outline"}
          buttonPlaceHolder={"Settings"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
        <ButtonWithIcon
          icon={"ic:round-logout"}
          className={"Log-Out-Button"}
          buttonPlaceHolder={"Log Out"}
          iconHeight={"25px"}
          iconWidth={"25px"}
        />
      </div>
    </div>
  );
};
export default DashBoardSideBar;
