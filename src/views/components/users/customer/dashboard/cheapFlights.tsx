import fetchCartoonImageOfLocation from './fetchCartoonImageOfLocation'
import {useCallback, useState} from "react";
import useFlights from "../../../../../hooks/useFlights";
import {toast} from "react-toastify";
import { cheapFlightsUrl } from '@src/utils/functions';
import ButtonWithIcon from '@src/views/components/reusables/buttonWithIcon';
// import { CheapFlight } from '@src/views/interfaces/interface';

// type Props = {
//   cheapFlights: CheapFlight[];
// };

const requestProps = {
  url: cheapFlightsUrl as string,
  queryKey: "cheapFlights"
}
/*
FIXME:
   FIXABLE: Normally When Data Is Fetched From The Backend They should be cached and then they should be rendering
   One by One, which means that the parameter passed to fetchCartoonImageOfLocation, should be different for each
   Render
*/
export function CheapFlights() {

      const [fromLocUrl, setFromLocUrl] = useState<string>("")
      const [toLocUrl, setToLocUrl] = useState<string>("")

      const {data, error, isLoading} = useFlights<CheapFlight[]>(requestProps)

      useCallback(
          () => {
              if (data) {
                setFromLocUrl(fetchCartoonImageOfLocation(data[0]?.fromLocImageTermName))
                setToLocUrl(fetchCartoonImageOfLocation(data[0]?.toLocImageTermName))
              }
          },
          [data],
      );
      if (error) {
          toast.error("", {
              pauseOnHover: true, autoClose: 5000, position: "top-center", style: {
                width: '40vw',
                height: '15vh'
              }
          })
      }
      return (
          isLoading? (<div className={'Loading-Frame'}><p>Loading</p></div>)
          : error ?(<div><p>An Error Occurred</p></div>)
          : (<div className="Cheap-Flights-Frame">
            {data && Array.isArray(data) && data?.map((cheapFlight, index) => (
                <div className={"Cheap-Flight"} key={index}>
                  <div className="Sect-1">
                    <div className="From-Loc-Frame">
                      <img src={fromLocUrl} alt="From-Location-Ipc"/>
                      <div className="From-Loc-Inner-Frame">
                        <p>From</p>
                        <p>{cheapFlight.departureLocation}</p>
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
                        <p>{cheapFlight.arrivalLocation}</p>
                      </div>
                      <img src={toLocUrl} alt="To-Location-pic" />
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
          )
      );
}
