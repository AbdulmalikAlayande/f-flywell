import React from "react";
import '../../../../styles/components/users/admin/addNewFlight.css'
import AuthInput from "../../reusableComponents/authInput";

type Props={
    modalIsOpen: (value: boolean)=>void
}

export default function AddNewFlight({ modalIsOpen }: Props){

    modalIsOpen(true)

    return (
        <>
            <h1 className="Add-New-Flight-Header">Add New Flight</h1>
            <form className="Add-New-Flight-Form" action="" method="post">
                <AuthInput 
                    inputLabel={'Arrival City'} inputType={"text"} 
                    inputPlaceHolder={"Lagos, Nigeria"} 
                />
                <AuthInput 
                    inputLabel={'Departure City'} inputType={"text"} 
                    inputPlaceHolder={"Abuja, Nigeria"} 
                />
                <AuthInput 
                    inputLabel={'Display Image Name'} inputType={"text"} 
                    inputPlaceHolder={"merlion"} 
                />
                <AuthInput 
                    inputLabel={'Flight Duration'} inputType={"time"} 
                    inputPlaceHolder={"2hrs"} 
                />
                <AuthInput 
                    inputLabel={'Airline'} inputType={"text"} 
                    inputPlaceHolder={"Bola-Air"} 
                />
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}