import React from 'react'
import {Icon} from "@iconify/react"
import "../../../views/components/reusableComponents/navBar"
import CallToActionButton from './callToActionButton'

const NavBar = () => {
  return (
    <div className='Main-Div'>
        <div className="Navbar">
          <div className='Location-And-Contact-Info-Navbar'>
            <Icon id={'Location-Icon'} icon={'mdi:map-marker-outline'}/>
            <label htmlFor={'Locatio-Icon'}>Location</label>

            <Icon id={'Call-Icon'} icon={'mdi:phone'}/>
            <label htmlFor={'Call-Icon'}>Contact-Us</label>

            <Icon id={'Email-Icon'} icon={'line-md:email-opened'}/>
            <label htmlFor={'Email-Icon'}>Email</label>
          </div>
          <div className='Call-To-Action-Navbar'>
            <Icon icon={'noto:airplane'}/>
            <label>Bola-Air</label>
            <CallToActionButton buttonPlaceHolder={'Home'}/>
            <CallToActionButton buttonPlaceHolder={'About'}/>
            <CallToActionButton buttonPlaceHolder={'Socials'}/>
          </div>
        </div>
    </div>

  )
}

export default NavBar