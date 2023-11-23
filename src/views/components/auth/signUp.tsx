import React, { FormEvent } from 'react'
import AuthInput from '../reusableComponents/authInput'
import CallToActionButton from '../reusableComponents/callToActionButton'
import { Icon } from '@iconify/react'
import "../../../styles/components/auth/signUp.css"

const SignUp = () => {

    function handleInputChange(): void {

    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {

    }

  return (
    <div className={"SignUp-Main-Frame"}>
        <form onSubmit={handleSubmit} method='post' action='http://localhost:8000/sign-up' className={'SignUp-Form'}>
            <div className='SignUp-Form-Inputs-Frame'>
                <AuthInput inputType={'text'} inputPlaceHolder={'john'} inputLabel={'First Name'} onChange={handleInputChange} required/>
                <AuthInput inputType={'text'} inputPlaceHolder={'doe'} inputLabel={'Last Name'} onChange={handleInputChange} required/>
                <AuthInput inputType={'email'} inputPlaceHolder={'johndoe@gmail.com'} inputLabel={'Email'} onChange={handleInputChange} required/>
                <AuthInput inputType={'password'} inputPlaceHolder={'********'} inputLabel={'Password'} onChange={handleInputChange} required/>
                <AuthInput inputType={'tel'} inputPlaceHolder={'+2347036174617'} inputLabel={'Phone Number'} onChange={handleInputChange} required/>
            </div>
            <div className={'SignUp-Submit-Button-Frame'}>
                <CallToActionButton type={'submit'} buttonPlaceHolder={'SignUp'} className={"SignUp-Submit-Button"}/>
            </div>
        </form>
        <div className="Other-SignUp-Options">
           <div className="Option-Google">
               <button type="button">
                   <Icon icon={'flat-color-icons:google'} height={'25px'} width={'25px'}/>
                   <p>SignUp With Google</p>
               </button>
            </div>
            <div className="Option-Facebook">
                <button type="button"><Icon icon="logos:facebook" height={'30px'} width={'30px'} />
                    <p>SignUp With Facebook</p>
                </button>
            </div>
            <div className="Option-X">
                <button type="button">
                    <Icon icon={'devicon:twitter'} height={'25px'} width={'25px'} />
                    <p>SignUp With Facebook</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default SignUp