import React, { useCallback, useEffect, useState } from "react";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import "../../../../styles/components/users/dashboard/dashboard.css";

import {
  availableFlight,
  randomFlight,
  cheapFlight,
} from "../../../../utilities/placeholder.d";
import {
  AvailableFlight,
  CheapFlight,
  RandomFlight,
} from "../../../interfaces/interface";
import { AvailableFlights } from "./availableFlights";
import { CheapFlights } from "./cheapFlights";
import RandomFlights from "./randomFlights";
import { createClient } from "pexels";
import PieChart from "./pieChart";
import BarChart from "./barChart";

const Dashboard = () => {
  const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>(
    []
  );
  const [cheapFlights, setCheapFlights] = useState<CheapFlight[]>([]);
  const [randomFlights, setRandomFlights] = useState<RandomFlight[]>([]);

  const fetchAndGet = useCallback(() => {
    setAvailableFlights(availableFlight);
    setRandomFlights(randomFlight);
    setCheapFlights(cheapFlight);
  }, [setAvailableFlights, setCheapFlights, setRandomFlights]);

  useEffect(fetchAndGet, []);

  return (
    <div className="Dashboard-Main-Frame">
      <DashBoardSideBar />
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
