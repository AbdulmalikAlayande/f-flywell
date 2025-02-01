import { useCallback, useEffect, useState } from "react";

import {randomFlight} from "@src/utils/placeholder";
import {  AvailableFlight, RandomFlight } from "../../../../interfaces/interface";
import { AvailableFlights } from "./availableFlights";
import { CheapFlights } from "./cheapFlights";
import RandomFlights from "./randomFlights";
import PieChart from "./pieChart";
import BarChart from "./barChart";
import { useParams } from "react-router";
import DashboardNavBar from "@src/views/components/reusables/dashboardNavBar";
import DashBoardSideBar from "@src/views/components/reusables/dashBoardSideBar";

const Dashboard = () => {
    
    const param = useParams()
    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([]);
    const [randomFlights, setRandomFlights] = useState<RandomFlight[]>([]);

    const fetchAndGet = useCallback(() => {
        setAvailableFlights(availableFlights);
        setRandomFlights(randomFlight);
    }, [availableFlights]);
    useEffect(fetchAndGet, [fetchAndGet]);
    
    
    return (
        <div className="Dashboard-Main-Frame">
            <DashBoardSideBar userId={param.username}/>
            <div className="Dashboard-Part-Two">
                <DashboardNavBar />
                <div className="Dashboard-Body">
                    <div className="Dashboard-Body-Section-1">
                        <AvailableFlights availableFlights={availableFlights} />
                        <CheapFlights />
                        <RandomFlights randomFlights={randomFlights} />
                    </div>
                    <div className="Dashboard-Body-Section-2">
                        <BarChart />
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
