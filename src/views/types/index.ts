import { List } from "lodash";

export type Passenger = {
    title: "Mr" | "Ms" | "Mrs" | "Dr";
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    passportExpiryDate: string;
    mealPreference: "Halal" | "Standard" | "Vegan" | "Vegetarian";
    specialAssistance: boolean;
    activeTab: string;
}

export type FlightReservationRequest = {
    flightId: string;
    seatIds: string[] | List<string>;
    passengers: Passenger[] | List<Passenger>;
    seatMap: Map<string, Passenger>;
    contactEmail: string;
    contactPhone: string;
    specialAssistance: boolean;
}