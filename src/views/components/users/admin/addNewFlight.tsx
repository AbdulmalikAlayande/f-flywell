import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
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


    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>){
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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        setNewFlightData((previousValue)=>({
            ...previousValue, [event.target.name]: event.target.value 
        }))
    }

    function handleClick(){
        axios.get(
            'http://api.aviationstack.com/v1/cities?access_key='+process.env.REACT_APP_AVIATION_STACK_ACCESS_KEY
            ).then((res)=>{
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <p className="Add-New-Flight-Header">Add New Flight</p>
            <div className="Progress-Bar-Form-Main-Frame">
                <p>Text</p>
                <div className="Progress-Bar-Frame">
                    <div className="Circle-1"><div className="Circle-1-Inner-Cirle"></div></div>
                    <progress content='34' color='powderblue' value={50} max={100}></progress>
                    <div className="Circle-2"><div className="Circle-2-Inner-Cirle"></div></div>
                </div>
                <form onSubmit={handleFormSubmission} className="Add-New-Flight-Form">

                </form>
            </div>
        </>
    )
}
/*

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
                <div>
                    <button onClick={handleClick} type="submit">Add</button>
                </div>
            
*/