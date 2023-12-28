import React from "react";
import { adminSideBarButtonData } from "../../../../utilities/utility.functions";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";

export default function AllFlights(){

    const buttonDataArray = adminSideBarButtonData();

    return(
        <div>
            <DashBoardSideBar userId={""} buttonData={buttonDataArray}/>
            <div>
                <DashboardNavBar/>
                <div className="All-Flights-Main-Body">
                    <section className="All-Flights-Main-Body-Section-1">
                        <h1>Flights</h1>
                        <div className="All-Flights-Main-Body-Filter-Frame">
                            <p>Filter By</p>
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