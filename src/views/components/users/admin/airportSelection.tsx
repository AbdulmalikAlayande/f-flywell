import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import Select, {GroupBase, StylesConfig} from "react-select";
import { AirportData, PostmanCountriesData } from '../../../interfaces/interface';
import { useFetchCities } from './useFetchCities';

type Props = {
    currentStep: number,
};

export function AirportSelection(props: Props) {

    const {data, error, isLoading} = useFetchCities<PostmanCountriesData>({queryKey: [""]})
    const [countryOptions, setCountryOptions] = useState<{value: string, label: string}[]>([])
    const [cityOptions, setCityOptions] = useState<{value: string, label: string}[]>([])
    const [airportData, setairportData] = useState<AirportData[]>([])
    React.useEffect(()=>{
        if(data){
            setCountryOptions(
                data.data.map((country)=>{
                    return {value: country.country, label: country.country}
                })
            )
    }}, [data])
    
    function handleCountrySelectionChange(countryData?: any) {
        const cityOptions: {value: string, label: string}[] = []
        const citiesInCountryData = data?.data.filter(country => country.country===countryData.value)
        citiesInCountryData?.map((country) => {
            return country.cities.map((city)=>{
                return cityOptions.push({
                    value: city,
                    label: city,
                })
            })
        })
        setCityOptions(cityOptions)
    }

    function handleCitySelectionChange(data: any){
        let airportData: AirportData[] = []
        axios.get(`https://api.aerisapi.com/places/airports/search?client_id=${process.env.REACT_APP_AERIS_API_CLENT_ID}&client_secret=${process.env.REACT_APP_AERIS_API_CLENT_SECRET}&limit=100&filter=airport&query=country:ru`)
            .then((result) => {
                if (result.data.error){
                    console.log(result.data.error);
                    console.log(result.data.error.code);
                }
                else{
                    setairportData(result.data.response);
                }
            })
            .catch((error) => {
                console.log("error ==> ",error);
            })
        console.log(data)
    }
    const airportSelectionTagStyles: StylesConfig<{}, false, GroupBase<{}>> = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'powderblue' : 'grey',
            width: '17vw',
            zIndex: 4,
        }),
        menu: (provided) => ({
            background: 'powderblue',
            width: '17vw',
            zIndex: 4,
        }),
    };
    return (
        <>
            {props.currentStep === 1 && <div className={"Airport-Selection-Frame-1"}>
                <div className="Select-Frame-1">
                    <Select
                        styles={airportSelectionTagStyles}
                        options={countryOptions}
                        onChange={handleCountrySelectionChange}
                    />
                    <Select
                        styles={airportSelectionTagStyles}
                        options={cityOptions}
                        onChange={handleCitySelectionChange}
                    />
                </div>
                <div className="Fetched-Airports-Frame">

                </div>
            </div>
            }
            {props.currentStep === 2 && <div className={"Airport-Selection-Frame-2"}>
            <div className="Select-Frame-2">
                    <Select
                        styles={airportSelectionTagStyles}
                        options={countryOptions}
                        onChange={handleCountrySelectionChange}
                    />
                    <Select
                        styles={airportSelectionTagStyles}
                        options={cityOptions}
                        onChange={handleCitySelectionChange}
                    />
                </div>
                <div className="Fetched-Airports-Frame">
                    {airportData.map((airport, index)=>(
                        <button key={index}>
                            <div className="Fetched-Airport-Name-And-Loc-Frame">
                                <h1>{airport.place.name}</h1>                        
                                <p>{airport.place.city}, {airport.place.countryFull}</p>
                            </div>
                            <div className="">
                                <p>lat: {airport.loc.lat}</p>                        
                                <p>long: {airport.loc.long}</p>       
                                <p>iata:{airport.profile.iata}</p> 
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            }
            
        </>
    );
}