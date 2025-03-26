import { format } from 'date-fns';
import { AvailableFlight } from "@src/views/interfaces/interface";
import { NavLink } from 'react-router';

interface AvailableFlightCardProps extends AvailableFlight {
    openFlightDetailsViewPage: () => void;
    badge: {
        refundable: "partially" | "non" | "fully",
        sortOption: "recommended" | "cheapest" | "fastest",
    }
}

const AvailableFlightCard = (props: AvailableFlightCardProps) => {
    const formatTime = (date: Date) => format(date, 'HH:mm');
    
    
    function capitalizeFirstLetters(word: string): string {
        return word.split(' ')
                   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                   .join(' ');
    }

    return (
        <div className="w-full p-4 lg:p-6 bg-white dark:bg-[#202A3A] rounded-xl hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between gap-4 lg:gap-8">
                {/* Airline Info & Badge */}
                <div className="flex flex-col items-center gap-3 min-w-[80px]">
                    <img 
                        src={props.flight.displayImage} 
                        alt={`${props.flight.departureCity} to ${props.flight.arrivalCity}`}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className={`
                        px-3 py-1 rounded-full text-[0.65rem] lg:text-xs font-medium whitespace-nowrap
                        ${props.badge.refundable === "partially"
                            ? "bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500"
                            : props.badge.refundable === "non"
                                ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                        }
                    `}>
                        {capitalizeFirstLetters(props.badge.refundable)} Refundable
                    </span>
                </div>

                {/* Flight Details */}
                <div className="flex-grow flex items-center justify-between gap-4 lg:gap-8">
                    {/* Departure */}
                    <div className="flex flex-col items-start">
                        <span className="text-lg font-semibold dark:text-white">
                            {formatTime(props.departureTime)}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">
                            {props.flight.departureAirport.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {props.flight.departureCity}
                        </span>
                    </div>

                    {/* Flight Path */}
                    <div className="flex flex-col items-center flex-grow max-w-[200px]">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <span className="text-sm">{props.duration}</span>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2 my-2">
                            <div className="w-2 h-2 rounded-full bg-blue-600"/>
                            <div className="flex-grow h-[1px] border-t-2 border-dashed border-gray-300 dark:border-gray-600"/>
                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21L17 8M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div className="flex-grow h-[1px] border-t-2 border-dashed border-gray-300 dark:border-gray-600"/>
                            <div className="w-2 h-2 rounded-full bg-blue-600"/>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {props.flight.departureAirport.iataCode} - {props.flight.arrivalAirport.iataCode}
                        </span>
                    </div>

                    {/* Arrival */}
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold dark:text-white">
                            {formatTime(props.arrivalTime)}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300 hidden lg:block">
                            {props.flight.arrivalAirport.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            {props.flight.arrivalCity}
                        </span>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-col items-end gap-3 min-w-[120px]">
                    <span className={`
                        px-1 md:px-3 py-1 rounded-full text-xs font-medium
                        ${props.badge.sortOption === "recommended" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500"
                            : props.badge.sortOption === "cheapest"
                            ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500"
                        }
                    `}>
                        {capitalizeFirstLetters(props.badge.sortOption)}
                    </span>
                    <span className="text-lg font-semibold dark:text-white">
                        {props.flightNumber}
                    </span>
                    <button 
                        onClick={props.openFlightDetailsViewPage}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        <NavLink 
                            to={`/flights?pid=${props.publicId}`}
                            className={`w-full rounded-[inherit]`}
                        >
                            View
                        </NavLink>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvailableFlightCard;