import React from 'react'
import "../../../styles/components/reusableComponents/callToActionButton.css"

interface ButtonProps{
    id?: string,
    className?: string,
    classNames?: string | string[],
    buttonLabel?: string,
    value?: any,
    buttonPlaceHolder: string,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>)=>void,
    style?: {}
}

const CallToActionButton = (props: ButtonProps) => {
  return (
    <button
        id={props.id}
        type={props.type}
        onClick={props.onClick}
        className={`Call-To-Action-Button ${props.className}`}
        style={props.style && props.style}
        value={props.value}
        >
            {props.buttonPlaceHolder}
    </button>
  )
}

export default CallToActionButton