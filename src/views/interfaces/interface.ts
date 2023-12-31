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
    "response": [
        {
        "id": "egll",
        "loc": {
            "lat": 51.4706001282,
            "long": -0.461941003799
        },
        "place": {
            "name": "London Heathrow Airport",
            "city": "London",
            "state": "ENG",
            "stateFull": "",
            "country": "GB",
            "countryFull": "United Kingdom",
            "region": "",
            "regionFull": "",
            "continent": "eu",
            "continentFull": "Europe"
        },
        "profile": {
            "id": "egll",
            "iata": "lhr",
            "local": "",
            "type": "la",
            "typeENG": "large airport",
            
            
        }
        }
    ]
}