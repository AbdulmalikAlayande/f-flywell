import React, { useEffect, useState } from 'react'
import DashBoardSideBar from '../../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../../reusableComponents/dashboardNavBar'
import "../../../../styles/components/users/dashboard/dashboard.css"
import { availableFlight, randomFlight, cheapFlight } from '../../../../utilities/placeholder.d'
import { AvailableFlight, CheapFlight, RandomFlight } from '../../../interfaces/interface'
import {AvailableFlights} from "./availableFlights";
import {CheapFlights} from "./cheapFlights";

const Dashboard = () => {

    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([])
    const [cheapFlights, setCheapFlights] = useState<CheapFlight[]>([])
    const [randomFlights, setRandomFlights] = useState<RandomFlight[]>([])

    useEffect(()=>{
        setAvailableFlights(availableFlight)
        setRandomFlights(randomFlight)
        setCheapFlights(cheapFlight)
    }, [])


  return (
    <div className='Dashboard-Main-Frame'>
        <DashBoardSideBar/>
        <div className="Dashboard-Part-Two">
            <DashboardNavBar/>
            <div className="Dashboard-Body">
                <div className="Dashboard-Body-Section-1">
                    <AvailableFlights availableFlights={availableFlights}/>
                    <CheapFlights cheapFlights={cheapFlights}/>
                    <div className="Random-Flights-Frame">
                    <ul className='Random-Flights-List-Structure'>
                            {randomFlights.map((cheapFlight, index) =>(
                            <li key={index}>
                                <p>{cheapFlight.from}</p>
                                <p>{cheapFlight.to}</p>
                                <p>{cheapFlight.duration}</p>
                                <p>{cheapFlight.seatsRemaining}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="Dashboard-Body-Section-2">
                    <div className="Statistics-Frame">
                        
                    </div>
                    <div className="Flight-Schedule-Frame">

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard