import React from 'react';
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle 
} from '@/components/ui/sheet';
import { 
    Plane, 
    Clock, 
    MapPin, 
    DollarSign 
} from 'lucide-react';
import { AvailableFlight } from '@src/views/interfaces/interface';
import { format } from 'date-fns';

interface FlightDetailsSheetProps {
    flight: AvailableFlight | null;
    openSheet: boolean;
    onClose: () => void;
}

export const FlightDetailsSheet: React.FC<FlightDetailsSheetProps> = ({ 
    flight, 
    openSheet,
    onClose 
}) => {
    if (!flight) return null;

    return (
        <Sheet open={openSheet} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[400px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-blue-600" />
                        Flight Details
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6">
                    {/* Flight Overview */}
                    <section className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">
                                    {flight.flight.departureCity} to {flight.flight.arrivalCity}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-neutral-400">
                                    {flight.flightNumber}
                                </p>
                            </div>
                            <img 
                                src={flight.flight.displayImage} 
                                alt="Airline Logo" 
                                className="h-12 w-12 rounded-full"
                            />
                        </div>
                    </section>

                    {/* Timing Details */}
                    <section>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Timing
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Departure</p>
                                <p className="font-medium">
                                    {format(flight.departureTime, 'hh:mm a')}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {format(flight.departureTime, 'PP')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Arrival</p>
                                <p className="font-medium">
                                    {format(flight.arrivalTime, 'hh:mm a')}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {format(flight.arrivalTime, 'PP')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Airport Details */}
                    <section>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            Airports
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Departure</p>
                                <p className="font-medium">
                                    {flight.flight.departureAirport.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {flight.flight.departureAirport.iataCode}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Arrival</p>
                                <p className="font-medium">
                                    {flight.flight.arrivalAirport.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {flight.flight.arrivalAirport.iataCode}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pricing */}
                    <section>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                            Pricing
                        </h4>
                        <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total Price</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    $2500
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Seats Left</p>
                                <p className="font-medium">
                                    {flight.seatsRemaining}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </SheetContent>
        </Sheet>
    );
};