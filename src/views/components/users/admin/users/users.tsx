import * as React from 'react';
import {useState} from "react";
import Customers from "./customers";
import Admins from "./admins";
import DashBoardSideBar from '@src/views/components/users/customer/dashboard/sidebar';
import { adminSideBarButtonData } from '@src/utils/functions';
import DashboardNavBar from '@src/views/components/users/customer/dashboard/navbar';
    
enum UserType {
    ADMINS="admins",
    CUSTOMERS= "customers",
    CREW_MEMBERS = "Crew Members",
    FRONT_DESK_OFFICERS ="Front Desk Officers"
}
export default function Users() {
    const [userType, setUserType] = useState<UserType>(UserType.CUSTOMERS);
    const buttonDataArray = adminSideBarButtonData()
    
    function displaySpecifiedUsers(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const eventTarget = event.target as HTMLButtonElement;
        setUserType( eventTarget.value as UserType)
    }
    
    const buttonFocusStyle = {
        backgroundColor: "powderBlue",
        borderRadius: "30px",
        color: "black"
    }
    return (
        <div className={"Admin-Users-Frame"}>
            <DashBoardSideBar userId={""} buttonData={buttonDataArray}/>
            <div className={"Admin-Users-Frame-II"}>
                <DashboardNavBar/>
                <div className={"Admin-Users-Main-Body-Frame"}>
                    <h1>Bola Air Users</h1>
                    <div className={"Buttons-And-Filter-Frame"}>
                        <div className={"User-Button-Frame"}>
                            <button style={userType === UserType.CUSTOMERS ? buttonFocusStyle : undefined} onClick={displaySpecifiedUsers} value={UserType.CUSTOMERS}>Customers</button>
                            <button style={userType === UserType.ADMINS ? buttonFocusStyle : undefined} onClick={displaySpecifiedUsers} value={UserType.ADMINS}>Admins</button>
                            <button style={userType === UserType.CREW_MEMBERS ? buttonFocusStyle : undefined} onClick={displaySpecifiedUsers} value={UserType.CREW_MEMBERS}>Crew Members</button>
                            <button style={userType === UserType.FRONT_DESK_OFFICERS ? buttonFocusStyle : undefined} onClick={displaySpecifiedUsers} value={UserType.FRONT_DESK_OFFICERS}>Front Desk Officers</button>
                        </div>
                        <div className={"Filter-Frame"}>
                            <p>Filter By: </p>
                            <select>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                            </select>
                        </div>
                    </div>
                    <div className={"All-Users-Frame"}>
                        {userType===UserType.CUSTOMERS && <Customers/>}
                        {userType===UserType.ADMINS && <Admins/>}
                        {userType===UserType.CREW_MEMBERS && <div></div>}
                        {userType===UserType.FRONT_DESK_OFFICERS && <div></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
