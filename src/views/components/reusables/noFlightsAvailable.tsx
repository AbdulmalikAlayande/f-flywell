import * as React from 'react';
import {Icon} from "@iconify/react";

type Props = {
    type: string
    icon: string
};

function NoFlightsAvailable(props: Props) {

    return (
        <div>
            <Icon icon={props.icon}/>
            <p>No {props.type} Found</p>
        </div>
    );
}
export default NoFlightsAvailable;