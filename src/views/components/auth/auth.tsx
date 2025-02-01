import React, { useState } from 'react'
import SignUp from './signUp'
import Login from './login'
import CallToActionButton from '../reusables/callToActionButton'


const Auth = () => {
  
  const [isLogin, setLogin] = useState(true)

  function renderCurrentState(event: React.MouseEvent<HTMLButtonElement>): void{
    event.preventDefault()
    const target = event.target as HTMLButtonElement
    if(target.value === "false") 
      setLogin(false) 
    else setLogin(true)
  }

  return (
    <div className='Auth-Main-Frame'>
        <div className={"Auth-Action-Buttons-Frame"}>
          <CallToActionButton value={"true"} buttonPlaceHolder={'Login'} className={isLogin?'Auth-Control_Button-Login':'Auth-Control-Button'} onClick={renderCurrentState}/>
          <CallToActionButton value={"false"} buttonPlaceHolder={'SignUp'} className={!isLogin?'Auth-Control_Button-SignUp':'Auth-Control-Button'} onClick={renderCurrentState}/>
        </div>
        <div className={isLogin?"Login-Frame": "SignUp-Frame"}>
          {isLogin ? <Login/> : <SignUp/>}
        </div>
    </div>
  )
}

export default Auth