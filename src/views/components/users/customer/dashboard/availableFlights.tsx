import { AvailableFlight } from "../../../../interfaces/interface";
import { Icon } from "@iconify/react";
import useFlights from "./useFlights";
import {useCallback, useState} from "react";
import {FLIGHT_BASE_URL} from "../../../../../utils/utility.functions";
import Logger from "@src/utils/logger";

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
  const {data} = useFlights<AvailableFlight[]>(props)
  
  useCallback(
      () => {
        Logger.info("Available "+flights.toString())
        if (data) setFlights(data)
      },
      [data, flights],
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
            {availableFlight.departureLocation}
            <div className="Available-Flight-To-From-P-Tag-Div">
              <Icon icon={"cil:arrow-right"} height={"25px"} width={"70px"} />
              <p>{availableFlight.duration}</p>
            </div>

            {availableFlight.arrivalLocation}
          </div>
          <p>{availableFlight.seatsRemaining}</p>
        </div>
      ))}
    </div>
  );
}
