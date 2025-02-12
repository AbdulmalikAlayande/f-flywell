import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { 
    FaPlaneDeparture, 
    FaPlaneArrival, 
    FaClock, 
    FaChair,
    FaInfoCircle,
    FaExchangeAlt
} from 'react-icons/fa';
import { Badge, } from '@src/views/components/reusables/ui/badge';
import { CardTitle, Card, CardHeader, CardContent } from '@src/views/components/reusables/ui/card';
import { AvailableFlight } from '@src/views/interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';

const FlightDetails = () => {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const publicId = queryParams.get('pid');

    const [flight, setFlight] = useState<AvailableFlight>()

    const { data } = useQuery<AvailableFlight[]>({
        queryKey: ['flights'],
    });

    useEffect(() => {
        if (data) {
            const filteredFlight = data.find(f => f.publicId === publicId)
            setFlight(filteredFlight)
        }
    }, [data, publicId])
    
    const formatPrice = (price: number | bigint) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Flight Details</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-lg">
                            {flight?.flightNumber}
                        </Badge>
                        <Badge variant="outline" className="text-lg">
                            {flight?.duration}
                        </Badge>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Seats Remaining</p>
                    <p className="text-2xl font-bold text-indigo-600">{flight?.seatsRemaining}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Flight Info Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Journey Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FaExchangeAlt className="text-indigo-600" />
                                Journey Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {/* Departure */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaPlaneDeparture className="text-indigo-600" />
                                        <h3 className="font-semibold">Departure</h3>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {flight?.flight?.departureCity}
                                        </p>
                                        <p className="text-gray-600">
                                            {flight?.flight?.departureAirport?.name}
                                        </p>
                                        <p className="text-xl font-medium">
                                            {flight?.departureTime && format(flight.departureTime, 'p')}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {flight?.departureTime && format(flight.departureTime, 'PP')}
                                        </p>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="md:col-span-1 flex flex-col items-center justify-center">
                                    <FaClock className="text-indigo-600 mb-2" />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-bold">{flight?.duration}</p>
                                    </div>
                                </div>

                                {/* Arrival */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaPlaneArrival className="text-indigo-600" />
                                        <h3 className="font-semibold">Arrival</h3>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {flight?.flight?.arrivalCity}
                                        </p>
                                        <p className="text-gray-600">
                                            {flight?.flight?.arrivalAirport?.name}
                                        </p>
                                        <p className="text-xl font-medium">
                                            {flight?.arrivalTime && format(flight.arrivalTime, 'p')}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {flight?.arrivalTime && format(flight.arrivalTime, 'PP')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Airport Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FaInfoCircle className="text-indigo-600" />
                                Airport Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Departure Airport */}
                                <div>
                                    <h3 className="font-semibold mb-2">Departure Airport</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-500">IATA:</span> {flight?.flight?.departureAirport?.iataCode}</p>
                                        <p><span className="text-gray-500">ICAO:</span> {flight?.flight?.departureAirport?.icaoCode}</p>
                                        <p><span className="text-gray-500">Address:</span> {flight?.flight?.departureAirport?.address}</p>
                                    </div>
                                </div>

                                {/* Arrival Airport */}
                                <div>
                                    <h3 className="font-semibold mb-2">Arrival Airport</h3>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-500">IATA:</span> {flight?.flight?.arrivalAirport?.iataCode}</p>
                                        <p><span className="text-gray-500">ICAO:</span> {flight?.flight?.arrivalAirport?.icaoCode}</p>
                                        <p><span className="text-gray-500">Address:</span> {flight?.flight?.arrivalAirport?.address}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Seat Selection Section */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FaChair className="text-indigo-600" />
                                Seat Selection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Seat Map */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-4">Seat Map</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Array.from(flight?.seats || []).slice(0, 28).map((seat) => (
                                            <div
                                                key={seat.seatNumber}
                                                className={`p-2 text-center rounded ${
                                                    seat.status === 'EMPTY' 
                                                        ? 'bg-white border border-indigo-200 cursor-pointer hover:bg-indigo-50'
                                                        : 'bg-gray-200 cursor-not-allowed'
                                                }`}
                                            >
                                                <p className="text-sm font-medium">{seat.seatNumber}</p>
                                                <p className="text-xs text-gray-500">
                                                    {formatPrice(seat.price)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        Showing first 3 rows. Click to view full seat map.
                                    </p>
                                </div>

                                {/* Legend */}
                                <div className="flex justify-around text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-white border border-indigo-200"></div>
                                        <span>Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-200"></div>
                                        <span>Occupied</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FlightDetails;