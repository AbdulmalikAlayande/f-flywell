import DashboardNavBar from '@src/views/components/users/customer/dashboard/navbar'
import { useEffect, useState } from 'react'
import DashBoardSideBar from '../sidebar'
import Logger from '@src/utils/logger'
import { useParams } from 'react-router'

const Reservations = () => {
    const param = useParams()
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        Logger.info("params: "+param.toString())  
    }, [param]);
    

    function openSidebar(arg: boolean): void {
        setSidebarOpen(arg);
    }

    return (
        <div>
            <DashBoardSideBar userId={param.userId} open={isSidebarOpen} setSidebarOpen={openSidebar}/>
            <main>
                <DashboardNavBar/>
                <section>
                    
                </section>
            </main>
        </div>
    )
}

export default Reservations