import React, { FormEvent } from 'react'
import AuthInput from '../reusableComponents/authInput'
import { ToastContainer, toast } from 'react-toastify'
import CallToActionButton from '../reusableComponents/callToActionButton'
import { Icon } from '@iconify/react'

const SignUp = () => {

    function handleInputChange(): void {

    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {

    }

  return (
    <div>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
            <AuthInput inputType={'text'} inputPlaceHolder={'john'} inputLabel={'First Name'} onChange={handleInputChange}/>
            <AuthInput inputType={'text'} inputPlaceHolder={'doe'} inputLabel={'Last Name'} onChange={handleInputChange}/>
            <AuthInput inputType={'email'} inputPlaceHolder={'johndoe@gmail.com'} inputLabel={'Email'} onChange={handleInputChange}/>
            <AuthInput inputType={'password'} inputPlaceHolder={'********'} inputLabel={'Password'} onChange={handleInputChange}/>
            <AuthInput inputType={'tel'} inputPlaceHolder={'+2347036174617'} inputLabel={'Phone Number'} onChange={handleInputChange}/>
            <CallToActionButton type={'submit'} buttonPlaceHolder={'SignUp'}/>
        </form>
        <div className="Other-SignUp-Options">
           <div className="Option-Google">
                <Icon icon={'flat-color-icons:google'}/>
                <button type="button">SignUp With Google</button>
            </div>
            <div className="Option-Facebook">
                <Icon icon="logos:facebook" />
                <button type="button">SignUp With Facebook</button>
            </div>
            <div className="Option-X">
                <Icon icon={'devicon:twitter'}/>
                <button type="button">SignUp With Twitter</button>
            </div>
        </div>
    </div>
  )
}

export default SignUp