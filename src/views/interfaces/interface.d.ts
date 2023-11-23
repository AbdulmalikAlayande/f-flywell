export interface AvailableFlight{
    seatsRemaining: number;
    from: string;
    to: string;
    date: Date;
    duration: string;
}
export interface CheapFlights extends AvailableFlight{   
}

export interface RandomFlights extends AvailableFlight{

}