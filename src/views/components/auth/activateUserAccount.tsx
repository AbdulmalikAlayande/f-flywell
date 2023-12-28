import React, { useState } from "react";
import "../../../styles/components/auth/activateUserAccount.css";
import BolaAirLogo from "../../../assets/images/jpg/logo-classic.jpg";
import ButtonWithIcon from "../reusableComponents/buttonWithIcon";
import axios from "axios";
import { SIGN_IN_BASE_URL } from "../../../utilities/utility.functions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      console.log("Totp length ==> "+TOTP.length);
      sendOTPToBackend()
    }
    else return;
  };

  function sendOTPToBackend(){
    console.log("at send otp");
    axios.post(SIGN_IN_BASE_URL+`activate-account/${TOTP}`)
          .then((response)=>{
            console.log("response data at send otp ==> ", response.data);
            if(response.data.statusCode === 201){
              console.log("hello");
              setAccountActivationSuccessful(true)
              navigate(`/${response.data.responseData.email}/dashboard`)
              console.log(response.data);
              console.log("user email ==> ", response.data.responseData.email);
            }
          })
          .catch((error)=>{
            toast.error(error.response.data.message, 
              {position: toast.POSITION.TOP_CENTER
            })
            console.log(error)
            setAccountActivationFailed(true)
          })
          .finally(()=>{
          })

  }

  function navigateToDashboard(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    let username = 'username';
    navigate(`/${username}/dashboard`);
  }
  
  function resendOTP(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
  }

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
                Didn't Receive An OTP,{" "}
                <button onClick={resendOTP}>Resend OTP</button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="Account-Activation-Successful-Div">
          <div className="Activation-Successful-Mark"></div>
          <p>
            Congratulations, Your Account Has Been Activated Successfully,
            <br />
            Click The Buttons Below To Either Go To Your Dashboard
            <br />
            Or Go Back To Our Home Page
          </p>
          <div className="Next-Steps">
            <ButtonWithIcon icon={"uil:home"} buttonPlaceHolder={"Home"} />
            <ButtonWithIcon
              onClick={navigateToDashboard}
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
