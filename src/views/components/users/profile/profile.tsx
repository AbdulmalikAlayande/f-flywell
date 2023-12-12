import React, { FormEvent, useState } from "react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/profile/profile.css";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import ReactModal from "react-modal";
import UseCamera from "./useCamera";
import EditProfilePicture from "./editProfilePicture";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

const Profile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('')


  async function postToCloudinary(file?: File): Promise<any> {
    const cloudName =  process.env.REACT_APP_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
    const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

    const formData = new FormData()
    if(apiKey && apiSecret && uploadPreset){
      console.log("at profile file is ===> ", file)
        formData.append("public_id", "cloudinary_images/bola_air/user_media/image")
        formData.append("api_key", apiKey)
        formData.append("resource_type", "auto")
        formData.append("api_secret", apiSecret)
        formData.append("upload_preset", uploadPreset)
        formData.append("file", file as Blob)
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        console.log(url);
        
        try {
          const response = await axios.post(url, formData, {headers: {
            "Content-Type": "multipart/form-data",},
          });
          console.log(response.data);
          setProfileImage(response.data.secure_url)
          return response.data.secure_url
        } catch (error) {
          console.error(error);
        }
      }
    }
  

  function openPopUp(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(true);
  }

  const modalStyle: ReactModal.Styles = {
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
  };

  return (
    <div className={"User-Profile-Main-Frame"}>
      <DashBoardSideBar />
      <div className="Profile-Part-Two">
        <DashboardNavBar />
        <div className={"User-Profile-Main-Body"}>
          <div className="User-Profile-Main-Body-1">
              <ReactModal isOpen={isOpen} contentLabel={"Example Modal"} onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false} style={modalStyle}>
                <EditProfilePicture method={postToCloudinary}/>
              </ReactModal>
              <div className={"Profile-Image-Frame"}>
                {profileImage === ""? <Icon className={"profile-icon"} icon={"gg:profile"} 
                  height={"48vh"} width={"60vh"}
                />:<img src={profileImage} alt="profile image"/>}
                <ButtonWithIcon onClick={openPopUp} icon={"iconamoon:edit-thin"} iconHeight={"30px"}
                  iconWidth={"30px"} buttonPlaceHolder={""} iconColor="white"
                />
              </div>
              <div className={"BioData-Frame-Two"}>
                <p> <label>Frequent Flyer Number: </label>{"2347809P"} </p>
                <p> <label>Passport Id: </label>{"3480865"} </p>
                <p><label>Date Of Birth: </label>{"Dec, 30 2002"} </p>
                <p><label>Account Status: </label>{"-"} </p>
              </div>
              </div>
              <div className="User-Profile-Main-Body-2">
                  <div className={"BioData-Frame-One"}>
                      <p> <label>First Name: </label>{"Abdulmalik"} </p>
                      <p> <label>Last Name: </label>{"Alayande"} </p>
                      <p> <label>User Name: </label>{"bol@B@ll@r"} </p>
                      <p> <label>Email: </label>{"alaabdulmalik03@gmail.com"} </p>
                  </div>
                  <div className={"Passport-Snapshot-Frame"}>
                    <img src={""} alt={"Passport-Snapshot"}></img>
                  </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
