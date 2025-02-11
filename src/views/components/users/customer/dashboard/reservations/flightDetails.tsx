import { AvailableFlight } from '@src/views/interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { 
    FaPlaneDeparture, 
    FaPlaneArrival, 
    FaClock, 
    FaPlane, 
    FaChair, 
    FaDollarSign 
} from 'react-icons/fa';
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
    
    function onBookFlight(){

    }

    return (
        <div className="p-6 m-4 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50">
            
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-indigo-900 mb-3">
                    Flight Details
                </h1>
                <div className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg">
                    <FaPlane className="mr-2" />
                    <span>{flight?.flightNumber || 'N/A'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-5">
                    <div className="flex items-center mb-3">
                        <FaPlaneDeparture className="text-indigo-900 mr-2" />
                        <h2 className="text-xl">Departure</h2>
                    </div>
                    <h3 className="text-2xl font-medium text-indigo-900">
                        {flight?.flight?.departureCity}
                    </h3>
                    <p className="text-gray-600">
                        {flight?.flight?.departureAirport?.name}
                    </p>
                    <h4 className="text-xl mt-2">
                        {flight?.departureTime && format(flight.departureTime, 'p')}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {flight?.departureTime && format(flight.departureTime, "PP")}
                    </p>
                </div>

                {/* Flight Duration */}
                <div className="md:col-span-2 flex flex-col items-center">
                    <FaClock className="text-indigo-900 mb-2" />
                    <span className="text-gray-600 text-sm">Duration</span>
                    <span className="font-medium">{flight?.duration}</span>
                    <div className="w-full h-px bg-gray-200 my-4" />
                </div>

                {/* Arrival Section */}
                <div className="md:col-span-5">
                    <div className="flex items-center mb-3">
                        <FaPlaneArrival className="text-indigo-900 mr-2" />
                        <h2 className="text-xl">Arrival</h2>
                    </div>
                    <h3 className="text-2xl font-medium text-indigo-900">
                        {flight?.flight?.arrivalCity}
                    </h3>
                    <p className="text-gray-600">
                        {flight?.flight?.arrivalAirport?.name}
                    </p>
                    <h4 className="text-xl mt-2">
                        {flight?.arrivalTime && format(flight.arrivalTime, "p")}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {flight?.arrivalTime && format(flight.arrivalTime, "PP")}
                    </p>
                </div>
            </div>

            {/* Flight Information */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-center">
                        <FaPlane className="text-indigo-900 mr-2" />
                        {/* <span>Aircraft: {flight.aircraft}</span> */}
                    </div>
                    <div className="flex items-center">
                        <FaChair className="text-indigo-900 mr-2" />
                        <span>Available Seats: {flight?.seatsRemaining}</span>
                    </div>
                    <div className="flex items-center">
                        <FaDollarSign className="text-indigo-900 mr-2" />
                        <span className="text-xl text-indigo-900 font-medium">
                            ${"$Price"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onBookFlight}
                    className="px-8 py-3 text-white rounded-lg bg-gradient-to-r from-indigo-900 to-indigo-700 
                             hover:from-indigo-800 hover:to-indigo-900 transition-all duration-300"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default FlightDetails;
