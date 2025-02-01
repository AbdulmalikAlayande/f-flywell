import { useCallback, useEffect, useState } from "react";
import DashBoardSideBar from "../../../reusables/dashBoardSideBar";
import DashboardNavBar from "../../../reusables/dashboardNavBar";
import "../../../../../styles/components/users/customer/dashboard/dashboard.css";

import {
    randomFlight,
    cheapFlight,
} from "../../../../../utils/placeholder";
import {
    AvailableFlight,
    CheapFlight,
    RandomFlight,
} from "../../../../interfaces/interface";
import { AvailableFlights } from "./availableFlights";
import { CheapFlights } from "./cheapFlights";
import RandomFlights from "./randomFlights";
import PieChart from "./pieChart";
import BarChart from "./barChart";
import { useParams } from "react-router";

const Dashboard = () => {
    
    const param = useParams()
    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([]);
    const [cheapFlights, setCheapFlights] = useState<CheapFlight[]>([]);
    const [randomFlights, setRandomFlights] = useState<RandomFlight[]>([]);

    const fetchAndGet = useCallback(() => {
        setAvailableFlights(availableFlights);
        setRandomFlights(randomFlight);
        setCheapFlights(cheapFlight);
    }, [availableFlights, setCheapFlights, setRandomFlights]);
    useEffect(fetchAndGet, [fetchAndGet]);
    
    
    return (
        <div className="Dashboard-Main-Frame">
            <DashBoardSideBar userId={param.username}/>
            <div className="Dashboard-Part-Two">
                <DashboardNavBar />
                <div className="Dashboard-Body">
                    <div className="Dashboard-Body-Section-1">
                        <AvailableFlights availableFlights={availableFlights} />
                        <CheapFlights cheapFlights={cheapFlights} />
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
