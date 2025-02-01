import * as React from 'react';
import {data} from "@src/utils/placeholder";
import ButtonWithIcon from "../../../reusables/buttonWithIcon";
import {useState} from "react";
import InviteFrame from "./inviteFrame";
import {EmptyUsersFrame} from "./emptyUsersFrame";
import ReactModal from "react-modal";
import {inviteAdminModalStyle} from "@src/utils/utility.functions";
import InviteAdmin from "./inviteAdmin";
import {useFetchUsers} from "./useFetchUsers";

type Admin = {
    role: "ADMIN",
    email: string,
    bioData: {
        firstName: string,
        lastName: string,
        password: string,
        userName: string,
        email: string,
        phoneNumber: string,
        fullName: string,
        gender: "MALE",
        
    }
}

const fetchProp = {
    url: "",
    queryKey: ""
}
export default function Admins() {
    
    const [dataIsEmpty, setDataIsEmpty] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    
    function viewUser(event: React.MouseEvent<HTMLButtonElement>) {
        setDataIsEmpty(false)
        event.preventDefault();
        console.log("Hi")
    }
    
    function editUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Hello")
    }
    
    function openOrCloseModal(value: boolean): void {
        setModalIsOpen(value)
    }
    
    useFetchUsers<Admin>(fetchProp)
    
    return (
        <div className={'Admin-Main-Frame'}>
            <ReactModal style={inviteAdminModalStyle} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <InviteAdmin modalIsOpen={openOrCloseModal}/>
            </ReactModal>
            {dataIsEmpty ? <EmptyUsersFrame customerTypeLabel={'Admin'}/>
            : <div className={'Table'}>
                    <div id={'Coloured'} className={'Table-Header-Frame'}>
                        <p>{"Name"}</p>
                        <p>{"Email"}</p>
                        <p>{"Phone Number"}</p>
                        <p>{"Active Status"}</p>
                        <p>{"Admin Code"}</p>
                        <p>{"Actions"}</p>
                    </div>
                    {data.map((user, index)=>(
                        <div id={index % 2 === 0 ? 'None' : 'Coloured'} key={index} className={'Table-Data-Frame'}>
                            <p className={"Data-Frame"}>{user.firstName + " " +user.lastName}</p>
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
                <InviteFrame onClick={(event)=> {
                    event.preventDefault();
                    setModalIsOpen(true);
                }} userTypeLabel={'Admin'}/>
        </div>
    );
};
