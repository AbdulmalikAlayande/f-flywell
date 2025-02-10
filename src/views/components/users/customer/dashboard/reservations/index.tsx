import DashboardNavBar from '@src/views/components/users/customer/dashboard/navbar'
import { useEffect, useState } from 'react'
import DashBoardSideBar from '../sidebar'
import Logger from '@src/utils/logger'
import { NavLink, useParams } from 'react-router'

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
        <div className='flex w-full h-screen overflow-hidden items-center justify-between'>
            <DashBoardSideBar userId={param.userId} open={isSidebarOpen} setSidebarOpen={openSidebar}/>
            <main className='flex flex-col w-screen min-h-screen px-4 lg:px-6'>
                <DashboardNavBar sidebarOpen={false} setSidebarOpen={()=>{}}/>

                <section className="flex-1 overflow-y-auto mt-6 lg:mt-8">
                    <div className='h-10 w-full flex justify-end items-center'>
                        <NavLink 
                            to={'/reservations/new'} 
                            className={'bg-[#2563eb] h-full flex items-center p-2 rounded-lg'}
                        >
                            <span className='text-[#f3f4f6] dark:text-[#1f2937]'>Make a reservation</span>
                        </NavLink>
                    </div>
                    {/*  */}
                </section>
            </main>
        </div>
    )
}

export default Reservations