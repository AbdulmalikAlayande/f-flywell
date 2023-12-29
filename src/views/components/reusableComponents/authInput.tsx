import React from 'react'
import '../../../styles/components/reusableComponents/authInput.css'

interface InputProps{
    name?: string | undefined
    errorMessage?: string
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
    onInvalid?: (event: React.FormEvent<HTMLInputElement>)=>void,
    regexPattern?:string
    spellCheck?:boolean

}

const AuthInput = (props: InputProps) => {
  return (
    <p className='Input-PTag'>
        <label>{props.inputLabel}</label>
        <input
            onInvalid={props.onInvalid}
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
            spellCheck={props.spellCheck}
        />
        <span className={'Input-Instructions'}><span className={'Error-Message'}></span></span>
    </p>
  )
}

export default AuthInput