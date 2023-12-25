import * as React from 'react';
import AuthInput from "../reusableComponents/authInput";
import CallToActionButton from "../reusableComponents/callToActionButton";
import {useState} from "react";
import axios from "axios";
import '../../../styles/components/auth/adminSignUp.css';
import {ADMIN_BASE_URL} from "../../../utilities/utility.functions";
import {toast, ToastContainer} from "react-toastify";
import {position} from "@cloudinary/url-gen/qualifiers/timeline";
import {useNavigate} from "react-router-dom";

type SignUpData ={
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    adminCode: string
}

const initialData: SignUpData = {
    adminCode: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
};

function AdminSignUp() {
    
    const [signUpData, setSignUpData] = useState<SignUpData>(initialData);
    const navigate = useNavigate();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await axios.post(ADMIN_BASE_URL+"create-admin-account/", signUpData)
            .then((response)=>{
                console.log(response)
                toast.success(response.data.responseData.message, {position: "top-center"})
            }).catch((error) => {
                if (error.response.data.message){
                    toast.error(error.response.data.message, {position: "top-center"})
                    console.log(error.response)
                    console.log(error)
                }
                else toast.error(error.message)
            })
    }
    
    function handleInputChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setSignUpData((prevState) =>( {
            ...prevState,
            [event.target.name]: event.target.value ,
        }))
    }
    
    function handleInvalidEvent(event: React.FormEvent<HTMLInputElement>) {
    
        
    }
    
    return (
        <div className={"Admin-SignIn-Main-Frame"}>
            <form onSubmit={handleSubmit} className={"Admin-SignIn-Main-Form"}>
                <div className={"Inputs-Frame"}>
                    <AuthInput
                        inputPlaceHolder={"John"} required={true}
                        inputLabel={"First Name"} inputType={"text"}
                        name={"firstName"} onChange={handleInputChangeEvent}
                    />
                    <AuthInput
                        inputPlaceHolder={"Doe"} required={true}
                        inputLabel={"Last Name"} inputType={"text"}
                        name={"lastName"} onChange={handleInputChangeEvent}
                    />
                    <AuthInput
                        inputLabel={"Email"} inputType={"email"}
                        name={"email"} onChange={handleInputChangeEvent}
                        inputPlaceHolder={"johndoe@gmail.com"} required={true}
                    />
                    <AuthInput
                        inputLabel={"Phone Number"} inputType={"tel"}
                        inputPlaceHolder={"07036174617"} required={true}
                        name={"phoneNumber"} onChange={handleInputChangeEvent}
                    />
                    <AuthInput
                        inputLabel={"Password"} inputType={"text"}
                        inputPlaceHolder={"**********"} required={true}
                        name={"password"} onChange={handleInputChangeEvent}
                        minimumLength={8}
                    />
                    <AuthInput
                        inputLabel={"Admin Code"} inputType={"text"}
                        inputPlaceHolder={"xxxxxxxxx"} required={true}
                        name={"adminCode"} onChange={handleInputChangeEvent}
                        onInvalid={handleInvalidEvent}
                    />
                </div>
                <CallToActionButton type={"submit"} buttonPlaceHolder={"Sign Up"}/>
            </form>
        </div>
    );
}

export default AdminSignUp;
//event.preventDefault();
//         let eventTarget = event.target as HTMLInputElement;
//         if (eventTarget.name === "password" && eventTarget.nextElementSibling)
//             eventTarget.nextElementSibling.textContent = "The Password Must Be At Least 8 Characters Long" +
//                                                          "Contain At Least One Special Character" +
//                                                          "Contain One UpperCase Letter"