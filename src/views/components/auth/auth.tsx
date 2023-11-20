import React, { useState } from 'react'
import SignUp from './signUp'
import Login from './login'
import CallToActionButton from '../reusableComponents/callToActionButton'
import "../../../styles/components/auth/auth.css"


const Auth = () => {
  
  const [isLogin, setLogin] = useState(true)

  function renderCurrentState(event: React.MouseEvent<HTMLButtonElement>): void{
    event.preventDefault()
    const target = event.target as HTMLButtonElement
    target.value === "false" ? setLogin(false) : setLogin(true)
  }

  return (
    <div className='Auth-Main-Frame'>
        <div className="Auth-Action-Buttons-Frame">
          <CallToActionButton value={true} buttonPlaceHolder={'Login'} className={'Auth-Control_Button'} onClick={renderCurrentState}/>
          <CallToActionButton value={false} buttonPlaceHolder={'SignUp'} className={'Auth-Control_Button'} onClick={renderCurrentState}/>
        </div>
        <div className="Login-And-SignUp-Frame">
          {isLogin ? <Login/> : <SignUp/>}
        </div>
    </div>
  )
}

export default Auth