import React, { useState } from 'react'
import DashBoardSideBar from '../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../reusableComponents/dashboardNavBar'
import "../../../styles/components/dashboard/dashboard.css"
import { AvailableFlight, CheapFlights, RandomFlights } from '../../interfaces/interface'


const Dashboard = () => {

    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([])
    const [cheapFlights, setCheapFlights] = useState<CheapFlights[]>([])
    const [randomFlights, setRandomFlights] = useState<RandomFlights[]>([])
    
    function getRandomInt(min: number, max: number): number {
        const byteArray = new Uint32Array(1);
        let unitArray = window.crypto.getRandomValues(byteArray);
        console.log("unitArray", unitArray)
        const range = max - min + 1;
        const maxRange = Math.pow(2, 32) - 1;
        console.log("maxRange ==> ", maxRange);
        if (unitArray[0] >= Math.floor(maxRange / range) * range) {
          return getRandomInt(min, max);
        }
        return min + (byteArray[0] % range);
      }
      
    const randomNum = getRandomInt(1, 100);
    console.log("random number:: ", randomNum);
      
  return (
    <div className='Dashboard-Main-Frame'>
        <DashBoardSideBar/>
        <div className="Dashboard-Part-Two">
            <DashboardNavBar/>
            <div className="Dashboard-Body">
                <div className="Dashboard-Body-Section-1">
                    <div className="Available-Flights-Frame">
                        <ul>
                            {availableFlights.map((availableFlight, index) =>(
                            <li className='AvailableFlight' key={index}>
                                <p>{availableFlight.from}</p>
                                <p>{availableFlight.to}</p>
                                <p>{availableFlight.duration}</p>
                                <p>{availableFlight.seatsRemaining}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Cheap-Flight-Frame">
                        <ul className='Cheap-Flights-List-Structure'>
                            {cheapFlights.map((cheapFlight, index) =>(
                            <li key={index}>
                                <p>{cheapFlight.from}</p>
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