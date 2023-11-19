import React from 'react'
import PropTypes from 'prop-types'

interface InputProps{
    id?: string,
    inputType: string,
    className?: string,
    classNames?: string | string[],
    inputLabel: string,
    inputPlaceHolder: string
    onChange?: ()=>void
}

const AuthInput = (props: InputProps) => {
  return (
    <div className="">
        <label>{props.inputLabel}</label>
        <input 
            id={props.id}
            type={props.inputType}
            className={props.className}
            onChange={props.onChange}
            placeholder={props.inputPlaceHolder}
        />
    </div>
  )
}

export default AuthInput