import * as React from 'react';
import {Icon} from "@iconify/react";
import '../../../../../styles/components/users/admin/dashboard/emptyUsersFrame.css'

type Props = {
    customerTypeLabel: string
};

export function EmptyUsersFrame(props: Props) {
    return (
        <div className={'Empty-Admins-Frame'}>
            <Icon color={'powderblue'} icon={'material-symbols:person-search-outline'} width={'30vw'} height={'30vh'}/>
            <p>No {props.customerTypeLabel} Found</p>
        </div>
    );
};