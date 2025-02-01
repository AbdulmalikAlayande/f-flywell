import { AvailableFlight, CheapFlight, RandomFlight } from "../views/interfaces/interface";

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
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },
    
    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },
    
    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },

    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },    
    
    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    }
    
]

export const randomFlight: RandomFlight[] = [
    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },
    {
        publicId: generateUUID(),
        seatsRemaining: 34,
        departureLocation: "Abu Dhabi",
        arrivalLocation: "Cuba",
        date: new Date("11-23-2023"),
        duration: "6hrs",   
        time: "4:30pm",
    },
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