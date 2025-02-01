import * as React from 'react';
import ButtonWithIcon from "../../../reusables/buttonWithIcon";
import {data} from "../../../../../utils/placeholder";
import '../../../../../styles/components/users/admin/dashboard/customers.css'
import {useState} from "react";
import {EmptyUsersFrame} from "./emptyUsersFrame";
import InviteFrame from "./inviteFrame";

type CustomerData = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    ffn: string,
}
export default function Customers() {
    const [dataIsEmpty, setDataIsEmpty] = useState<boolean>(false);
    
    function viewUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Hi")
    }
    
    function editUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Hello")
    }
    
    
    const fetchProps = {
        url: "http://localhost:8081/bola-air/api/v3/all-customers/",
        queryKey: "users"
    }
    // const {data, error, isLoading} = useFetchUsers<CustomerData>(fetchProps)
    
    return (
        <div className={"Customer-Main-Frame"}>
            {dataIsEmpty ? <EmptyUsersFrame customerTypeLabel={"Customers"}/>
            :   <div className={'Table'}>
                    <div id={'Coloured'} className={'Table-Header-Frame'}>
                        <p>{"First Name"}</p>
                        <p>{"Last Name"}</p>
                        <p>{"Email"}</p>
                        <p>{"Phone Number"}</p>
                        <p>{"Status"}</p>
                        <p>{"F.F. Number"}</p>
                        <p>{"Actions"}</p>
                    </div>
                    {data.map((user, index)=>(
                        <div id={index % 2 === 0 ? 'None' : 'Coloured'} key={index} className={'Table-Data-Frame'}>
                            <p className={"Data-Frame"}>{user.firstName}</p>
                            <p className={"Data-Frame"}>{user.lastName}</p>
                            <p className={"Data-Frame"}>{user.email}</p>
                            <p className={"Data-Frame"}>{user.phoneNumber}</p>
                            <p className={"Data-Frame"}>{user.status}</p>
                            <p className={"Data-Frame"}>{user.ffn}</p>
                            <p className={'Action-Button-Frame'}>
                                <ButtonWithIcon onClick={viewUser} iconWidth={'30px'} iconHeight={'25px'} icon={"el:eye-open"}/>
                                <ButtonWithIcon onClick={editUser} iconWidth={'30px'} iconHeight={'25px'} icon={"iconamoon:edit-thin"}/>
                            </p>
                        </div>
                    ))}
                </div>}
            <InviteFrame onClick={viewUser} userTypeLabel={'Customer'}/>
        </div>
    );
};
