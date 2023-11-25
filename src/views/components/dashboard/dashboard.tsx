import React, { useEffect, useState } from 'react'
import DashBoardSideBar from '../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../reusableComponents/dashboardNavBar'
import "../../../styles/components/dashboard/dashboard.css"
import { AvailableFlight, CheapFlights, RandomFlights } from '../../interfaces/interface'
import {availableFlight, randomFlight, cheapFlight} from "../../../utilities/placeholder.d"
import { Icon } from '@iconify/react'

const Dashboard = () => {

    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([])
    const [cheapFlights, setCheapFlights] = useState<CheapFlights[]>([])
    const [randomFlights, setRandomFlights] = useState<RandomFlights[]>([])  

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
                    <div className="Cheap-Flight-Frame">
                        <ul className='Cheap-Flights-List-Structure'>
                            {cheapFlights.map((cheapFlight, index) =>(
                            <li key={index}>
                                <img src="" alt="From-Location-Image" />
                                <p>{cheapFlight.from}</p>
                                <Icon icon={'tabler:arrow-right-circle'}/>
                                <img src="" alt="From-Location-Image" />
                                <p>{cheapFlight.to}</p>
                                <p>{cheapFlight.duration}</p>
                                <p>{cheapFlight.seatsRemaining}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
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