import React from "react";
import { RandomFlight } from "../../../../interfaces/interface";
import "../../../../../styles/components/users/customer/dashboard/randomFlights.css";
import AbuDhabi from "../../../../../assets/images/jpg/abu-dhabi-1.jpg";

type Props = {
  randomFlights: RandomFlight[];
};

const RandomFlights = ({ randomFlights }: Props) => {
  return (
    <div className="Random-Flights-Frame">
      {randomFlights.map((cheapFlight, index) => (
        <div className={"Random-Flight"} key={index}>
          <div className="Random-Flight-Frame-1">
            <h2>{cheapFlight.departureLocation}</h2>
            <p>{cheapFlight.arrivalLocation}</p>
            <h1>{cheapFlight.duration}</h1>
            <p>{cheapFlight.seatsRemaining}</p>
          </div>
          <div className="Random-Flight-Frame-2">
            <div className="Airline">
              <p>Airline</p>
              <p>Bola-Air</p>
            </div>
            <div className="Times">
              <p>Times</p>
              <p>12:00pm</p>
            </div>
            <div className="Visibility">
              <p>Visibility</p>
              <p>4.3 km</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RandomFlights;
