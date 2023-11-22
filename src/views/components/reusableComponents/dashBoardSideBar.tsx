import React from 'react'
import CallToActionButton from './callToActionButton'
import "../../../styles/components/reusableComponents/dashboardSideBar.css"
import { Icon } from '@iconify/react'
import ButtonWithIcon from '../../../styles/components/reusableComponents/buttonWithIcon'

const DashBoardSideBar = () => {
    return (
        <div className='Dashbaord-Side-Bar-Main-Frame'>
            <div className="Logo-Frame">
                <img src="../../../assets/images/airplane.jpg" alt="logo" />
            </div>
            <div className="Middle-Part">
                <ButtonWithIcon icon={'pixelarticons:dashbaord'} buttonPlaceHolder={'Dashboard'} iconHeight={'25px'} iconWidth={'25px'}/>
                <ButtonWithIcon icon={'gg:profile'} buttonPlaceHolder={'Profile'} iconHeight={'25px'} iconWidth={'25px'}/>
                <ButtonWithIcon icon={'icon-park-outline:round-trip'} buttonPlaceHolder={'My Trips'} iconHeight={'25px'} iconWidth={'25px'}/>
                <ButtonWithIcon icon={'mdi:flight'} buttonPlaceHolder={'Flight'} iconHeight={'25px'} iconWidth={'25px'}/>
                <ButtonWithIcon icon={'game-icons:wavy-itinerary'} buttonPlaceHolder={'Create Itinerary'} iconHeight={'25px'} iconWidth={'25px'}/>
            </div>
            <div className="Foot">
                <ButtonWithIcon icon={'material-symbols:settings-outline'} buttonPlaceHolder={'Settings'} iconHeight={'25px'} iconWidth={'25px'}/>
                <ButtonWithIcon icon={'ic:round-logout'} className={'Log-Out-Button'}buttonPlaceHolder={'Log Out'} iconHeight={'25px'} iconWidth={'25px'}/>
            </div>
        </div>
    )
}
export default DashBoardSideBar