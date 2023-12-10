import * as React from "react";
import { CheapFlight } from "../../../interfaces/interface";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/dashboard/cheapFlights.css";

type Props = {
  cheapFlights: CheapFlight[];
};

export function CheapFlights({ cheapFlights }: Props) {
  return (
    <div className="Cheap-Flights-Frame">
      {cheapFlights.map((cheapFlight, index) => (
        <div className={"Cheap-Flight"} key={index}>
          <img src="" alt="From-Location-Ipc" />
          <p>{cheapFlight.from}</p>
          <img src="" alt="From-Location-pic" />
          <p>{cheapFlight.to}</p>
          <p>{cheapFlight.duration}</p>
          <p>{cheapFlight.seatsRemaining}</p>
        </div>
      ))}
    </div>
  );
}
