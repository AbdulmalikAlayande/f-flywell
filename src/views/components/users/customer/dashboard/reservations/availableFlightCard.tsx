import React from 'react'

import {AvailableFlight} from "@src/views/interfaces/interface";
import { format } from 'date-fns';
import SolidButton from '@src/views/components/reusables/solidButton';
import Logger from '@src/utils/logger';
import image from "@assets/images/jpg/beijing.jpg";

interface AvailableFlightProps extends AvailableFlight {
    badge: {
        refundable: "partially" | "non" | "",
        sortOption: "recommended" | "cheapest",
    }
    displayImage?: string;
}

const AvailableFlightCard = (props: AvailableFlightProps) => {
  
    function makeReservation(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        Logger.error('Function not implemented.');
    } 

    return (
        <div className={'w-full h-full rounded-2xl flex items-center justify-between gap-1 md:gap-3 lg-gap-6 p-2 lg:p-4'}>
            {/*  */}
            <div className={'h-full flex flex-col items-center justify-between text-sm gap-4'}>
                <img 
                    // src={props.flight.displayImage}
                    src={image} 
                    alt="Flight" 
                    className={"w-10 h-10 rounded-full"}
                />
                <span className={'text-center inline-flex items-center px-1 py-1.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500'}>{props.badge.refundable.normalize()+ " " + "Refundable"}</span>
            </div>
            {/*  */}

            {/*  */}
            <div className='h-full lg:w-130 flex items-center justify-between gap-2 md:gap-4 lg:gap-0 text-xs sm:text-sm '>
                <div className='!text-xs sm:!text-sm text-gray-950 dark:text-white'>
                    <time className="!text-xs sm:!text-sm">{format(props.departureTime, 'p')}</time>
                    <span>
                        <p className="hidden lg:block !text-xs sm:!text-sm">{props.flight.departureAirport.name}</p>
                        <p className="!text-xs sm:!text-sm">{props.flight.departureCity}</p>
                    </span>
                </div>
                <div className='lg:w-60 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512">
                        <path fill="currentColor" d="M407.72 208c-2.72 0-14.44.08-18.67.31l-57.77 1.52L198.06 48h-62.81l74.59 164.61l-97.31 1.44L68.25 160H16.14l20.61 94.18c.15.54.33 1.07.53 1.59a.26.26 0 0 1 0 .15a15 15 0 0 0-.53 1.58L15.86 352h51.78l45.45-55l96.77 2.17L135.24 464h63l133-161.75l57.77 1.54c4.29.23 16 .31 18.66.31c24.35 0 44.27-3.34 59.21-9.94C492.22 283 496 265.46 496 256c0-30.06-33-48-88.28-48m-71.29 87.9"></path>
                    </svg>
                    <div className='flex flex-col items-center justify-center !text-xs sm:!text-sm'>
                        {props.duration}
                        <hr className={'w-full h-1 border-t-2 border-dashed my-2 dark:border-white'}/>
                        {"Lorem"}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path>
                    </svg>
                </div>
                <div className='!text-xs sm:!text-sm text-gray-950 dark:text-white'>
                    <time className="!text-xs sm:!text-sm">{format(props.arrivalTime, 'p')}</time>
                    <span>
                        <p className="hidden lg:block !text-xs sm:!text-sm">{props.flight.arrivalAirport.name}</p>
                        <p className="!text-xs sm:!text-sm">{props.flight.arrivalCity}</p>
                    </span>
                </div>
            </div>
            {/*  */}

            {/*  */}
            <div className='h-full flex flex-col items-center justify-between gap-2'>
                <span className={'inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500'}>{props.badge.sortOption}</span>
                <p className={'text-sm md:text-[16px] lg:text-lg'}>{props.flightNumber}</p>
                <SolidButton onClick={makeReservation}>Book Now</SolidButton>
            </div>
        </div>
    )
}

export default AvailableFlightCard