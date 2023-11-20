import React from 'react'
import {Icon} from "@iconify/react"
import "../../../styles/components/reusableComponents/navBar.css"

const NavBar = () => {


  return (
    <div className='Main-Div'>
        <div className="Navbar">
          <div className='Location-And-Contact-Info-Navbar'>
            <div className="Location-And-Contact-Info-Navbar-Child-Frame-1">
              <div className="Location-Frame">
                <Icon id={'Location-Icon'} icon={'mdi:map-marker-outline'} height={'35px'} width={'35px'} />
                <a href='' id={'Location-Icon-Label'}>27B, Fatai Atere Way, Matori, Mushin, Lagos</a>
              </div>
              <div className="Call-Frame">
                <Icon id={'Call-Icon'} icon={'mdi:phone'} height={'35px'} width={'35px'} />
                <a href={'https://web.whatsapp.com/'} id={'Call-Icon-Label'}>+2347036174617</a>
              </div>
              <div className="Email-Frame">
                <Icon id={'Email-Icon'} icon={'line-md:email-opened'} height={'35px'} width={'35px'} />
                <a id={'Email-Icon-Label'} href='https://mail.google.com/mail/u/0/#all?compose=new'>alaabdulmalik03@gmail.com</a>
              </div>
            </div>
            <div className="Location-And-Contact-Info-Navbar-Child-Frame-2">
              <a href="https://web.facebook.com/abdulmalik.alayande.39/"><Icon id={'Facebook-Icon'} icon={'circum:facebook'} height={'35px'} width={'35px'} color='black' /></a>
              <a href="https://www.instagram.com/blaq_mhee/"><Icon id={'Instagram-Icon'} icon={'fa-brands:instagram'} height={'35px'} width={'35px'} color='black' /></a>
              <a href="https://twitter.com/The_good_man02"><Icon id={'Twitter-Icon'} icon={'fa6-brands:x-twitter'} height={'35px'} width={'35px'} color='black' /></a>
              <a href="https://www.linkedin.com/in/abdulmalik-alayande-b49814250/"><Icon id={'Linkedin-Icon'} icon={'mingcute:linkedin-line'} height={'35px'} width={'35px'} color='black' /></a>
            </div>
          </div>
        </div>
    </div>

  )
}

export default NavBar