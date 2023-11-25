import * as React from 'react';
import {AvailableFlight} from "../../../interfaces/interface";
import {Icon} from "@iconify/react";
import "../../../../styles/components/dashboard/dashboard/availableFlights.css"

type Props = {
    availableFlights: AvailableFlight[]
};

export function AvailableFlights({availableFlights}: Props) {


    return (
        <div className="Available-Flights-Frame">
            <ul className='Available-Flights'>
                {availableFlights.map((availableFlight, index) =>(
                    <li id={`id-${index}`} className='Available-Flight' key={index}>
                        <div className="">
                            <p className='Available-Flight-To-From-P-Tag'>
                                {availableFlight.from}
                                <div className="Available-Flight-To-From-P-Tag-Div">
                                    <Icon icon={'tabler:arrow-right-circle'} height={'25px'} width={'25px'}/>
                                    <p>{availableFlight.duration}</p>
                                </div>
                                {availableFlight.to}
                            </p>
                            <p>{availableFlight.seatsRemaining}</p>
                        </div>
                        {}
                    </li>
                ))}
            </ul>
        </div>
    );
}