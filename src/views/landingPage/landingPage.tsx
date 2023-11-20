import React from 'react'
import NavBar from '../components/reusableComponents/navBar'
import Auth from "../components/auth/auth";
import "../../styles/components/landingPage/landingPage.css"
import CallToActionNavBar from '../components/reusableComponents/callToActionNavBar';

const LandingPage = () => {
    
  return (
    <div className='Main-Frame'>
      <NavBar/>
      <CallToActionNavBar/>
      <div className="Body">
            <div className="Welcome-Message-And-Value-Proposition-Frame">
              <h1>Welcome <span>To</span> <span>Bola Air</span></h1>
              <h3>
                With The Cheapest Flight<br/>You Can Easily Book Any Ticket You Need<br/>To Travel Safely,
                thanks to our detailed system of searching<br/>and booking airline tickets.
              </h3>
            </div>
            <div className="Auth-Frame">
              <Auth/>
            </div>
        </div>
      <div className="Footer-Frame">
        <div className="About-Us-Frame">
          <p>About Us</p>
          <p>
            Bola Air is the world's first inspirational travel search service<br />
            that focuses on what's really important: your Interests and your Budget!
          </p>
          <p>
            How practical is an amazing weekend break for skiing,<br />
            if what you really look forward is relaxing on a sandy beach?<br />
            How good a great destination can be, if it's too expensive to get there?<br />
            Bola Air offers an innovative and useful online experience,<br />
            so you can find your perfect destination in just a couple of clicks!
          </p>
        </div>
        <div className="News-Letter-Frame">
          <p>Enter Your Email To Subscribe To Our Weekly News Letter</p>
          <input type="email" placeholder='enter your email here'/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage