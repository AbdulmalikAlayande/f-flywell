import React, { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import Select from 'react-select'
import './displayFetchedCities.css'
import { useFetchCities } from './useFetchCities'
import { PostmanCountriesData } from '../../../interfaces/interface'

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
        console.log(event)
    }
    
    return(
        <div className='Main-Frame'>
            <Select options={countryOptions} onChange={handleCountrySelectionChange}/>
            <Select options={cityOptions} onChange={handleCitySelectionChange}/>
        </div>
    )
} 