import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import '../../../../styles/components/users/admin/addNewFlight.css'
import { FLIGHT_BASE_URL } from "../../../../utilities/utility.functions";
import AuthInput from "../../reusableComponents/authInput";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";

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

    const [newFlightData, setNewFlightData] = useState(initialFlightData)
    const [currentStep, setCurrentStep] = useState<number>(0)
    const currentFormLabels = ["Flight Data", "AirportData"]

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // axios.post(FLIGHT_BASE_URL+"add-flight/", newFlightData)
        //     .then((response) => {
        //         console.log(response.data.responseData);
        //         console.log(response.data.message)
        //         toast.info(response.data.message, {position: toast.POSITION.TOP_CENTER})
        //         modalIsOpen(false)
        //     }).catch((error) => {
        //         console.log(error);
        //         toast.error(error.message, {position: toast.POSITION.TOP_CENTER})
        //     })
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setNewFlightData((previousValue) => ({
            ...previousValue, [event.target.name]: event.target.value
        }))
    }

    function setStepAndMove(step: number) {
        setCurrentStep(step)
        console.log("Step is ==> ", step, "current Step Is", currentStep);

    }


    return (
        <>
            <p className="Add-New-Flight-Header">Add New Flight</p>
            <div className="Progress-Bar-Form-Main-Frame">
                <p>Text</p>
                <div className="Progress-Bar-Frame">
                    <div className="Circle-1"><div className="Circle-1-Inner-Cirle"></div></div>
                    <div className="Main-Line">
                        <div className="Inner-Line-1"></div>
                        <div className="Inner-Line-2"></div>
                    </div>
                    <div className="Circle-2"><div className="Circle-2-Inner-Cirle"></div></div>
                </div>
                <div className="Next-And-Prev-Btn-Frame">
                    {<ButtonWithIcon 
                        value={0} onClick={()=>{
                            setStepAndMove(0)
                        }}
                        disabled={currentStep === 0}
                        icon={"icon-park-solid:back"}
                    />}
                    <ButtonWithIcon value={1} onClick={()=>{
                            setStepAndMove(1)
                        }}  
                        disabled={currentStep === 1}
                        icon={"icon-park-solid:next"} 
                    />
                </div>
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

                </form>
            </div>
        </>
    )
}
/*
<div>
    <button onClick={handleClick} type="submit">Add</button>
</div>                       
*/