import React, { FormEvent, useState } from "react";
import AuthInput from "../reusableComponents/authInput";
import CallToActionButton from "../reusableComponents/callToActionButton";
import { Icon } from "@iconify/react";
import "../../../styles/components/auth/signUp.css";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpData, LoginData } from "../../../styles/components/types";
import { signUpUrl } from "../../../utilities/utility.functions";

const initialData: SignUpData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const SignUp = () => {
  const [userData, setUserData] = useState<SignUpData>(initialData);
  const [signUpIsSuccessful, setSignUpSuccessFul] = useState<boolean>(false);
  const navigateTo = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    let eventTarget = event.target as HTMLInputElement;
    setUserData((previousValue) => ({
      ...previousValue,
      [eventTarget.name]: eventTarget.value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    postDataToBackend(userData, signUpUrl).then((response)=>{
        return response.data
    });
  }

  function changeButtonColor(event: React.MouseEvent<HTMLButtonElement>){
    let eventTarget = event.target as HTMLButtonElement;
    eventTarget.style.backgroundColor = "red";
  }
  async function postDataToBackend(
    data: LoginData | SignUpData, postUrl?: string | URL, params?: AxiosRequestConfig
  ): Promise<any> {
    let url = postUrl as string;
    await axios
      .post(url, data)
      .then((response) => {
        if(response.data.statusCode === 201){
          setSignUpSuccessFul(true)
          navigateTo("/signup/activate-account");
        }
        setSignUpSuccessFul(true);
        console.log("response data at sign up ==> ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error);
        return error.message;
      })
      .finally(() => {
        if (signUpIsSuccessful) {
        }
      });
  }

  return (
    <div className={"SignUp-Main-Frame"}>
      <form onSubmit={handleSubmit} className={"SignUp-Form"}>
        <div className="SignUp-Form-Inputs-Frame">
          <AuthInput
            name={"firstName"}
            inputType={"text"}
            inputPlaceHolder={"john"}
            inputLabel={"First Name"}
            onChange={handleInputChange}
            required
          />
          <AuthInput
            name={"lastName"}
            inputType={"text"}
            inputPlaceHolder={"doe"}
            inputLabel={"Last Name"}
            onChange={handleInputChange}
            required
          />
          <AuthInput
            name={"email"}
            inputType={"email"}
            inputPlaceHolder={"johndoe@gmail.com"}
            inputLabel={"Email"}
            onChange={handleInputChange}
            required
          />
          <AuthInput
            name={"password"}
            inputType={"password"}
            inputPlaceHolder={"********"}
            inputLabel={"Password"}
            onChange={handleInputChange}
            required
          />
          <AuthInput
            name={"phoneNumber"}
            inputType={"tel"}
            inputPlaceHolder={"+2347036174617"}
            inputLabel={"Phone Number"}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={"SignUp-Submit-Button-Frame"}>
          <CallToActionButton
            type={"submit"}
            buttonPlaceHolder={"SignUp"}
            className={"SignUp-Submit-Button"}
            onClick={changeButtonColor}
          />
        </div>
      </form>
      <div className="Other-SignUp-Options">
        <div className="Option-Google">
          <button type="button">
            <Icon
              icon={"flat-color-icons:google"}
              height={"25px"}
              width={"25px"}
            />
            <p>SignUp With Google</p>
          </button>
        </div>
        <div className="Option-Facebook">
          <button type="button">
            <Icon icon="logos:facebook" height={"30px"} width={"30px"} />
            <p>SignUp With Facebook</p>
          </button>
        </div>
        <div className="Option-X">
          <button type="button">
            <Icon icon={"devicon:twitter"} height={"25px"} width={"25px"} />
            <p>SignUp With Facebook</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
