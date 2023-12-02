import React from 'react'
import '../../../styles/components/reusableComponents/authInput.css'

interface InputProps{
    name?: string | undefined
    id?: string,
    inputType: string,
    className?: string,
    classNames?: string | string[],
    inputLabel?: string,
    inputPlaceHolder: string,
    required?: boolean,
    minimumLength?: number,
    maximumLength?: number,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>)=>void,
    regexPattern?:string
}

const AuthInput = (props: InputProps) => {
  return (
    <p className='Input-PTag'>
        <label>{props.inputLabel}</label>
        <input
            name={props.name}
            id={props.id}
            type={props.inputType}
            className={props.className}
            onChange={props.onChange}
            required={props.required}
            placeholder={props.inputPlaceHolder}
            pattern={props.regexPattern}
            minLength={props.minimumLength}
            maxLength={props.maximumLength}
        />
        <span className={'Input-Instructions'}><span className={'Error-Message'}></span></span>
    </p>
  )
}

export default AuthInput