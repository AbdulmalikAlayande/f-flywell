export interface AvailableFlight{
    seatsRemaining: number;
    from: string;
    to: string;
    date: Date;
    duration: string;
    time: string;
}
export interface CheapFlights extends AvailableFlight{   
}

export interface RandomFlights extends AvailableFlight{

}