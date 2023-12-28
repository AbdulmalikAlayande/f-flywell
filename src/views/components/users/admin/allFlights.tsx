import React from "react";
import DashboardNavBar from "../../reusableComponents/dashboardNavBar";
import DashBoardSideBar from "../../reusableComponents/dashBoardSideBar";

export default function AllFlights(){

    const buttonDataArray = [
        {
            btnLabel: "Dashbaord",
            btnIcon: "pixelarticons:dashbaord",
            btnUrl: "/bola-air/admin/dashboard",
            value: "dashboard"
        },
        {
            btnLabel: "Profile",
            btnIcon: "gg:profile",
            btnUrl: "/bola-air/admin/profile",
            value: "profile"
        },
        {
            btnLabel: "Users",
            btnIcon: "uil:users-alt",
            btnUrl: "/bola-air/users",
            value: "users"
        },
        {
            btnLabel: "Flights",
            btnIcon: "mdi:flight",
            btnUrl: "/bola-air/all-flights",
            value: "flights"
        },
        {
            btnLabel: "Instances",
            btnIcon: "icon-park-outline:round-trip",
            btnUrl: "/bola-air/all-instances",
            value: "flight-instance"
        },
        {
            btnLabel: "Air Crafts",
            btnIcon: "material-symbols:flightsmode",
            btnUrl: "/bola-air/all-aircrafts",
            value: "air-crafts"
        },
        {
            btnLabel: "Trips",
            btnIcon: "icon-park-outline:round-trip",
            btnUrl: "/bola-air/all-trips",
            value: "trips"
        },
    ]


    return(
        <div>
            <DashboardNavBar/>
            <div>
                <DashBoardSideBar userId={""}/>
            </div>
        </div>
    )
}