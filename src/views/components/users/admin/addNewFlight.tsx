import axios from "axios";
import React, { useState } from "react";
import '../../../../styles/components/users/admin/addNewFlight.css'
import { FLIGHT_BASE_URL } from "../../../../utilities/utility.functions";
import AuthInput from "../../reusableComponents/authInput";

type Props={
    modalIsOpen: (value: boolean)=>void
}

const initialFlightData = {
    airline: "",
    displayImageName: "",
    estimatedFlightDurationInMinutes: 0,
    arrivalCity: "",
    departureCity: ""
}

export default function AddNewFlight({ modalIsOpen }: Props){

    const [newFlightData, setNewFlightData] = useState(initialFlightData)

    modalIsOpen(true)

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        axios.post(FLIGHT_BASE_URL+"add-flight/")
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        setNewFlightData((previousValue)=>({
            ...previousValue, [event.target.name]: event.target.value 
        }))
    }
    return (
        <>
            <h1 className="Add-New-Flight-Header">Add New Flight</h1>
            <form onSubmit={handleFormSubmission} className="Add-New-Flight-Form">
                <AuthInput 
                    inputLabel={'Arrival City'} inputType={"text"} 
                    inputPlaceHolder={"Lagos, Nigeria"} 
                    spellCheck={false} onChange={handleInputChange}
                    name={'arrivalCity'} required    
                />
                <AuthInput 
                    inputLabel={'Departure City'} inputType={"text"} 
                    inputPlaceHolder={"Abuja, Nigeria"}
                    spellCheck={false}
                    name={'departureCity'} required 
                />
                <AuthInput 
                    inputLabel={'Display Image Name'} inputType={"text"} 
                    inputPlaceHolder={"merlion"}
                    spellCheck={false} 
                    name={'displayImageName'} required
                />
                <AuthInput 
                    inputLabel={'Flight Duration'} inputType={"time"} 
                    inputPlaceHolder={"2hrs"} 
                    name={'estimatedFlightDurationInMinutes'} required
                />
                <AuthInput 
                    inputLabel={'Airline'} inputType={"text"} 
                    inputPlaceHolder={"Bola-Air"} 
                    spellCheck={false}
                    name={'airline'} required
                />
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}