export type Passenger = {
    title: "Mr" | "Ms" | "Mrs" | "Dr";
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportId: string;
    passportExpiryDate: string;
    mealPreference: "Halal" | "Standard" | "Vegan" | "Vegetarian";
    specialAssistance: boolean;
    activeTab: string;
}