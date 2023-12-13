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
                  <div className="From-Loc-Inner-Frame">
                    <p>From</p>
                    <p>{cheapFlight.from}</p>
                  </div>
                </div>
                <div className="Sect-1-Middle-Part">
                  <p>{cheapFlight.duration}</p>
                  <div className="Sect-1-Divider-Frame">
                    <div className="Sect-1-Divider-Circle-1"></div>
                    <div className="Sect-1-Divider-Line"></div>
                    <div className="Sect-1-Divider-Circle-2"></div>
                  </div>
                </div>
                <div className="To-Loc-Frame">
                  <div className="To-Loc-Inner-Frame">
                    <p>To</p>
                    <p>{cheapFlight.to} </p>
                  </div>
                  <img src="" alt="To-Location-pic" />
                </div>
            </div>
            <div className="Sect-2">
              <p>Seats Remaining: {cheapFlight.seatsRemaining}</p>
              <p>Airline: {"Bola-Air"}</p>
              <div className="Sect-2-View-Flight-Frame">
                <p>Date: {"14/12/23"}</p>
                <ButtonWithIcon iconWidth={'25px'} iconHeight={'25px'} icon={"icon-park-outline:preview-open"}/>
              </div>
            </div>
          
        </div>
      ))}
    </div>
  );
}
