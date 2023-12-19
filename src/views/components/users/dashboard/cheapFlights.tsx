import * as React from "react";
import { CheapFlight } from "../../../interfaces/interface";
import { Icon } from "@iconify/react";
import "../../../../styles/components/users/dashboard/cheapFlights.css";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import axios from "axios";
import { R } from "@tanstack/react-query-devtools/build/legacy/devtools-c71c5f06";

type Props = {
  cheapFlights: CheapFlight[];
};

export function CheapFlights({ cheapFlights }: Props) {

  React.useEffect(()=>{
    try{
      axios.get("https://api.freepik.com/v1/resources?locale=en-US&page=1&limit=2&order=latest&term=car", {
        headers: {
          "Accept-Language": "en-US",
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Freepik-API-Key": "7RLzKAVmHLgf54OtDtt2CVupyX5kATk9I6wzaqHRtlm1w9aV"
        }})
        .then((response)=>{
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
  }catch(error){
    console.error(error)
  }
  }, [])

  

  return (
    <div className="Cheap-Flights-Frame">
      {cheapFlights.map((cheapFlight, index) => (
        <div className={"Cheap-Flight"} key={index}>
            <div className="Sect-1">
                <div className="From-Loc-Frame">
                  <img src="" alt="From-Location-Ipc" />
                  <div className="From-Loc-Inner-Frame">
                    <p>From</p>
                    <text>{cheapFlight.from}</text>
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
                    <text>{cheapFlight.to}</text>
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
