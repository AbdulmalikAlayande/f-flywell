import React, { useState } from "react";
import BolaAirLogo from "../../../assets/images/jpg/logo-classic.jpg";
import ButtonWithIcon from "../reusables/buttonWithIcon";
import axios from "axios";
import { SIGN_IN_BASE_URL } from "../../../utils/utility.functions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Logger from "../../../utils/logger";

const ActivateUserAccount = () => {
    const [otp, setOtp] = useState<string>("");
    const navigate = useNavigate()
    const [accountActivationSuccessful, setAccountActivationSuccessful] = useState<boolean>(false);

    const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.preventDefault();
        const eventTarget = event.target as HTMLInputElement;
        setOtp(otp+eventTarget.value)

        if(otp.length === 6){
            sendOTPToBackend()
        }
        else return;
    };

    function sendOTPToBackend(){
        axios.post(SIGN_IN_BASE_URL+`activate-account/${otp}`)
        .then((response)=>{
            if(response.data.statusCode === 201){
                console.log("hello");
                setAccountActivationSuccessful(true)
                navigate(`/${response.data.responseData.email}/dashboard`)
                Logger.success("Response Data:: "+response.data);
            }
        }).catch((error)=>{
              toast.error(error.response.data.message, 
                {position: toast.POSITION.TOP_CENTER
              })
              Logger.error(error)
        })
    }

    function navigateToDashboard(event: React.MouseEvent<HTMLButtonElement>){
      event.preventDefault();
      const username = 'username';
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
