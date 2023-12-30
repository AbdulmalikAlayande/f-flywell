import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { toast } from "react-toastify";
import '../../../../styles/components/users/admin/addNewFlight.css'
import { FLIGHT_BASE_URL } from "../../../../utilities/utility.functions";
import { PostmanCountriesData } from "../../../interfaces/interface";
import AuthInput from "../../reusableComponents/authInput";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import { useFetchCities } from "./useFetchCities";

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
    const currentFormLabels = ["Flight Data", "Airport Data"]
    const {data, error, isLoading} = useFetchCities<PostmanCountriesData>({queryKey: [""]})
    const [countryOptions, setCountryOptions] = useState<{value: string, label: string}[]>([])
    const [cityOptions, setCityOptions] = useState<{value: string, label: string}[]>([])

    useEffect(()=>{
        if(data){
            setCountryOptions(
                data.data.map((country)=>{
                    return {value: country.country, label: country.country}
                })
            )
    }}, [data])

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
        setCurrentStep(step)
        console.log("Step is ==> ", step, "current Step Is", currentStep);
    }

    function handleCountrySelectionChange(countryData?: any) {
        const cityOptions: {value: string, label: string}[] = []
        const citiesInCountryData = data?.data.filter(country => country.country===countryData.value)          
        citiesInCountryData?.map((country, index) => {
            country.cities.map((city, index)=>{
                cityOptions.push({
                    value: city,
                    label: city,
                })
            })
        })
        setCityOptions(cityOptions)
    }

    function handleCitySelectionChange(event: any){
        console.log(event)
    }

    return (
        <>
            <p className="Add-New-Flight-Header">Add New Flight</p>
            <div className="Progress-Bar-Form-Main-Frame">
                <p>{currentFormLabels[currentStep]}</p>
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
                    {currentStep === 1 && <>
                        <div className={"Select-Frame"}>
                            <Select 
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? 'blue' : 'grey',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: 'nowrap',
                                        width: '100%',                                    
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        background: 'powderblue',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: 0
                                    }),
                                }}
                                options={countryOptions} 
                                onChange={handleCountrySelectionChange}
                            />
                            <Select 
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? 'blue' : 'grey',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: 'nowrap',
                                        width: '100%',                                    
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        background: 'powderblue',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: 0
                                    }),
                                }}
                                options={cityOptions} 
                                onChange={handleCitySelectionChange}
                            />
                        </div>
                        <div className="Add-New-Flight-Form-Submit-Button-Frame">
                            <button type="submit">Add</button>
                        </div>
                    </>}
                </form>
            </div>
        </>
    )
}
/*
                       
*/