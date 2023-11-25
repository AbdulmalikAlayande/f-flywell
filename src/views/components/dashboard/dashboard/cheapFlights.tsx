import * as React from 'react';
import {CheapFlight} from "../../../interfaces/interface";
import {Icon} from "@iconify/react";
import "../../../../styles/components/dashboard/dashboard/cheapFlights.css"

type Props = {
    cheapFlights: CheapFlight[]
};

export function CheapFlights({cheapFlights}: Props) {


    return (
        <div className="Cheap-Flight-Frame">
            <ul className='Cheap-Flights-List-Structure'>
                {cheapFlights.map((cheapFlight, index) =>(
                    <li key={index}>
                        <img src="" alt="From-Location-Ipc" />
                        <p>{cheapFlight.from}</p>
                        <Icon icon={'tabler:arrow-right-circle'}/>
                        <img src="" alt="From-Location-pic" />
                        <p>{cheapFlight.to}</p>
                        <p>{cheapFlight.duration}</p>
                        <p>{cheapFlight.seatsRemaining}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}