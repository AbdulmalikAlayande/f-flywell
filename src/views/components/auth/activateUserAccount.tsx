import React, { useEffect, useState } from "react";
import "../../../styles/components/auth/activateUserAccount.css";
import BolaAirLogo from "../../../assets/images/jpg/logo-classic.jpg";
import ButtonWithIcon from "../reusableComponents/buttonWithIcon";
import axios from "axios";
import { BASE_URL } from "../../../utilities/utility.functions.d";
import { useNavigate } from "react-router-dom";

const ActivateUserAccount = () => {
  let [TOTP, setTOTP] = useState<string>("");
  const navigate = useNavigate()
  const [accountActivationSuccessful, setAccountActivationSuccessful] = useState<boolean>(false);
  const [accountActivationFailed, setAccountActivationFailed] = useState<boolean>(false)

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let eventTarget = event.target as HTMLInputElement;
    setTOTP(TOTP+=eventTarget.value)
    if(TOTP.length === 6){
      console.log("Totp lenght ==> "+TOTP.length);
      sendOTPToBackend()
    }
    else return;
  };

  function sendOTPToBackend(){
    console.log("at send otp");
    let userEmail: string = ""
    axios.post(BASE_URL+`activate-account/${TOTP}`)
          .then((response)=>{
            console.log("response data at send otp ==> ", response.data);
            if(response.data.status === 201){
              setAccountActivationSuccessful(true)
              navigate(`${userEmail}/dashboard`)
              console.log(response.data);
              userEmail = response.data.data.userEmail;
              console.log("user email ==> ", userEmail);
            }
          })
          .catch((error)=>{
            setAccountActivationFailed(true)
          })
          .finally(()=>{
          })

  }

  
  function resendOTP(event: React.MouseEvent<HTMLButtonElement>): void {}

  return (
    <div className="Activate-User-Account-Main-Frame">
      {!accountActivationSuccessful ? (
        <div className="Activate-User-Account-Inner-Frame">
          <div className="Part-1">
            <div className="Logo-Frame">
              <img src={BolaAirLogo} alt="Logo" />
            </div>
            <p className="Prompt">
              We Sent An OTP To Your Mail At {localStorage.getItem("email")},
              Please Enter The OTP Sent To You, To Activate Your Account
            </p>
          </div>
          <div className="Input-Fields-Main-Frame">
            <div className="Input-Fields-Frame">
              <form className="Input-Fields-Form">
                <input
                  id={"OTPInput"}
                  tabIndex={0}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
                <input
                  id={"OTPInput"}
                  tabIndex={1}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
                <input
                  id={"OTPInput"}
                  tabIndex={2}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
                <input
                  id={"OTPInput"}
                  tabIndex={3}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
                  <input
                  id={"OTPInput"}
                  tabIndex={2}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
                  <input
                  id={"OTPInput"}
                  tabIndex={2}
                  placeholder={"0"}
                  onChange={handleChangeEvent}
                  type="text"
                  required
                />
              </form>
            </div>
            <div className="Didnt-Receive-OTP">
              <p>
                Didn't Recieve An OTP,{" "}
                <button onClick={resendOTP}>Resend OTP</button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="Account-Activation-Successful-Div">
          <div className="Activation-Successful-Mark"></div>
          <p>
            Congratulations, Your Account Has Been Activated Succcessfully,
            <br />
            Click The Buttons Below To Either Go To Your Dashboard
            <br />
            Or Go Back To Our Home Page
          </p>
          <div className="Next-Steps">
            <ButtonWithIcon icon={"uil:home"} buttonPlaceHolder={"Home"} />
            <ButtonWithIcon
              icon={"pixelarticons:dashbaord"}
              buttonPlaceHolder={"Dashboard"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivateUserAccount;
