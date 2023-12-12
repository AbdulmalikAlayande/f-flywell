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

const Profile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('')
  const [passportIdIsOpened, setpassportIdIsOpened] = useState<boolean>(false)
  const [flyerNumberIsOpened, setFlyerNumberIsOpened] = useState<boolean>(false)


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
          console.log('data', response.data);
          console.log('image url', response.data.secure_url);
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

  function openData(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    let eventTarget = event.target as HTMLButtonElement;
    console.log("event target id ==> ", eventTarget.id);
    if(eventTarget.id === "Passport-Id"){
      setpassportIdIsOpened(true)
      console.log("passportIdIsOpened is ", passportIdIsOpened)
    }
    else if(eventTarget.id === "Flyer-Number"){
      setFlyerNumberIsOpened(true)
      console.log("flyerNumberIsOpened is ", flyerNumberIsOpened)
    }
  }

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
                  height={"30vh"} width={"40vh"}
                />:<img src={profileImage} alt="profile image"/>}
                <ButtonWithIcon onClick={openPopUp} icon={"iconamoon:edit-thin"} iconHeight={"30px"}
                  iconWidth={"30px"} buttonPlaceHolder={""} iconColor="white"
                />
              </div>
              <div className={"BioData-Frame-Two"}>
                <p> <label>Email: </label>{"alaabdulmalik03@gmail.com"} </p>
                <p> <label>Name: </label>{"Abdulmalik Alayande"}</p>
                <p> <label>Username: </label>{"bol@B@ll@r"} </p>
                <div id="Passport-Id-Ptag"> 
                  <p className="">
                    <label>Passport Id: </label>{passportIdIsOpened?"3480865":"********"}
                  </p>
                  <p className={"View-And-Copy-Frame"}>
                    <ButtonWithIcon id={"Passport-Id"} onClick={openData} iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={!passportIdIsOpened ?"el:eye-open":"mdi:hide"}/>
                    <ButtonWithIcon iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={"solar:copy-bold"}/>
                  </p>
                </div>
                <p> <label>Date Of Birth: </label>{"Dec, 30 2002"} </p>
                <p> <label>Account Status: </label>{"-"} </p>
                <div id="Frequent-Flyer-Number-Ptag">
                  <p>
                    <label>Frequent Flyer Number: </label>{flyerNumberIsOpened?"2347809P":"*********"}
                  </p>
                  <p className={"View-And-Copy-Frame"}>
                    <ButtonWithIcon id={"Flyer-Number"} onClick={openData} iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={!flyerNumberIsOpened? "el:eye-open":"mdi:hide"}/>
                    <ButtonWithIcon iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={"solar:copy-bold"}/>
                  </p>
                </div>
              </div>
              </div>
              <div className="User-Profile-Main-Body-2">
                  <div className={"BioData-Frame-One"}>
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
