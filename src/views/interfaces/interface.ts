export interface AvailableFlight{
    seatsRemaining: number;
    from: string;
    to: string;
    date: Date;
    duration: string;
    time: string;
}
export interface CheapFlight extends AvailableFlight{
    flightName: string,
    toLocImageTermName: string
    fromLocImageTermName: string
}

export interface RandomFlight extends AvailableFlight{

}
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
    response: [
        {
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
    ]
}