import React from 'react';
import { Clock, MapPin, DollarSign, Award, ArrowRight } from 'lucide-react';
import { AvailableFlight } from '@src/views/interfaces/interface';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { NavLink } from 'react-router';

interface FlightDetailsProps {
    flight: AvailableFlight | null;
    onClose: () => void;
}

export const FlightDetails: React.FC<FlightDetailsProps> = ({ 
    flight,
    onClose
}) => {
    if (!flight) return null;

    // Function to calculate flight duration in a more readable format
    const calculateDuration = (duration: string): string => {
        return duration;
    };

    return (
        <div className="space-y-6 mt-2">
            {/* Flight Overview Card */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
                        <path d="M21,16V14L13,9V3.5A1.5,1.5,0,0,0,11.5,2A1.5,1.5,0,0,0,10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
                    </svg>
                </div>
                
                <div className="w-full flex flex-col justify-between items-center">
                    <div className="w-full flex items-center justify-start gap-2 mb-2">
                        <Badge className="bg-white/20 text-white hover:bg-white/30">
                            {flight.flightNumber}
                        </Badge>
                        <Badge className="bg-white/20 text-white hover:bg-white/30">
                            {flight.seatsRemaining} seats left
                        </Badge>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={""}>
                            <img 
                                src={flight.flight.displayImage} 
                                alt={"Departure Location Image"}
                                className="h-8 w-8 rounded-full border-2 border-white/30 shadow-lg" 
                            />
                            <Label className={"md:text-lg"}>
                                {flight.flight.departureCity} 
                            </Label>
                        </div>
                        <div className={""}>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                        <div className={""}>
                            <img 
                                src={flight.flight.displayImage} 
                                alt={"Arrival Location Image"}
                                className="h-8 w-8 rounded-full border-2 border-white/30 shadow-lg" 
                            />
                            <Label className={"md:text-lg"}>
                                {flight.flight.arrivalCity}
                            </Label>
                        </div>
                    </div>
                    <p className="w-full text-start text-sm opacity-90 mt-1">
                        {format(flight.departureTime, 'EEEE, MMMM d, yyyy')}
                    </p>
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                        <span className="text-xs opacity-90">Duration</span>
                        <p className="font-medium">{calculateDuration(flight.duration)}</p>
                    </div>
                </div>
            </section>

            {/* Flight Path Visualization */}
            <section className="py-6 px-2">
                <div className="flex items-center justify-between">
                    <div className="text-center">
                        <div className="text-xl font-bold dark:text-white">
                            {format(flight.departureTime, 'HH:mm')}
                        </div>
                        <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                            {flight.flight.departureAirport.iataCode}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center mx-4">
                        <div className="relative w-full flex items-center justify-center">
                            <div className="absolute w-full border-t-2 border-dashed border-gray-300 dark:border-gray-700 z-0"></div>
                            <div className="relative z-10 bg-gray-100 dark:bg-neutral-900 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                                {calculateDuration(flight.duration)}
                            </div>
                        </div>
                        
                        <svg className="w-16 h-8 mt-1 text-blue-600" viewBox="0 0 24 24" fill="none">
                            <path d="M15 4H17M17 4H19M17 4V6M3 12H21L17 8M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className="text-center">
                        <div className="text-xl font-bold dark:text-white">
                            {format(flight.arrivalTime, 'HH:mm')}
                        </div>
                        <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                            {flight.flight.arrivalAirport.iataCode}
                        </div>
                    </div>
                </div>
            </section>

            {/* Flight Details Tabs */}
            <section className="space-y-4">
                {/* Airport Details Panel */}
                <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl p-5">
                    <h4 className="text-base font-semibold mb-4 flex items-center gap-2 dark:text-white">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        Airport Information
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Departure</div>
                            <div className="font-medium dark:text-white">
                                {flight.flight.departureAirport.name}
                            </div>
                            <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Terminal information will be available 24 hours before departure
                            </div>
                        </div>
                        
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Arrival</div>
                            <div className="font-medium dark:text-white">
                                {flight.flight.arrivalAirport.name}
                            </div>
                            <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                                Terminal information will be available 24 hours before departure
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fare Details Panel */}
                <div className="bg-gray-50 dark:bg-neutral-800/50 rounded-xl p-5">
                    <h4 className="text-base font-semibold mb-4 flex items-center gap-2 dark:text-white">
                        <Award className="h-4 w-4 text-blue-600" />
                        Fare Details
                    </h4>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Fare Type</span>
                            <span className="font-medium dark:text-white">Economy</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Baggage Allowance</span>
                            <span className="font-medium dark:text-white">23kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Cabin Baggage</span>
                            <span className="font-medium dark:text-white">7kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Seat Selection</span>
                            <span className="font-medium dark:text-white">Included</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Meals</span>
                            <span className="font-medium dark:text-white">Available</span>
                        </div>
                    </div>
                </div>

                {/* Pricing Summary Panel */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-5 text-white">
                    <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Pricing Summary
                    </h4>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm opacity-90">Base Fare</span>
                            <span className="font-medium">$2,100</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm opacity-90">Taxes & Fees</span>
                            <span className="font-medium">$400</span>
                        </div>
                        <div className="h-px bg-white/20 my-2"></div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="text-xl font-bold">$2,500</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Buttons */}
            <div className="cursor-pointer flex items-center justify-evenly gap-3 mt-8">
                <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="flex-1"
                >
                    Close
                </Button>
                <Button 
                    className={"cursor-pointer p-0 m-0 flex-1 items-center bg-blue-600 hover:bg-blue-700"}
                >
                    <NavLink 
                        to={`/book-flight/${flight.publicId}`}
                        className={"bw-full h-full flex items-center justify-center text-white"}

                    >    
                        Book Now
                    </NavLink>
                </Button>
            </div>
        </div>
    );
};