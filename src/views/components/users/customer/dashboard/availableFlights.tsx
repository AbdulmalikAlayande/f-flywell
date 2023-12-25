import * as React from "react";
import { AvailableFlight } from "../../../../interfaces/interface";
import { Icon } from "@iconify/react";
import "../../../../../styles/components/users/customer/dashboard/availableFlights.css";
import useFlights from "./useFlights";
import {useCallback, useState} from "react";
import {FLIGHT_BASE_URL} from "../../../../../utilities/utility.functions";

type Props = {
  availableFlights: AvailableFlight[];
  userId?: string;
};

export function AvailableFlights({ availableFlights }: Props) {
  
  const [flights, setFlights] = useState<AvailableFlight[]>([]);
  
  const props = {
    url: FLIGHT_BASE_URL+"available-flights",
    queryKey: ""
  }
  const {data, error, isLoading} = useFlights<AvailableFlight[]>(props)
  
  useCallback(
      () => {
        if (data) setFlights(data)
      },
      [data],
  );
  
  return (
    <div className="Available-Flights-Frame">
      {availableFlights.map((availableFlight, index) => (
        <div
          key={index}
          id={
            index === availableFlights.length - 1
              ? "Last-Available-Flight"
              : `Id-${index}`
          }
          className="Available-Flight"
        >
          <div className="Available-Flight-To-From-P-Tag">
            {availableFlight.from}
            <div className="Available-Flight-To-From-P-Tag-Div">
              <Icon icon={"cil:arrow-right"} height={"25px"} width={"70px"} />
              <p>{availableFlight.duration}</p>
            </div>

            {availableFlight.to}
          </div>
          <p>{availableFlight.seatsRemaining}</p>
        </div>
      ))}
    </div>
  );
}
