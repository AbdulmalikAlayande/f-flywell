import { AvailableFlight, CheapFlight, RandomFlight } from "../views/interfaces/interface";
import beijing from "@assets/images/jpg/beijing.jpg";
import london from "@assets/images/jpg/london.jpg";
import newYork from "@assets/images/jpg/new-york.jpg";
import melbourne from "@assets/images/jpg/melbourne.jpg";
import paris from "@assets/images/jpg/paris.jpg";
import dubai from "@assets/images/jpg/dubai.jpg";
import frankFurt from "@assets/images/jpg/frankfurt.jpg";
import rome from "@assets/images/jpg/rome.jpg";



function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

export const availableFlights: AvailableFlight[] = [

    {
        publicId: generateUUID(),
        seatsRemaining: 150,
        duration: "6hrs",   
        flightNumber: "AA123",
        departureTime: new Date("2023-11-23T08:00:00"),
        arrivalTime: new Date("2023-11-23T12:00:00"),
        seats: [
            { seatNumber: "1A", status: "EMPTY", price: 200, reservationNumber: "" },
            { seatNumber: "1B", status: "RESERVED", price: 200, reservationNumber: "RES123" },
        ],
        flight: {
            arrivalCity: "New York",
            departureCity: "Los Angeles",
            displayImage: newYork,
            arrivalAirport: {
                name: "John F. Kennedy International Airport",
                icaoCode: "KJFK",
                iataCode: "JFK",
                isoCountryCode: "US",
                address: "Queens, NY 11430, USA",
                longitude: -73.7781,
                latitude: 40.6413,
            },
            departureAirport: {
                name: "Los Angeles International Airport",
                icaoCode: "KLAX",
                iataCode: "LAX",
                isoCountryCode: "US",
                address: "1 World Way, Los Angeles, CA 90045, USA",
                longitude: -118.4085,
                latitude: 33.9416,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 120,
        duration: "5hrs",
        flightNumber: "BA456",
        departureTime: new Date("2023-12-01T09:00:00"),
        arrivalTime: new Date("2023-12-01T14:00:00"),
        seats: [
            { seatNumber: "2A", status: "RESERVED", price: 250, reservationNumber: "RES456" },
            { seatNumber: "2B", status: "EMPTY", price: 250, reservationNumber: "" },
        ],
        flight: {
            arrivalCity: "London",
            departureCity: "Chicago",
            displayImage: london,
            arrivalAirport: {
                name: "Heathrow Airport",
                icaoCode: "EGLL",
                iataCode: "LHR",
                isoCountryCode: "GB",
                address: "Longford TW6, UK",
                longitude: -0.4543,
                latitude: 51.4700,
            },
            departureAirport: {
                name: "O'Hare International Airport",
                icaoCode: "KORD",
                iataCode: "ORD",
                isoCountryCode: "US",
                address: "10000 W O'Hare Ave, Chicago, IL 60666, USA",
                longitude: -87.9048,
                latitude: 41.9742,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 180,
        duration: "7hrs",
        flightNumber: "CA789",
        departureTime: new Date("2023-12-15T10:00:00"),
        arrivalTime: new Date("2023-12-15T17:00:00"),
        seats: [
            { seatNumber: "3A", status: "EMPTY", price: 300, reservationNumber: "" },
            { seatNumber: "3B", status: "RESERVED", price: 300, reservationNumber: "RES789" },
        ],
        flight: {
            arrivalCity: "Beijing, China",
            departureCity: "San Francisco, CA",
            displayImage: beijing,
            arrivalAirport: {
                name: "Beijing Capital International Airport",
                icaoCode: "ZBAA",
                iataCode: "PEK",
                isoCountryCode: "CN",
                address: "Chaoyang, Beijing, China",
                longitude: 116.4074,
                latitude: 39.9042,
            },
            departureAirport: {
                name: "San Francisco International Airport",
                icaoCode: "KSFO",
                iataCode: "SFO",
                isoCountryCode: "US",
                address: "San Francisco, CA 94128, USA",
                longitude: -122.3790,
                latitude: 37.6213,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 100,
        duration: "8hrs",
        flightNumber: "DL012",
        departureTime: new Date("2023-12-20T11:00:00"),
        arrivalTime: new Date("2023-12-20T19:00:00"),
        seats: [
            { seatNumber: "4A", status: "RESERVED", price: 350, reservationNumber: "RES012" },
            { seatNumber: "4B", status: "EMPTY", price: 350, reservationNumber: "" },
        ],
        flight: {
            arrivalCity: "Paris, France",
            departureCity: "Miami, FL",
            displayImage: paris,
            arrivalAirport: {
                name: "Charles de Gaulle Airport",
                icaoCode: "LFPG",
                iataCode: "CDG",
                isoCountryCode: "FR",
                address: "95700 Roissy-en-France, France",
                longitude: 2.5674,
                latitude: 49.0097,
            },
            departureAirport: {
                name: "Miami International Airport",
                icaoCode: "KMIA",
                iataCode: "MIA",
                isoCountryCode: "US",
                address: "2100 NW 42nd Ave, Miami, FL 33126, USA",
                longitude: -80.2906,
                latitude: 25.7959,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 130,
        duration: "9hrs",
        flightNumber: "EK345",
        departureTime: new Date("2023-12-25T12:00:00"),
        arrivalTime: new Date("2023-12-25T21:00:00"),
        seats: [
            { seatNumber: "5A", status: "EMPTY", price: 400, reservationNumber: "" },
            { seatNumber: "5B", status: "RESERVED", price: 400, reservationNumber: "RES345" },
        ],
        flight: {
            arrivalCity: "Dubai UAE",
            departureCity: "Sydney Australia",
            displayImage: dubai,
            arrivalAirport: {
                name: "Dubai International Airport",
                icaoCode: "OMDB",
                iataCode: "DXB",
                isoCountryCode: "AE",
                address: "Dubai, United Arab Emirates",
                longitude: 55.3644,
                latitude: 25.2532,
            },
            departureAirport: {
                name: "Sydney Kingsford Smith Airport",
                icaoCode: "YSSY",
                iataCode: "SYD",
                isoCountryCode: "AU",
                address: "Sydney NSW 2020, Australia",
                longitude: 151.2093,
                latitude: -33.8688,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 140,
        duration: "10hrs",
        flightNumber: "LH678",
        departureTime: new Date("2024-01-05T13:00:00"),
        arrivalTime: new Date("2024-01-05T23:00:00"),
        seats: [
            { seatNumber: "6A", status: "RESERVED", price: 450, reservationNumber: "RES678" },
            { seatNumber: "6B", status: "EMPTY", price: 450, reservationNumber: "" },
        ],
        flight: {
            arrivalCity: "Frankfurt, Germany",
            departureCity: "Tokyo, Jpan",
            displayImage: frankFurt,
            arrivalAirport: {
                name: "Frankfurt Airport",
                icaoCode: "EDDF",
                iataCode: "FRA",
                isoCountryCode: "DE",
                address: "60547 Frankfurt, Germany",
                longitude: 8.5706,
                latitude: 50.0333,
            },
            departureAirport: {
                name: "Narita International Airport",
                icaoCode: "RJAA",
                iataCode: "NRT",
                isoCountryCode: "JP",
                address: "1-1 Furugome, Narita, Chiba 282-0004, Japan",
                longitude: 140.3929,
                latitude: 35.7767,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 160,
        duration: "11hrs",
        flightNumber: "QF901",
        departureTime: new Date("2024-01-10T14:00:00"),
        arrivalTime: new Date("2024-01-10T01:00:00"),
        seats: [
            { seatNumber: "7A", status: "EMPTY", price: 500, reservationNumber: "" },
            { seatNumber: "7B", status: "RESERVED", price: 500, reservationNumber: "RES901" },
        ],
        flight: {
            arrivalCity: "Melbourne, Australia",
            departureCity: "Johannesburg, South Africa",
            displayImage: melbourne,
            arrivalAirport: {
                name: "Melbourne Airport",
                icaoCode: "YMML",
                iataCode: "MEL",
                isoCountryCode: "AU",
                address: "Melbourne Airport VIC 3045, Australia",
                longitude: 144.8430,
                latitude: -37.6733,
            },
            departureAirport: {
                name: "O.R. Tambo International Airport",
                icaoCode: "FAOR",
                iataCode: "JNB",
                isoCountryCode: "ZA",
                address: "Kempton Park, Johannesburg, 1627, South Africa",
                longitude: 28.2460,
                latitude: -26.1338,
            },
        },
        },
    {
        publicId: generateUUID(),
        seatsRemaining: 110,
        duration: "12hrs",
        flightNumber: "AF234",
        departureTime: new Date("2024-01-15T15:00:00"),
        arrivalTime: new Date("2024-01-15T03:00:00"),
        seats: [
            { seatNumber: "8A", status: "RESERVED", price: 550, reservationNumber: "RES234" },
            { seatNumber: "8B", status: "EMPTY", price: 550, reservationNumber: "" },
        ],
        flight: {
            arrivalCity: "Rome, Italy",
            departureCity: "Buenos Aires, Argentina",
            displayImage: rome,
            arrivalAirport: {
                name: "Leonardo da Vinci International Airport",
                icaoCode: "LIRF",
                iataCode: "FCO",
                isoCountryCode: "IT",
                address: "00054 Fiumicino, Metropolitan City of Rome, Italy",
                longitude: 12.2508,
                latitude: 41.8003,
            },
            departureAirport: {
                name: "Ministro Pistarini International Airport",
                icaoCode: "SAEZ",
                iataCode: "EZE",
                isoCountryCode: "AR",
                address: "Buenos Aires Province, Argentina",
                longitude: -58.5358,
                latitude: -34.8222,
            },
        },
        
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 90,
        duration: "13hrs",
        flightNumber: "SQ567",
        departureTime: new Date("2024-01-20T16:00:00"),
        arrivalTime: new Date("2024-01-21T05:00:00"),
        seats: [
            { seatNumber: "9A", status: "EMPTY", price: 600, reservationNumber: "" },
            { seatNumber: "9B", status: "RESERVED", price: 600, reservationNumber: "RES567" },
        ],
        flight: {
            arrivalCity: "Singapore",
            departureCity: "Cape Town, South Africa",
            displayImage: "https://example.com/images/singapore.jpg",
            arrivalAirport: {
                name: "Singapore Changi Airport",
                icaoCode: "WSSS",
                iataCode: "SIN",
                isoCountryCode: "SG",
                address: "Changi, Singapore",
                longitude: 103.9940,
                latitude: 1.3644,
            },
            departureAirport: {
                name: "Cape Town International Airport",
                icaoCode: "FACT",
                iataCode: "CPT",
                isoCountryCode: "ZA",
                address: "Matroosfontein, Cape Town, 7490, South Africa",
                longitude: 18.6017,
                latitude: -33.9695,
            },
        },
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 80,
        duration: "14hrs",
        flightNumber: "UA890",
        departureTime: new Date("2024-01-25T17:00:00"),
        arrivalTime: new Date("2024-01-26T07:00:00"),
        seats: [
            { seatNumber: "10A", status: "RESERVED", price: 650, reservationNumber: "RES890" },
            { seatNumber: "10B", status: "EMPTY", price: 650, reservationNumber: "" },
        ],
        flight: {
            arrivalCity: "Los Angeles, CA",
            departureCity: "Hong Kong, China",
            displayImage: "https://example.com/images/losangeles.jpg",
            arrivalAirport: {
                name: "Los Angeles International Airport",
                icaoCode: "KLAX",
                iataCode: "LAX",
                isoCountryCode: "US",
                address: "1 World Way, Los Angeles, CA 90045, USA",
                longitude: -118.4085,
                latitude: 33.9416,
            },
            departureAirport: {
                name: "Hong Kong International Airport",
                icaoCode: "VHHH",
                iataCode: "HKG",
                isoCountryCode: "HK",
                address: "1 Sky Plaza Rd, Chek Lap Kok, Hong Kong",
                longitude: 113.9185,
                latitude: 22.3080,
            },
        },
    },
]

export const randomFlight: RandomFlight[] = [
    
]

export const cheapFlight: CheapFlight[] = [
    // {
    //     seatsRemaining: 34,
    //     from: "Abu Dhabi",
    //     to: "Cuba",
    //     date: new Date("11-23-2023"),
    //     duration: "6hrs",
    //     time: "4:30pm",
    // },
]

export const data = [
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        phoneNumber: "string",
        ffn: "string",
        status: "string",
    },
    
]