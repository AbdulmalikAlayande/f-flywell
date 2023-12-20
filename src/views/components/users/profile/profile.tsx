import React, { useState } from "react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/profile/profile.css";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import ReactModal from "react-modal";
import EditProfilePicture from "./editProfilePicture";
import axios from "axios";
import { cloudinaryUploadUrl, modalStyle } from "../../../../utilities/utility.functions";

const Profile = () => {
  const imageUrl = localStorage.getItem("profileImageUrl");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(imageUrl?imageUrl:'')
  const [passportIdIsOpened, setPassportIdIsOpened] = useState<boolean>(false)
  const [flyerNumberIsOpened, setFlyerNumberIsOpened] = useState<boolean>(false)

  async function postToCloudinary(file?: File): Promise<any> {
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;
    const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

    const formData = new FormData()
    if(apiKey && apiSecret && uploadPreset){
        formData.append("public_id", `cloudinary_images/bola_air/user_media/image ${file?.name}`)
        formData.append("api_key", apiKey)
        formData.append("resource_type", "auto")
        formData.append("api_secret", apiSecret)
        formData.append("upload_preset", uploadPreset)
        formData.append("file", file as Blob)

        try {
          const response = await axios.post(cloudinaryUploadUrl, formData, {headers: {
            "Content-Type": "multipart/form-data",},
          })
          setProfileImage(response.data.secure_url)
          localStorage.setItem("profileImageUrl", response.data.secure_url)
        } catch (error) {
          console.error(error);
        }
      }
    }
  

  function openPopUp(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(true);
  }

  function copyData(event: React.MouseEvent<HTMLButtonElement>, value?: string): void {
    event.preventDefault();
    navigator.clipboard
             .writeText(value ? value : '')
             .then( response => console.log(response))
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
                  height={"40vh"} width={"40vh"}
                />:<img src={profileImage} alt="profile pic"/>}
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
                    <ButtonWithIcon 
                      id={"Passport-Id"} onClick={(event)=>{
                        event.preventDefault();
                        if(!passportIdIsOpened)
                          setPassportIdIsOpened(true)
                        else setPassportIdIsOpened(false)
                      }}  iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={!passportIdIsOpened ?"el:eye-open":"mdi:hide"}/>
                    <ButtonWithIcon 
                      icon={"solar:copy-bold"} onClick={(event)=>copyData(event, "0987654")}
                      iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue"
                    />
                  </p>
                </div>
                <p> <label>Date Of Birth: </label>{"Dec, 30 2002"} </p>
                <p> <label>Account Status: </label>{"-"} </p>
                <div id="Frequent-Flyer-Number-Ptag">
                  <p>
                    <label>Frequent Flyer Number: </label>{flyerNumberIsOpened?"2347809P":"*********"}
                  </p>
                  <p className={"View-And-Copy-Frame"}>
                    <ButtonWithIcon 
                      id={"Flyer-Number"} onClick={(event)=>{
                        event.preventDefault();
                        if(!flyerNumberIsOpened)
                          setFlyerNumberIsOpened(true)
                        else setFlyerNumberIsOpened(false)
                      }} iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" icon={!flyerNumberIsOpened? "el:eye-open":"mdi:hide"}/>
                    <ButtonWithIcon 
                      icon={"solar:copy-bold"} onClick={(event)=>copyData(event, "123456")}
                      iconHeight={'30px'} iconWidth={'30px'} iconColor="powderblue" 
                    />
                      </p>
                </div>
              </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
