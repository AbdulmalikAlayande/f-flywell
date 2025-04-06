import { List } from "lodash";

export type Seat = {
    id: number;
    row: number;
    column: number;
    seatNumber: string;
    status: "RESERVED" | "EMPTY" | "SELECTED";
    type: "FIRST_CLASS" | "BUSINESS_CLASS" | "PREMIUM_ECONOMY" | "ECONOMY"
    price: number;
    reservationNumber?: string;
}
type Airport = {
    name: string;
    icaoCode: string;
    iataCode: string;
    isoCountryCode: string;
    address: string;
    longitude: number;
    latitude: number;
}

type FlightRelation = {
    arrivalCity: string;
    departureCity: string;
    displayImage: string;
    arrivalAirport: Airport;
    departureAirport: Airport;
}
export interface AvailableFlight{
   
    flightNumber: string;
	departureTime: Date;
	arrivalTime: Date;
    seats: List<Seat>;
    flight: FlightRelation;
    publicId: string;
    seatsRemaining: number;
    duration: string;
}

export interface StopFilter {
    direct: boolean,
    oneStop: boolean,
    multiStop: boolean
}

export interface TimeFilter {
    morning: boolean,
    afternoon: boolean,
    evening: boolean,
    night: boolean
}

export interface PriceFilter {
    min: number,
    max: number
}
export interface FlightSearchFilter {
    stops: StopFilter,
    time: TimeFilter,
    priceRange: PriceFilter,
    duration: number
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