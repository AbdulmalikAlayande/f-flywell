import React from 'react'
import PropTypes from 'prop-types'

interface ButtonProps{
    id?: string,
    className?: string,
    classNames?: string | string[],
    buttonLabel?: string,
    buttonPlaceHolder: string,
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: ()=>{}
}

const CallToActionButton = (props: ButtonProps) => {
  return (
    <button
        id={props.id}
        type={props.type}
        onClick={props.onClick}
        className={props.className}
        >
            {props.buttonPlaceHolder}
    </button>
  )
}

export default CallToActionButton