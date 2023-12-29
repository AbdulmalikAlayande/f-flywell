import React from "react";
import { adminSideBarButtonData } from "../../../../utilities/utility.functions";
import '../../../../styles/components/users/admin/allFlights.css'
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";

export default function AllFlights(){

    const buttonDataArray = adminSideBarButtonData();

    return(
        <div className="All-Flights-Main-Frame">
            <DashBoardSideBar userId={""} buttonData={buttonDataArray}/>
            <div className="All-Flights-Section-2">
                <DashboardNavBar/>
                <div className="All-Flights-Main-Body">
                    <section className="All-Flights-Main-Body-Section-1">
                        <h1>Flights</h1>
                        <div className="All-Flights-Main-Body-Filter-Frame">
                            <p>Filter By: </p>
                            <select>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                            </select>
                        </div>
                    </section>
                    <section className="All-Flights-Main-Body-Section-2">
                        
                    </section>
                </div>
            </div>
        </div>
    )
}