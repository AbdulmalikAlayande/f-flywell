import { useEffect, useState } from 'react';
import PassengerForm from './passengerForm';
import SeatSelection from './seatSelection';
import PaymentConfirmation from './paymentConfirmation';
import { motion, AnimatePresence } from 'framer-motion';
import { Passenger, FlightReservationRequest } from '@src/views/types';
import Navbar from '@/views/components/reusables/navbar';
import { Label } from '@/components/ui/label';
import SeatMap from './seatMap';
import { AvailableFlight, Seat } from '@src/views/interfaces/interface';
import Logger from '@/utils/logger';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { availableFlights } from '@src/utils/placeholder';
import { isToday, isTomorrow, format } from 'date-fns';

const BookFlight = () => {
    const params = useParams();
    const flightId = params.pid;

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [reservationRequest, setReservationRequest] = useState<FlightReservationRequest>({
        flightId: '',
        seatIds: [],
        passengers: [],
        seatMap: new Map<string, Passenger>(),
        contactEmail: '',
        contactPhone: '',
        specialAssistance: false,
    });

    const [flightDetails, setFlightDetails] = useState<AvailableFlight>({
        publicId: '',
        flightNumber: '',
        departureTime: new Date(),
        arrivalTime: new Date(),
        seats: [],
        seats_: new Map(),
        prices: [],
        flight: {
            arrivalCity: '',
            departureCity: '',
            displayImage: '',
            arrivalAirport: {
                name: '',
                icaoCode: '',
                iataCode: '',
                isoCountryCode: '',
                address: '',
                longitude: 0,
                latitude: 0,
            },
            departureAirport: {
                name: '',
                icaoCode: '',
                iataCode: '',
                isoCountryCode: '',
                address: '',
                longitude: 0,
                latitude: 0,
            },
        },
        seatsRemaining: 0,
        duration: '',
    });

    const { data } = useQuery<AvailableFlight>({
        queryKey: ['flightDetails', flightId],
        queryFn: async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const flight = availableFlights.find(flight => flight.publicId === flightId);
                    if (!flight) {
                        reject(new Error('Flight not found'));
                    }
                    resolve(flight!);
                }, 1000);
            });
        },
    });

    useEffect(() => {
        if (data) {
            setFlightDetails(data);
            Logger.debug("Seats:: " + JSON.stringify(data.seats_));
            setReservationRequest(prev => ({
                ...prev,
                flightId: data.publicId,
            }));
        }
    }, [data]);

    const goToNextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handlePassengersSubmit = (passengerData: Passenger[]) => {
        Logger.debug('bookFlight.BookFlight: Passenger Data: ' + JSON.stringify(passengerData));
        setReservationRequest(prev => ({
            ...prev,
            passengers: passengerData,
        }));
        Logger.debug('Reservation Request: ' + JSON.stringify(reservationRequest));
        goToNextStep();
    };

    const handleSeatSelection = (seats: Seat[]) => {
        setSelectedSeats(seats);
        goToNextStep();
    };

    function handleSeatMapSeatSelection(seat: Seat): void {
        Logger.debug('Seat: ' + JSON.stringify(seat));

        if (selectedSeats.length >= reservationRequest.passengers.length) {
            toast.info('Maximum number of seats already selected', {
                description:
                    'You can only select up to ' + reservationRequest.passengers.length + ' seats.',
                duration: 3000,
                style: { backgroundColor: 'red', color: 'white' },
            });
        }
        else if (selectedSeats.some(s => s.publicId === seat.publicId)) {
            setSelectedSeats(prev => prev.filter(s => s.publicId !== seat.publicId));
        }
        else {
            setSelectedSeats(prev => [...prev, seat]);
        }
    }

    // Add function to remove a seat
    const handleRemoveSeat = (seatId: string) => {
        setSelectedSeats(prev => prev.filter(seat => seat.publicId !== seatId));
    };

    function formatFlightDate(date: Date) {
        if (isToday(date)) return `Today, ${format(date, 'HH:mm')}`;
        if (isTomorrow(date)) return `Tomorrow, ${format(date, 'HH:mm')}`;
        return format(date, 'EEE, MMM d • HH:mm');
    }

    const stepComponents = [
        <PassengerForm key="passenger-form" onSubmit={handlePassengersSubmit} />,
        <SeatSelection
            key="seat-selection"
            onSubmit={() => handleSeatSelection(selectedSeats)}
            passengerCount={reservationRequest.passengers.length}
            selectedSeats={selectedSeats}
            onSeatRemove={handleRemoveSeat}
        />,
        <PaymentConfirmation
            key="payment-confirmation"
            seats={selectedSeats}
            passengers={Array.from(reservationRequest.passengers)}
            reservedSeats={selectedSeats.map(seat => seat.seatNumber)}
            flightDetails={flightDetails}
        />,
    ];

    return (
        <div
            className={
                'w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'
            }
        >
            <Navbar />
            <div className={'w-full h-[150vh] flex items-center justify-between px-4 py-8 gap-4'}>
                <main className="w-full h-full lg:w-7/10 flex flex-col items-center justify-between">
                    {/* Header with flight details */}
                    <div className="w-full h-2/10">
                        <div className="flex justify-between items-center">
                            <Label className="text-lg md:text-xl font-bold">Book Your Flight</Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm opacity-80">Flight:</span>
                                <span className="font-semibold">{flightDetails.flightNumber}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold">
                                    {flightDetails.flight.departureAirport.iataCode}
                                </span>
                                <div className="flex items-center px-2">
                                    <div className="w-2 h-2 rounded-full bg-black dark:bg-gray-50"></div>
                                    <div className="w-16 h-0.5 bg-black dark:bg-gray-50"></div>
                                    <div className="w-2 h-2 rounded-full bg-black dark:bg-gray-50"></div>
                                </div>
                                <span className="text-3xl font-bold">
                                    {flightDetails.flight.arrivalAirport.iataCode}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm opacity-80">
                                    {formatFlightDate(flightDetails.departureTime)}
                                </div>
                                <div className="font-medium">
                                    {format(flightDetails.departureTime, 'h:mma') +
                                        ' - ' +
                                        format(flightDetails.arrivalTime, 'h:mma')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-15/100 w-full px-6">
                        <div className="flex items-center justify-between">
                            {[
                                { step: 1, label: 'Passenger Info' },
                                { step: 2, label: 'Seat Selection' },
                                { step: 3, label: 'Confirm & Pay' },
                            ].map((item, index) => (
                                <div
                                    key={item.step}
                                    className="flex flex-col items-center relative w-full"
                                >
                                    {/* Line connector */}
                                    {index < 2 && (
                                        <div
                                            className={`absolute top-4 left-[50%] w-[calc(100%-2rem)] h-0.5 
                                            ${
                                                currentStep > item.step
                                                    ? 'bg-blue-500 dark:bg-blue-400'
                                                    : 'bg-gray-200 dark:bg-gray-600'
                                            }`}
                                        ></div>
                                    )}

                                    {/* Step circle */}
                                    <div
                                        className={`z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border-2 
                                        ${
                                            currentStep === item.step
                                                ? 'bg-blue-500 border-blue-500 text-white'
                                                : currentStep > item.step
                                                ? 'bg-blue-500 border-blue-500 text-white'
                                                : 'bg-white border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600'
                                        }`}
                                    >
                                        {currentStep > item.step ? '✓' : item.step}
                                    </div>

                                    {/* Step label */}
                                    <span
                                        className={`mt-2 text-sm font-medium 
                                        ${
                                            currentStep === item.step
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Component Content */}
                    <div className="h-65/100 w-full">
                        <AnimatePresence mode="sync">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={'w-full h-full'}
                            >
                                {stepComponents[currentStep - 1]}
                            </motion.div>
                        </AnimatePresence>
                        <div
                            className={`${
                                currentStep === 1 ? 'hidden' : 'flex'
                            } w-full justify-between px-3 mt-4`}
                        >
                            <Button
                                onClick={goToPreviousStep}
                                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={goToNextStep}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </main>

                {/* Seat Map Display */}
                <main className={'h-full hidden md:block w-3/10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'}>
                    <SeatMap
                        onSeatSelect={handleSeatMapSeatSelection}
                        selectedSeats={selectedSeats}
                        seats={flightDetails.seats_ ? flightDetails.seats_ : new Map<string, Seat[]>()}
                    />
                </main>
            </div>
        </div>
    );
};

export default BookFlight;
