import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FLIGHT_BASE_URL } from "../../../../utils/functions";
import AuthInput from "../../reusables/authInput";
import ButtonWithIcon from "../../reusables/buttonWithIcon";
import {AirportSelection} from "./airportSelection";

type Props = {
    modalIsOpen: (value: boolean) => void
}

const initialFlightData = {
    airline: "",
    displayImageName: "",
    estimatedFlightDurationInMinutes: 0,
    arrivalCity: "",
    departureCity: ""
}

export default function AddNewFlight({ modalIsOpen }: Props) {

    const [newFlightData, setNewFlightData] = useState<object>(initialFlightData)
    const [currentStep, setCurrentStep] = useState<number>(0)
    const currentFormLabels = ["Flight Data", "Departure Airport Data", "Arrival Airport Data"]
    

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post(FLIGHT_BASE_URL+"add-flight/", newFlightData)
            .then((response) => {
                console.log(response.data.responseData);
                console.log(response.data.message)
                toast.info(response.data.message, {position: toast.POSITION.TOP_CENTER})
                modalIsOpen(false)
            }).catch((error) => {
                console.log(error);
                toast.error(error.message, {position: toast.POSITION.TOP_CENTER})
            })
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setNewFlightData((previousValue) => ({
            ...previousValue, [event.target.name]: event.target.value
        }))
    }

    function setStepAndMove(step: number) {
        setCurrentStep(currentStep+(step))
    }

    return (
        <>
            <p className="Add-New-Flight-Header">Add New Flight</p>
            <div className="Progress-Bar-Form-Main-Frame">
                <p>{currentFormLabels[currentStep]}</p>
                <div className="Next-And-Prev-Btn-Frame">
                    {<ButtonWithIcon
                        value={0} onClick={()=>{
                            setStepAndMove(-1)
                        }}
                        disabled={currentStep === 0}
                        icon={"icon-park-solid:back"}
                    />}
                    <ButtonWithIcon value={1} onClick={()=>{
                            setStepAndMove(1)
                        }}
                        disabled={currentStep === 2}
                        icon={"icon-park-solid:next"}
                    />
                </div>
                <form onSubmit={handleFormSubmission} className="Add-New-Flight-Form">
                    {currentStep === 0 && <>
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
                            inputLabel={'Flight Duration'} inputType={"number"}
                            inputPlaceHolder={"2hrs"}
                            name={'estimatedFlightDurationInMinutes'} required
                        />
                        <AuthInput
                            inputLabel={'Airline'} inputType={"text"}
                            inputPlaceHolder={"Bola-Air"}
                            spellCheck={false}
                            name={'airline'} required
                        />
                    </>}
                     <AirportSelection currentStep={currentStep}/>
                </form>
            </div>
        </>
    )
}
/*
 <div className="Add-New-Flight-Form-Submit-Button-Frame">
                            <button type="submit">Add</button>
                        </div>                      
*/