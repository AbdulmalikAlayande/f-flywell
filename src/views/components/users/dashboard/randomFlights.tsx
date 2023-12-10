import React from 'react'
import { RandomFlight } from '../../../interfaces/interface';
import "../../../../styles/components/users/dashboard/randomFlights.css"


type Props = {
  randomFlights: RandomFlight[]
};


const RandomFlights = ({randomFlights}: Props) => {
  return (
    <div className="Random-Flights-Frame">
        {randomFlights.map((cheapFlight, index) =>(
        <div className={'Random-Flight'} key={index}>
            <p>{cheapFlight.from}</p>
            <p>{cheapFlight.to}</p>
            <p>{cheapFlight.duration}</p>
            <p>{cheapFlight.seatsRemaining}</p>
        </div>
        ))}
    </div>
  )
}

export default RandomFlights