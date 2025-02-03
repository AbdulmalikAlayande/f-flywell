import ButtonWithIcon from '@src/views/components/reusables/buttonWithIcon'
import DashboardNavBar from '@src/views/components/users/customer/dashboard/navbar'
import DashBoardSideBar from '@src/views/components/users/customer/dashboard/sidebar'
import '../../../../../styles/components/users/customer/trips/trips.css'
import { availableFlights } from '@src/utils/placeholder'

const Trips = () => {

    const  userId = "Hello"
       return (
              <div className={"User-Trips-Main-Frame"}>
              <DashBoardSideBar userId={userId}/>
                     <div className="User-Trips-Part-Two">
                            <DashboardNavBar />
                            <div className={"User-Trips-Main-Body"}>
                            {availableFlights.map((trip)=>(
                                   <div className="Trip">
                                   <div className="Trip-Info-Section">
                                   <div className="Trip-From-Frame">
                                          <img src="" alt="From-Pic" />
                                          <div className="Trip-From-Inner-Frame">
                                          <h1>{trip.departureLocation}</h1>
                                          <h2>{trip.duration}</h2>
                                          </div> 
                                   </div>
                                   <div className="Trip-Middle-Part">
                                          <p>{trip.duration}</p>
                                          <div className="Trip-Divider-Frame">
                                          <div className="Divider-Circle-1"></div>
                                          <div className="Divider-Line"></div>
                                          <div className="Divider-Circle-2"></div>
                                   </div>
                                   </div>
                                   
                                   <div className="Trip-To-Frame">
                                          <div className="Trip-To-Inner-Frame">
                                          <h1>{trip.arrivalLocation}</h1>
                                          <h2>{trip.duration}</h2>
                                          </div>
                                          <img src="" alt="To-Pic" />
                                   </div>
                                   </div>
                                          <div className="Section-2">
                                                 <div className="Flight-Number-And-View-Flight-Btn-Frame">
                                                 <p>Seat Number: {trip.seatsRemaining}</p>
                                                 <p>Airline: {"Bola-Air"}</p>
                                                 <ButtonWithIcon buttonPlaceHolder='View' icon={'icon-park-outline:preview-open'}/>

                                          </div>
                                          </div>
                                   </div>
                            ))}
                            </div>
                     </div>
              </div>
       )
}

export default Trips