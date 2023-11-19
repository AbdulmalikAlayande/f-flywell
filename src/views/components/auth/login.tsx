import React, { FormEvent } from 'react'
import AuthInput from '../reusableComponents/authInput'
import { toast, ToastContainer } from 'react-toastify'
import CallToActionButton from '../reusableComponents/callToActionButton'

const Login = () => {
    function handleInputChange(): void{
        
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        
    }

  return (
    <div>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
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
            <CallToActionButton type={'submit'} buttonPlaceHolder={'Login'}/>
        </form>
    </div>
  )
}

export default Login