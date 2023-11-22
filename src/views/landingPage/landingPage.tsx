import React from 'react'
import NavBar from '../components/reusableComponents/navBar'
import Auth from "../components/auth/auth";
import "../../styles/components/landingPage/landingPage.css"
import CallToActionNavBar from '../components/reusableComponents/callToActionNavBar';
import AuthInput from '../components/reusableComponents/authInput';
// import {useNavigate, useParams } from 'react-router'
import CallToActionButton from '../components/reusableComponents/callToActionButton';

const LandingPage = () => {

  
    
  return (
    <div className='Main-Frame'>
      <NavBar/>
      <CallToActionNavBar/>
      <div className="Body">
            <div className="Welcome-Message-And-Value-Proposition-Frame">
              <p className='Welcome-PTag'>Welcome To Bola Air, The Sky is Waiting for You</p>
              <p className='Value-Proposition-Ptag'>
                With The Cheapest Flight<br/>You Can Easily Book Any Ticket You Need<br/>To Travel Safely,
                thanks to our detailed system of searching<br/>and booking airline tickets.
              </p>
              <button className="Go-To-Facebook">Learn More</button>
            </div>
            <div className="Auth-Frame">
              <Auth/>
            </div>
        </div>
      <div className="Footer-Frame">
        <div className="About-Us-Frame">
          <p className='About-Us-Ptag-One'>About Us</p>
          <p className='About-Us-Ptag-Two'>
            Bola Air is the world's first inspirational travel search service<br />
            that focuses on what's really important: your Interests and your Budget!
          </p>
          <p className='About-Us-Ptag-Three'>
            How practical is an amazing weekend break for skiing,<br />
            if what you really look forward is relaxing on a sandy beach?<br />
            How good a great destination can be, if it's too expensive to get there?<br />
            Bola Air offers an innovative and useful online experience,<br />
            so you can find your perfect destination in just a couple of clicks!
          </p>
        </div>
        <div className="News-Letter-Frame">
          <p className="News-Letter">News Letter</p>
          <p className='News-Letter-Prompt'>Enter Your Email To Subscribe To Our Weekly News Letter</p>
          <form method="post" action="http://localhost:8080/subscribe-to-news-letter" className='News-Letter-Frame-Form'>
            <AuthInput inputType="email" inputPlaceHolder='enter your email here' required />
            <CallToActionButton type="submit" buttonPlaceHolder={'Subscribe'} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default LandingPage