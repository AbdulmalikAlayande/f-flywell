import React, { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import Select from 'react-select'
import './displayFetchedCities.css'
import { useFetchCities } from './useFetchCities'

type PostmanCountriesData = {
    error: boolean,
    message: string,
    data: Country[]
}

type Country = {
    country: string,
    cities: string[]
}

const initData: PostmanCountriesData = {
    error: false,
    message: '',
    data: []
}

export default function DisplayFetchedCities(){
    
    const {data, error, isLoading} = useFetchCities<PostmanCountriesData>({queryKey: [""]})

    const [countryOptions, setCountryOptions] = useState<{value: string, label: string}[]>([])
    const [cityOptions, setCityOptions] = useState<{value: string, label: string}[]>([])
    
    useEffect(()=>{
        const circle = document.querySelector('.progress-circle') as SVGElement | HTMLElement
        const circumference = 251.2; // Circumference of the circle
        const desiredPercentage = 70; // Change this to your desired progress percentage
        const offset = circumference - (desiredPercentage / 100) * circumference;
        if(circle)
            circle.style.strokeDashoffset = offset.toString();
        if(data){
            setCountryOptions(
                data.data.map((country)=>{
                    return {value: country.country, label: country.country}
                })
            )
    }}, [data])
            
    function handleCountrySelectionChange(countryData: any) {
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
        // event.preventDefault();
        console.log(event)
    }
    
    return(
        <div className='Main-Frame'>
            <Select options={countryOptions} onChange={handleCountrySelectionChange}/>
            <Select options={cityOptions} onChange={handleCitySelectionChange}/>
            <div className="">
                
            <progress content='34' color='powderblue' value={60} max={100}></progress>

            </div>
            <svg className="circular-progress" width="100" height="100">
                <circle className="progress-circle" cx="50" cy="50" r="40" stroke-width="10" />
            </svg>
        </div>
    )
} 