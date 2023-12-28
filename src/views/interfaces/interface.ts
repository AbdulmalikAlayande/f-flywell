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