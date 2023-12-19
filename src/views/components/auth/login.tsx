import React, { FormEvent, useState } from "react";
import AuthInput from "../reusableComponents/authInput";
import CallToActionButton from "../reusableComponents/callToActionButton";
import { Icon } from "@iconify/react";
import "../../../styles/components/auth/login.css";
import { LoginData, SignUpData } from "../../../styles/components/types";
import axios, { AxiosRequestConfig } from "axios";
import { loginUrl } from "../../../utilities/utility.functions";
import { useNavigate } from "react-router-dom";

const initialData: LoginData = {
  email: "",
  password: "",
};

const Login = () => {
  const [userData, setUserData] = useState<LoginData>(initialData);
  const [loginIsSuccessful, setLoginSuccessFul] = useState<boolean>(false);
  const navigateTo = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    postDataToBackend(userData, loginUrl);
  }

  function postDataToBackend(
    data: LoginData | SignUpData,
    postUrl?: string | URL,
    params?: AxiosRequestConfig
  ): any {
    let url = postUrl as string;
    console.log(postUrl);
    console.log(data);

    axios
      .post(url, data)
      .then((response) => {
        setLoginSuccessFul(true);
        console.log("login response data ==> ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        return error.message;
      })
      .finally(() => {
        if (loginIsSuccessful) {
          navigateTo("/username/dashboard");
        }
      });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    let eventTarget = event.target as HTMLInputElement;
    setUserData((previousValue) => ({
      ...previousValue,
      [eventTarget.type]: eventTarget.value,
    }));
  }

  return (
    <div className={"Login-Main-Frame"}>
      <form onSubmit={handleSubmit} className={"Login-Form"}>
        <div className="Login-Form-Inputs-Frame">
          <AuthInput
            inputType={"email"}
            inputLabel={"Email"}
            inputPlaceHolder={"johndoe@gmail.com"}
            onChange={handleInputChange}
            // regexPattern={emailPattern2}
            required
          />
          <AuthInput
            inputType={"password"}
            inputLabel={"Password"}
            inputPlaceHolder={"********"}
            onChange={handleInputChange}
            minimumLength={8}
            maximumLength={12}
            required
          />
        </div>
        <div className="Login-Submit-Button-Frame">
          <CallToActionButton
            type={"submit"}
            buttonPlaceHolder={"Login"}
            className={"Login-Submit-Button"}
          />
        </div>
      </form>
      <div className="Other-Login-Options">
        <div className="Option-Google">
          <button type="button">
            <Icon
              icon={"flat-color-icons:google"}
              height={"30px"}
              width={"30px"}
            />
            <p>Login With Google</p>
          </button>
        </div>
        <div className="Option-Facebook">
          <button type="button">
            <Icon icon="logos:facebook" height={"30px"} width={"30px"} />
            <p>Login With Facebook</p>
          </button>
        </div>
        <div className="Option-X">
          <button type="button">
            <Icon icon={"devicon:twitter"} height={"25px"} width={"25px"} />
            <p>Login With X</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
/*if(eventTarget.type === 'email'){
            let parentElementChildNodes = eventTarget.parentElement?.childNodes;
            if(parentElementChildNodes){
                const span = parentElementChildNodes[2]
                span.textContent = "Please provide a gmail, thanks"
            }
        }*/
