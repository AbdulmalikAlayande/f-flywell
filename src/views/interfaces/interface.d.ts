export interface AvailableFlight{
    seatsRemaining: number;
    from: string;
    to: string;
    date: Date;
    duration: string;
    time: string;
}
export interface CheapFlight extends AvailableFlight{
}

export interface RandomFlight extends AvailableFlight{

}