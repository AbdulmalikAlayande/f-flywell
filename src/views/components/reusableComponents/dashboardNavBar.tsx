import React from 'react'
import ButtonWithIcon from './buttonWithIcon'
import "../../../styles/components/reusableComponents/dashboardNavBar.css"

const DashboardNavBar = () => {
  return (
    <div className='Dashboard-NavBar-Main-Frame'>
      <div className="Dashboard-NavBar-Icons-Frame">
        <ButtonWithIcon icon={'iconamoon:notification'} iconHeight={'40px'} iconWidth={'40px'} buttonPlaceHolder={''} iconColor='black'/>
        <ButtonWithIcon icon={'iconamoon:email'} iconHeight={'40px'} iconWidth={'40px'} buttonPlaceHolder={''} iconColor='black'/>
        <ButtonWithIcon icon={'gg:profile'} iconHeight={'40px'} iconWidth={'40px'} buttonPlaceHolder={''} iconColor='black'/>
      </div>
    </div>
  )
}

export default DashboardNavBar