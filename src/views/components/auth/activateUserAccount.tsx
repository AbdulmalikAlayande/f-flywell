import React, { useEffect, useState } from "react";
import "../../../styles/components/auth/activateUserAccount.css";
import BolaAirLogo from "../../../assets/images/jpg/logo-classic.jpg";
import ButtonWithIcon from "../reusableComponents/buttonWithIcon";

const ActivateUserAccount = () => {
  let [OTP, setOTP] = useState<string>("");
  const [accountActivationSuccessful, setAccountActivationSuccessful] =
    useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("email", "alaabdulmalik03@gmail.com");
  }, []);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let eventTarget = event.target as HTMLInputElement;
    if(eventTarget.value.length > 1){
      let elementPosition = eventTarget.tabIndex;
      let allInputElements = document.querySelectorAll('#OTPInput');
      for (let inputTabIndex = elementPosition, eventValueIndex = 0; inputTabIndex < allInputElements.length, eventValueIndex < allInputElements.length; inputTabIndex++) {
        const element = allInputElements[inputTabIndex];
        let currentElementValue = eventTarget.value.charAt(eventValueIndex)
        console.log("current element value ==> ", currentElementValue)
        element.textContent = currentElementValue;
        eventValueIndex++;
      }
      console.log("pos", elementPosition)
    }
  };

  function fillEmptyFields(value: String) {
  }

  function dontProcessOTP() {}

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
