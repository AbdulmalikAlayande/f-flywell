import React from 'react'
import DashBoardSideBar from '../reusableComponents/dashBoardSideBar'
import DashboardNavBar from '../reusableComponents/dashboardNavBar'
import "../../../styles/components/dashboard/dashboard.css"

const Dashboard = () => {

  return (
    <div className='Dashboard-Main-Frame'>
        <DashBoardSideBar/>
        <div className="Dashboard-Part-Two">
            <DashboardNavBar/>
            <div className="Dashboard-Body">
                <div className="Available-Flights-Frame">
                    
                </div>
                <div className="Cheap-Flight-Frame">
                    
                </div>
                <div className="Random-Flights-Frame">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard