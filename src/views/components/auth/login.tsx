import React, { FormEvent } from 'react'
import AuthInput from '../reusableComponents/authInput'
import CallToActionButton from '../reusableComponents/callToActionButton'
import { Icon } from '@iconify/react'
import "../../../styles/components/auth/login.css"

const Login = () => {
    function handleInputChange(): void{
        
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        
    }

  return (
    <div className={'Login-Main-Frame'}>
        <form onSubmit={handleSubmit} className={'Login-Form'}>
            <AuthInput 
                inputType={''} 
                inputLabel={'Email'} 
                inputPlaceHolder={'johndoe@gmail.com'}
                onChange={handleInputChange}
            />
            <AuthInput
                inputType={''} 
                inputLabel={'Password'} 
                inputPlaceHolder={'********'}
                onChange={handleInputChange}
            />
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