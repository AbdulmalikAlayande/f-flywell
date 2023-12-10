import React, { FormEvent, useState } from "react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/profile/profile.css";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import ReactModal from "react-modal";
import UseCamera from "./useCamera";
import EditProfilePicture from "./editProfilePicture";

const Profile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function postToCloudinary(event: FormEvent<HTMLFormElement>): void {}

  function openPopUp(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(true);
  }

  return (
    <div className={"User-Profile-Main-Frame"}>
      <DashBoardSideBar />
      <div className="Profile-Part-Two">
        <DashboardNavBar />
        <div className={"User-Profile-Main-Body"}>
          <ReactModal
            isOpen={isOpen}
            contentLabel="Example Modal"
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              content: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                height: "85vh",
                backgroundColor: "powderblue",
                border: "none",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "white",
              },
            }}
          >
            <EditProfilePicture />
          </ReactModal>
          <div className={"Profile-Image-Frame"}>
            <Icon
              className={"profile-icon"}
              icon={"gg:profile"}
              height={"48vh"}
              width={"60vh"}
              color={"powderblue"}
            />
            <ButtonWithIcon
              onClick={openPopUp}
              icon={"iconamoon:edit-thin"}
              iconHeight={"30px"}
              iconWidth={"30px"}
              buttonPlaceHolder={""}
              iconColor="white"
            />
          </div>
          <div className={"BioData-Frame-One"}>
            <p>
              <label>First Name: </label>
              {"Abdulmalik"}
            </p>
            <p>
              <label>Last Name: </label>
              {"Alayande"}
            </p>
            <p>
              <label>User Name: </label>
              {"bol@B@ll@r"}
            </p>
            <p>
              <label>Email: </label>
              {"alaabdulmalik03@gmail.com"}
            </p>
          </div>
          <div className={"BioData-Frame-Two"}>
            <p>
              <label>Frequent Flyer Number: </label>
              {"2347809P"}
            </p>
            <p>
              <label>Passport Id: </label>
              {"3480865"}
            </p>
            <p>
              <label>Date Of Birth: </label>
              {"Dec, 30 2002"}
            </p>
            <p>
              <label>Account Status: </label>
              {"-"}
            </p>
          </div>
          <div className={"Passport-Snapshot-Frame"}>
            <img src={""} alt={"Passport-Snapshot"}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
