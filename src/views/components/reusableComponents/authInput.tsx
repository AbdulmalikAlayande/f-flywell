import React from 'react'
import '../../../styles/components/reusableComponents/authInput.css'

interface InputProps{
    id?: string,
    inputType: string,
    className?: string,
    classNames?: string | string[],
    inputLabel?: string,
    inputPlaceHolder: string,
    required?: boolean,
    onChange?: ()=>void
}

const AuthInput = (props: InputProps) => {
  return (
    <>
        <label>{props.inputLabel}</label>
        <input 
            id={props.id}
            type={props.inputType}
            className={props.className}
            onChange={props.onChange}
            required={props.required}
            placeholder={props.inputPlaceHolder}
        />
    </>
  )
}

export default AuthInput