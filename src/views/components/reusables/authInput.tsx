import React from 'react'

interface InputProps{
    name?: string | undefined
    errorMessage?: string
    id?: string,
    inputType: string,
    className?: string,
    labelClassName?: string,
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
    <div>
        <label htmlFor={props.name} className={props.labelClassName ? props.labelClassName : ''}>{props.inputLabel}</label>
        <div className='mt-2'>
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
        </div>
    </div>
  )
}

export default AuthInput