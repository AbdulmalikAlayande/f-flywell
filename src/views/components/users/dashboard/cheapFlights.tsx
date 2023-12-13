import * as React from "react";
import { CheapFlight } from "../../../interfaces/interface";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/dashboard/cheapFlights.css";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";

type Props = {
  cheapFlights: CheapFlight[];
};

export function CheapFlights({ cheapFlights }: Props) {
  return (
    <div className="Cheap-Flights-Frame">
      {cheapFlights.map((cheapFlight, index) => (
        <div className={"Cheap-Flight"} key={index}>
          <div className="Sect-1">
            <div className="From-Loc-Frame">
              <img src="" alt="From-Location-Ipc" />
              <p>{cheapFlight.from}</p>
            </div>
            <div className="To-Loc-Frame">
              <img src="" alt="To-Location-pic" />
              <p>{cheapFlight.to}</p>
            </div>
            <p>{cheapFlight.duration}</p>
          </div>
          <div className="Sect-2">
            <p>Seats Remaining: {cheapFlight.seatsRemaining}</p>
            <p>Airline: {"Bola-Air"}</p>
            <ButtonWithIcon icon={"icon-park-outline:preview-open"}/>
          </div>
          
        </div>
      ))}
    </div>
  );
}
