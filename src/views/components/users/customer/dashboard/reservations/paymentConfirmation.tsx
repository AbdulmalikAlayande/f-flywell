import React, { useMemo } from 'react';
import { Passenger } from '@/views/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Plane, User } from 'lucide-react';
import { parse, differenceInMinutes, addDays, format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

type PaymentConfirmationProps = {
    passengers: Passenger[];
    seats: string[];
    flightDetails: {
        departure: string;
        arrival: string;
        departureCity: string;
        arrivalCity: string;
        date: string;
        flightNumber: string;
        airline: string;
        departureTime: string;
        arrivalTime: string;
        price: number;
        class: string;
    };
};

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
    passengers,
    seats,
    flightDetails,
}) => {
    // Calculate totals
    const subtotal = useMemo(
        () => flightDetails.price * passengers.length,
        [flightDetails.price, passengers.length]
    );
    const taxRate = 0.12; // 12% tax
    const taxes = useMemo(() => subtotal * taxRate, [subtotal]);
    const serviceCharge = 15.99;
    const total = useMemo(() => subtotal + taxes + serviceCharge, [subtotal, taxes]);

    // Generate reservation ID (in a real app this would come from backend)
    const reservationId = useMemo(
        () =>
            `${flightDetails.airline.substring(0, 2).toUpperCase()}${Math.floor(
                100000 + Math.random() * 900000
            )}`,
        [flightDetails.airline]
    );

    // Format date for display
    const formattedDate = useMemo(() => {
        const date = new Date(flightDetails.date);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }, [flightDetails.date]);

    const flightDuration = useMemo(() => {
        try {
            const flightDate = new Date(flightDetails.date);
            const dateFormatString = 'yyyy-MM-dd';
            const formattedDate = format(flightDate, dateFormatString);

            const departureDateTime = parse(
                `${formattedDate} ${flightDetails.departureTime}`,
                `${dateFormatString} h:mm a`,
                new Date()
            );

            // For arrival, we need to check if it might be the next day
            let arrivalDateTime = parse(
                `${formattedDate} ${flightDetails.arrivalTime}`,
                `${dateFormatString} h:mm a`,
                new Date()
            );

            // If arrival time is earlier than departure time, it's likely the next day
            if (arrivalDateTime < departureDateTime) {
                arrivalDateTime = addDays(arrivalDateTime, 1);
            }

            // Calculate total minutes between the two dates
            const totalMinutes = differenceInMinutes(arrivalDateTime, departureDateTime);

            // Convert to hours and minutes
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            return `${hours}h ${minutes}m`;
        } catch (error) {
            console.error('Error calculating flight duration:', error);
            return 'Duration unavailable';
        }
    }, [flightDetails.date, flightDetails.departureTime, flightDetails.arrivalTime]);

    return (
        <Card className="w-full">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">Review & Confirm</CardTitle>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Reservation ID:{' '}
                            <span className="font-mono font-medium">{reservationId}</span>
                        </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1">
                        <Check size={14} className="mr-1" /> Ready to confirm
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                {/* Flight Details */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Plane size={18} className="mr-2" /> Flight Details
                    </h3>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="font-medium">{flightDetails.airline}</div>
                            <div className="text-sm font-medium text-gray-500">
                                Flight {flightDetails.flightNumber}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start">
                                <span className="text-xl font-bold">{flightDetails.departure}</span>
                                <span className="text-sm text-gray-500">
                                    {flightDetails.departureCity}
                                </span>
                                <span className="text-sm font-medium">
                                    {flightDetails.departureTime}
                                </span>
                            </div>

                            <div className="flex flex-col items-center px-4">
                                <div className="text-xs text-gray-500">{flightDuration}</div>
                                <div className="relative w-20 my-2">
                                    <div className="absolute top-1/2 w-full h-0.5 bg-gray-300"></div>
                                    <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 rounded-full bg-blue-500"></div>
                                    <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 rounded-full bg-blue-500"></div>
                                </div>
                                <div className="text-xs text-gray-500">{formattedDate}</div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-xl font-bold">{flightDetails.arrival}</span>
                                <span className="text-sm text-gray-500">
                                    {flightDetails.arrivalCity}
                                </span>
                                <span className="text-sm font-medium">
                                    {flightDetails.arrivalTime}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Class</span>
                                <span className="font-medium">{flightDetails.class}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Passenger Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <User size={18} className="mr-2" /> Passenger Information
                    </h3>

                    <div className="space-y-3">
                        {passengers.map((passenger, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-medium">
                                            {passenger.firstName} {passenger.lastName}
                                            {index === 0 && (
                                                <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                    Primary
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Seat {seats[index] || 'Not assigned'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {passenger.dateOfBirth
                                                ? `DOB: ${passenger.dateOfBirth}`
                                                : ''}
                                            {passenger.passportNumber
                                                ? ` • Passport: ${passenger.passportNumber}`
                                                : ''}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">
                                            ${flightDetails.price.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500">per passenger</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Price Breakdown</h3>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Flight fare ({passengers.length}{' '}
                                    {passengers.length === 1 ? 'passenger' : 'passengers'})
                                </span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Taxes & fees (12%)
                                </span>
                                <span>${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Service charge
                                </span>
                                <span>${serviceCharge.toFixed(2)}</span>
                            </div>

                            <Separator className="my-3" />

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="mb-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <h4 className="font-medium flex items-center mb-2">
                            <Clock
                                size={16}
                                className="mr-2 text-yellow-600 dark:text-yellow-400"
                            />
                            Important Information
                        </h4>
                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                            <li>
                                • Please arrive at the airport at least 2 hours before departure.
                            </li>
                            <li>• Carry a valid ID or passport for all passengers.</li>
                            <li>• Check-in closes 45 minutes before departure.</li>
                            <li>• Each passenger is allowed one carry-on bag (7kg max).</li>
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    By confirming, you agree to our{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Terms & Conditions
                    </a>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline">Go Back</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Confirm & Pay ${total.toFixed(2)}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default PaymentConfirmation;
