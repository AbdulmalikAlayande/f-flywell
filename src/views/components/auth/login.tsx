import React, { FormEvent } from 'react'
import AuthInput from '../reusableComponents/authInput'
import CallToActionButton from '../reusableComponents/callToActionButton'
import { Icon } from '@iconify/react'
import "../../../styles/components/auth/login.css"

const Login = () => {
    
    let emailPattern: string = '/^[a-z0-9._%±]+@(gmail|yahoo|outlook|hotmail|aol|icloud|mail|msn|live|yandex)\.com$/i';
    let emailPattern2 = '^[a-zA-Z0-9._%+-]+@gmail\.com$/i'

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        let eventTarget = event.target as HTMLInputElement
        let childNodes = eventTarget.childNodes;
        let children= eventTarget.children;        
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();
        let eventTarget = event.target as HTMLInputElement
        if(eventTarget.type === 'email'){
            let parentElementChildNodes = eventTarget.parentElement?.childNodes;
            if(parentElementChildNodes){
                const span = parentElementChildNodes[2]
                span.textContent = "Please provide a gmail, thanks"
            }
        }
    }

  return (
    <div className={'Login-Main-Frame'}>
        {/* */}
        <form onSubmit={handleSubmit} className={'Login-Form'}>
           <div className="Login-Form-Inputs-Frame">
            <AuthInput 
                    inputType={'email'} 
                    inputLabel={'Email'} 
                    inputPlaceHolder={'johndoe@gmail.com'}
                    onChange={handleInputChange}
                    regexPattern={emailPattern2}
                    required
                />
                <AuthInput
                    inputType={'password'} 
                    inputLabel={'Password'} 
                    inputPlaceHolder={'********'}
                    onChange={handleInputChange}
                    minimumLength={8}
                    maximumLength={12}
                    required
                />
           </div>
            <div className="Login-Submit-Button-Frame">
                <CallToActionButton type={'submit'} buttonPlaceHolder={'Login'} className={'Login-Submit-Button'}/>
            </div>
        </form>
        <div className="Other-Login-Options">
           <div className="Option-Google">
                <button type="button">
                    <Icon icon={'flat-color-icons:google'} height={'30px'} width={'30px'} /> 
                    <p>Login With Google</p>
                </button>
            </div>
            <div className="Option-Facebook">
                <button type="button"><Icon icon="logos:facebook" height={'30px'} width={'30px'} />
                <p>Login With Facebook</p>
                </button>
            </div>
            <div className="Option-X">
                <button type="button">
                    <Icon icon={'devicon:twitter'} height={'25px'} width={'25px'}/>
                    <p>Login With X</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login