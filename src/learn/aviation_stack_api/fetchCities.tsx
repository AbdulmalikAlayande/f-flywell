import React from 'react'
import UseAviationStack, { PaginationParameters } from './useAviationStack'
import { ToastContainer, toast } from 'react-toastify'

interface City{
    id: number,
    gmt: number,
    city_id: number,
    iata_code: string,
    country_iso: string,
    geoname_id: string,
    latitude: number,
    longitude: number,
    city_name: string,
    timezone: string
}
export interface CitiesData{
    pagination: PaginationParameters,
    data: City[]
}

const FetchCities = () => {
    const accessKey = process.env.AVIATION_STACK_ACCESS_KEY;
    const citiesUrl = "http://api.aviationstack.com/v1/cities";
    const queryKey = ["cities", "id"]
    const paginationQueries: PaginationParameters = {
        limit: 200,
        count: 200,
        offset: 0,
        total: 9370    
    }
    const {data, isLoading, error} = UseAviationStack(paginationQueries, citiesUrl, queryKey, accessKey)
    
    function alertNotification(message: string){
        // alert(message)
        toast.info(message, {
            autoClose: 5000,
            pauseOnHover: false,
            position: toast.POSITION.TOP_CENTER,
            className: "Toast-Message",
          });
    }
    if(data) {
        return (
            <div>
            <ToastContainer/>
                <ul>
                {data.data.map((value, index)=>(
                    <li key={index}>
                        <p>Id: {value.id}</p>
                        <p>GMT: {value.gmt}</p>
                        <p>City Id{value.city_id}</p>
                        <p>IATA_Code: {value.iata_code}</p>
                        <p>Country_Iso: {value.country_iso}</p>
                        <p>Geoname Id: {value.geoname_id}</p>
                        <p>Latitude: {value.latitude}</p>
                        <p>Longitude: {value.longitude}</p>
                        <p>City Name: {value.city_name}</p>
                        <p>Time Zone: {value.timezone}</p>
                    </li>
                ))}
                </ul>
            </div>
        )
    }
    else if(isLoading){
        return (<div>Loading</div>)
    }
    else {
        console.log("hi")
        alertNotification("Error Occurred: "+error?.message)
        return (<div>{error?.message}</div>)
    }
}

export default FetchCities