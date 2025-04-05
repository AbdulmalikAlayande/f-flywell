import { Passenger } from '@/views/types'
import React from 'react'


type PaymentConfirmationProps = {
    passengers: Passenger[],
    seats: string[],
    flightDetails: {
        departure: string,
        arrival: string,
        departureCity: string,
        arrivalCity: string,
        date: string,
        flightNumber: string,
        airline: string,
        departureTime: string,
        arrivalTime: string,
        price: number,
        class: string
    }
}
const PaymentConfirmation: React.FC<PaymentConfirmationProps> = () => {

    return (
        <div>
            <h2>Payment Confirmation</h2>
            <p>Your payment has been successfully processed.</p>
            <p>Your reservation ID is: <strong>12345</strong></p>
            <p>Please make a note of your reservation ID for future reference.</p>
            <p>Thank you for choosing our airline!</p>
            <button onClick={() => window.location.href = '/'}>Back to Home</button>
            
        </div>
    )
    }

export default PaymentConfirmation