import * as React from 'react';
import '../../../../../styles/components/users/admin/dashboard/admins.css'
import {data} from "../../../../../utilities/placeholder";
import ButtonWithIcon from "../../../reusableComponents/buttonWithIcon";
import {useState} from "react";
import InviteFrame from "./inviteFrame";
import {EmptyUsersFrame} from "./emptyUsersFrame";
import ReactModal from "react-modal";
import {inviteAdminModalStyle} from "../../../../../utilities/utility.functions";
import InviteAdmin from "./inviteAdmin";

export default function Admins() {
    
    const [dataIsEmpty, setDataIsEmpty] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    
    function viewUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Hi")
    }
    
    function editUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log("Hello")
    }
    
    return (
        <div className={'Admin-Main-Frame'}>
            <ReactModal style={inviteAdminModalStyle} isOpen={modalIsOpen} onRequestClose={(event) => setModalIsOpen(false)}>
                <InviteAdmin/>
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