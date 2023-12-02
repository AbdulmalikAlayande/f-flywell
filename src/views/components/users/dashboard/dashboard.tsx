import React, { useCallback, useEffect, useState } from 'react'
import DashBoardSideBar from '../../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../../reusableComponents/dashboardNavBar'
import "../../../../styles/components/users/dashboard/dashboard.css"
import { availableFlight, randomFlight, cheapFlight } from '../../../../utilities/placeholder.d'
import { AvailableFlight, CheapFlight, RandomFlight } from '../../../interfaces/interface'
import {AvailableFlights} from "./availableFlights";
import {CheapFlights} from "./cheapFlights";
import RandomFlights from './randomFlights'
import { createClient } from 'pexels';


const Dashboard = () => {

    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([])
    const [cheapFlights, setCheapFlights] = useState<CheapFlight[]>([])
    const [randomFlights, setRandomFlights] = useState<RandomFlight[]>([])

    const fetchAndGet = useCallback(()=>{
        setAvailableFlights(availableFlight)
        setRandomFlights(randomFlight)
        setCheapFlights(cheapFlight)

        if(process.env.PEXELS_API){
            const client = createClient(process.env.PEXELS_API);
            const query = 'Nature';

            client.photos.curated({ per_page: 1 })
                .then((photos) => {

                });
            client.photos.search({ query, er_page: 1 }).then(photos => {});
        }
        const client = createClient('WSHTE90eSRxLTn6uiAfhb953mFr6iNvbckedXhf8eEoatDMaNxWkM77M');
            const query = 'Abuja, Nigeria';

            client.photos.curated({ per_page: 1 })
                .then((photos) => {
                    console.log("curated photos ==> ",photos)
                });
            client.photos.search({ query, er_page: 1 })
                .then(photos => {
                    console.log("searched photos ==> ", photos)
                });

    }, [setAvailableFlights, setCheapFlights, setRandomFlights])

    
    useEffect(fetchAndGet, [])


  return (
    <div className='Dashboard-Main-Frame'>
        <DashBoardSideBar/>
        <div className="Dashboard-Part-Two">
            <DashboardNavBar/>
            <div className="Dashboard-Body">
                <div className="Dashboard-Body-Section-1">
                    <AvailableFlights availableFlights={availableFlights}/>
                    <CheapFlights cheapFlights={cheapFlights}/>
                    <RandomFlights randomFlights={randomFlights}/>
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