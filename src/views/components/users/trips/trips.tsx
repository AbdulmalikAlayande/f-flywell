import React from 'react'
import '../../../../styles/components/users/trips/trips.css'
import DashBoardSideBar from '../../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../../reusableComponents/dashboardNavBar'

const Trips = () => {
  return (
       <div className={"User-Trips-Main-Frame"}>
              <DashBoardSideBar />
              <div className="User-Trips-Part-Two">
                     <DashboardNavBar />
                     <div className={"User-Trips-Main-Body"}>

                     </div>
              </div>
       </div>
  )
}

export default Trips