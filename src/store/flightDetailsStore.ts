import { AvailableFlight } from '@/views/interfaces/interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const flightDetailsStore = create<AvailableFlight>()(
    persist(
        set => ({
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
            publicId: '',
            seatsRemaining: 0,
            duration: '',
            setFlightDetails: (details: Partial<AvailableFlight>) =>
                set(state => ({ ...state, ...details })),
            clearFlightDetails: () =>
                set({
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
                    publicId: '',
                    seatsRemaining: 0,
                    duration: '',
                }),
        }),
        {
            name: 'flight-details',
            partialize: state => ({
                flightNumber: state.flightNumber,
                departureTime: state.departureTime,
                arrivalTime: state.arrivalTime,
                seats: state.seats,
                seats_: state.seats_,
                prices: state.prices,
                flight: {
                    arrivalCity: state.flight.arrivalCity,
                    departureCity: state.flight.departureCity,
                    displayImage: state.flight.displayImage,
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
                publicId: state.publicId,
                seatsRemaining: state.seatsRemaining,
                duration: state.duration,
            }),
        }
    )
);
