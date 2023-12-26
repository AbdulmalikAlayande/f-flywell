import * as React from 'react';
import ButtonWithIcon from "../../../reusableComponents/buttonWithIcon";
import '../../../../../styles/components/users/admin/dashboard/inviteFrame.css'

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void
    userTypeLabel: string
};

export default function InviteFrame(props: Props) {
    
    
    return (
        <div className={'Invite-Frame'}>
            <ButtonWithIcon onClick={props.onClick} icon={'fluent:add-12-regular'} buttonPlaceHolder={`Invite New ${props.userTypeLabel}`}/>
        </div>
    );
};