import * as React from 'react';
import AuthInput from "../../../reusables/authInput";
import {useState} from "react";
import axios from "axios";
import {ADMIN_BASE_URL} from "../../../../../utils/utility.functions";
import {toast, ToastContainer} from "react-toastify";
import { Icon } from "@iconify-icon/react";
import Logger from '@src/utils/logger';

const initialInvitationData = {
    email: "",
    phoneNumber: "",
    notificationPreference: ""
}

type Props ={
    modalIsOpen: (value: boolean)=>void
}
export default function InviteAdmin({modalIsOpen}: Props) {
    
    const [invitationData, setInvitationData] = useState(initialInvitationData);
    const [invitationSuccessful, setInvitationSuccessful] = useState<boolean>(false);
    
    async function sendInvitationDetails(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await axios.post(ADMIN_BASE_URL+"invite-admin/", invitationData)
                .then((response) => {
                    console.log("Hi Hi response ===> "+response.data.responseData.message);
                    if(response.data.statusCode === 201){
                        setInvitationSuccessful(true)
                        toast.success(response.data.responseData.message)
                        modalIsOpen(false)
                    }
                    else if (response.data.statusCode === 400){
                        setInvitationSuccessful(false)
                        toast.error(response.data.responseData.message)
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    toast.error(error.response.data.message)
                    console.log(error.respose.data.message)
                })
        }catch (error: unknown) {
            Logger.error((error as Error).message)
        }
    }
    
    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('event target id is ==> '+event.target.id)
        setInvitationData((prevState) => ({
            ...prevState, [event.target.id]: event.target.value,
        }))
    }
    
    return (
        <>
            <ToastContainer/>
            {invitationSuccessful ?
                (<div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'space-evenly',
                    alignItems: "center",
                    width: '100%',
                    height: '100%',
                    fontSize: '18px',
                    fontWeight: '600'
                }}>
                    <Icon color={'powderblue'} height={'20vh'} width={'20vw'} icon={'clarity:success-standard-solid'}/>
                    <p>An Invitation Mail Has Been Sent To {invitationData.email}</p>
                </div>) : (<form onSubmit={sendInvitationDetails} className={'Admin-Invitation-Form'}>
                        <AuthInput id={'email'} onChange={handleInputChange} inputType={'email'} inputPlaceHolder={'johndoe@gmail.com'} inputLabel={'Email'} required={true}/>
                        <div className={'Form-Field-Choice-Separator-Frame'}>
                            <div className={'Separator-Frame'}></div>
                            OR
                            <div className={'Separator-Frame'}></div>
                        </div>
                        <AuthInput id={'phoneNumber'} inputType={'tel'} inputPlaceHolder={'+234 000 000 000 0'} inputLabel={'Phone Number'} />
                        <div className={'Admin-Invite-Submit-Button-Frame'}>
                            <button>Invite</button>
                        </div>
                    </form>)
            }
        </>
    );
};