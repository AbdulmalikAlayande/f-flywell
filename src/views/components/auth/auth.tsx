import React from 'react'
import SignUp from './signUp'
import Login from './login'
import CallToActionButton from '../reusableComponents/callToActionButton'

const Auth = () => {
  return (
    <div>
        <CallToActionButton buttonPlaceHolder={'Login'}/>
        <CallToActionButton buttonPlaceHolder={'SignUp'}/>
        <Login/>
        <SignUp/>
    </div>
  )
}

export default Auth