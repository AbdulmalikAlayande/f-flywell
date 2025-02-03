import { useCallback, useEffect, useState } from "react";
import {  AvailableFlight } from "../../../../interfaces/interface";
import { useParams } from "react-router";
import DashBoardSideBar from "@src/views/components/users/customer/dashboard/sidebar";
import Logger from "@src/utils/logger";
import DashboardNavBar from "@src/views/components/users/customer/dashboard/navbar";
import { Icon } from "@iconify-icon/react";

const Dashboard = () => {
    
    const param = useParams()
    const [availableFlights, setAvailableFlights] = useState<AvailableFlight[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const fetchAndGet = useCallback(() => {
        setAvailableFlights(availableFlights);
    }, [availableFlights]);
    useEffect(fetchAndGet, [fetchAndGet]);
    
    useEffect(() => {
        Logger.info("params: "+param.toString())  
    }, [param]);
    

    function openSidebar(arg: boolean): void {
        setSidebarOpen(arg);
    }

    return (
        <div className="flex w-full h-screen overflow-hidden items-center justify-between">
            {/*  */}
            <DashBoardSideBar userId={param.username} open={isSidebarOpen} setSidebarOpen={openSidebar}/>
            {/*  */}
            <main className={"flex flex-col w-screen min-h-screen lg:pr-6 lg:pl-6"}>
                {/*  */}
                <DashboardNavBar sidebarOpen={isSidebarOpen} setSidebarOpen={openSidebar}/>
                {/*  */}
                <section className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        
                        <div className="bg-white shadow rounded-lg p-4">
                            <div>
                                <Icon icon={''} />
                            </div>
                            <div> 
                                <h2 className="text-lg font-semibold mb-2">Total Reservations</h2>
                                <p></p>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <div>
                                <Icon icon={''} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Active Reservations</h2>
                                <p></p>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4">
                            <div>
                                <Icon icon={''} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Funds Spent</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
