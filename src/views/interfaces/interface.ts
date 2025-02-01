export interface AvailableFlight{
    publicId: string;
    seatsRemaining: number;
    departureLocation: string;
    arrivalLocation: string;
    date: Date;
    duration: string;
    time: string;
}
export interface CheapFlight extends AvailableFlight{
    flightName: string,
    toLocImageTermName: string
    fromLocImageTermName: string
}

export type RandomFlight = AvailableFlight

export interface PostmanCountriesData{
    error: boolean,
    message: string,
    data: Country[]
}

export type Country = {
    country: string,
    cities: string[]
}

export interface AirportData {
    id: string,
    loc: {
        lat: number,
        long: number
    },
    place: {
        name: string,
        city: string,
        state: string,
        stateFull: string,
        country: string,
        countryFull: string,
        region: string,
        regionFull: string,
        continent: string,
        continentFull: string
    },
    profile: {
        id: string,
        iata: string,
        local: string,
        type: string,
        typeENG: string                
    }

}