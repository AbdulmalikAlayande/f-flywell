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
