import { useState } from 'react';
import PassengerForm from './passengerForm';
import SeatSelection from './seatSelection';
import PaymentConfirmation from './paymentConfirmation';
import { motion, AnimatePresence } from 'framer-motion';
import { Passenger } from '@src/views/types';
import Navbar from '@/views/components/reusables/navbar';
import { Label } from '@/components/ui/label';

const BookFlight = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [flightDetails, setFlightDetails] = useState({
        departure: 'SBY',
        arrival: 'DPS',
        departureCity: 'Surabaya, East Java',
        arrivalCity: 'Denpasar, Bali',
        date: '2025-04-15',
        flightNumber: 'JT-25',
        airline: 'Lion Air',
        departureTime: '10:00 AM',
        arrivalTime: '10:30 AM',
        price: 479,
        class: 'Business'
    });

    const goToNextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handlePassengersSubmit = (passengerData: Passenger[]) => {
        setPassengers(passengerData);
        goToNextStep();
    };

    const handleSeatSelection = (seats: string[]) => {
        setSelectedSeats(seats);
        goToNextStep();
    };

    const stepComponents = [
        <PassengerForm key="passenger-form" onSubmit={handlePassengersSubmit} />,
        <SeatSelection 
            key="seat-selection" 
            onSubmit={handleSeatSelection} 
            passengerCount={passengers.length} 
            flightClass={flightDetails.class}
        />,
        <PaymentConfirmation 
            key="payment-confirmation" 
            passengers={passengers} 
            seats={selectedSeats} 
            flightDetails={flightDetails} 
        />
    ];

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'}>
            <Navbar />
            <div className={'w-full flex items-center justify-between px-4 gap-4'}>
                <main className="w-full lg:w-7/10 from-sky-50 to-blue-100 dark:from-gray-900 dark:to-slate-800 py-8">
                    {/* Header with flight details */}
                    <div className="">
                        <div className="flex justify-between items-center">
                            <Label className="text-lg md:text-xl font-bold">Book Your Flight</Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm opacity-80">Flight:</span>
                                <span className="font-semibold">{flightDetails.flightNumber}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-1">
                                <span className="text-3xl font-bold">{flightDetails.departure}</span>
                                <div className="flex items-center px-2">
                                    <div className="w-2 h-2 rounded-full bg-black dark:bg-gray-50"></div>
                                    <div className="w-16 h-0.5 bg-black dark:bg-gray-50"></div>
                                    <div className="w-2 h-2 rounded-full bg-black dark:bg-gray-50"></div>
                                </div>
                                <span className="text-3xl font-bold">{flightDetails.arrival}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm opacity-80">{flightDetails.date}</div>
                                <div className="font-medium">{flightDetails.departureTime} - {flightDetails.arrivalTime}</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 pt-6 pb-2">
                        <div className="flex items-center justify-between">
                            {[{ step: 1, label: 'Passenger Info' }, { step: 2, label: 'Seat Selection' }, { step: 3, label: 'Confirm & Pay' }].map((item, index) => (
                                <div key={item.step} className="flex flex-col items-center relative w-full">
                                    {/* Line connector */}
                                    {index < 2 && (
                                        <div className={`absolute top-4 left-[50%] w-[calc(100%-2rem)] h-0.5 
                                            ${currentStep > item.step ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`}>
                                        </div>
                                    )}
                                    
                                    {/* Step circle */}
                                    <div 
                                        className={`z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border-2 
                                        ${currentStep === item.step 
                                            ? 'bg-blue-500 border-blue-500 text-white' 
                                            : currentStep > item.step
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'bg-white border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600'
                                        }`}
                                    >
                                        {currentStep > item.step ? '✓' : item.step}
                                    </div>
                                    
                                    {/* Step label */}
                                    <span className={`mt-2 text-sm font-medium 
                                        ${currentStep === item.step 
                                        ? 'text-blue-600 dark:text-blue-400' 
                                        : 'text-gray-500 dark:text-gray-400'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                        {/* Component Content */}
                    <div className="mt-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {stepComponents[currentStep - 1]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation buttons - they're included in each step component */}
                </main>
                <main className={'hidden md:block w-3/10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'}>
                    
                </main>
            </div>
        </div>
    );
};

export default BookFlight;