import React, { useEffect } from 'react';
import { Icon } from "@iconify-icon/react";
import TextBlock from '../../../components/ui/textBlock.tsx';
import Logger from '@src/utils/logger';


interface CardProps {
    textBlockClassName?: string;
    title: string;
    content: string;
    icon?: string | React.ReactElement;
    iconClassName?: string;
    imageUrl?: string;
    imageClassName?: string;
    footer?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const FeatureCard: React.FC<CardProps> = (props) => {

    useEffect(() => {
        Logger.info("Icon: "+props.icon);
    }, [props.icon]);
    return (
        <div className={`card ${props.className}`} onClick={props.onClick}>
            <span className='w-15 h-15 border-2 border-[#2563eb] flex items-center justify-center text-center rounded-full flex-shrink-0'>
                {typeof props.icon === "string" 
                    ?   (<Icon className={props.iconClassName} icon={props.icon} />) 
                    :   (props.icon && React.cloneElement(props.icon, { className: props.iconClassName }))
                }
            </span>
            <TextBlock 
                text={props.title} 
                subText={props.content} 
                className={props.textBlockClassName}
                textClassName={"w-full text-lg md:text-xl text-center tracking-wide font-bold leading-non dark:text-white text-gray-900"}
                subTextClassName={"w-full text-center font-medium text-gray-700 dark:text-gray-300"}
            />
            {props.footer && <div className="card-footer">{props.footer}</div>}
        </div>
    );
};

export default FeatureCard;