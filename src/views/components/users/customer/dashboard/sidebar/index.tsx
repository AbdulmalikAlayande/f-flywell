import { useRef } from "react";
// import ButtonWithIcon from "./buttonWithIcon";
import Logo from "@assets/images/tsx/Logo";
import { NavLink, useLocation } from "react-router";
import { IoMdClose } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { Icon } from "@iconify-icon/react";


type SidebarProps = {
    userId: string | undefined;
    open: boolean;
    setSidebarOpen: (arg: boolean) => void;
    buttonData?:{
        btnLabel: string,
        btnIcon: string,
        btnUrl: string,
        value: string
    }[]
}

const  DashBoardSideBar = (props: SidebarProps) => {
    
    const location = useLocation();
    const { pathname } = location;

    const sideBar = useRef<HTMLDivElement | null>(null); 
    const trigger = useRef<HTMLButtonElement | null>(null);


    return (
        <aside 
            ref={sideBar}
            role={"complementary"} 
            className={`
                absolute left-0 border-2 top-0 z-9999 flex flex-col h-screen w-60.5 overflow-y-hidden rounded-r-xl
                bg-[#111827] dark:bg-[#f9fafb] duration-300 ease-linear lg:static lg:translate-x-0 ${props.open? "translate-x-0" : "-translate-x-full"}
            `}
        >
            {/* Sidebar Header */}
            <div className={"w-ful flex items-center justify-between lg:justify-center lg:pt-4"}>
                <NavLink className={"cursor-pointer"} to={"/"}>
                    <Logo className={"h-15 w-15"} />
                </NavLink>

                <button
                    ref={trigger}
                    aria-controls={"sidebar"}
                    aria-expanded={props.open}
                    className={"block lg:hidden"}
                    onClick={() => props.setSidebarOpen(!props.open)}
                >
                    <IoMdClose />
                </button>
            </div>

            {/* Sidebar Body-[Sidebar Menu] */}
            <nav id={"sidebar"} className={"flex flex-col gap-4 px-6 py-5.5 lg:py-6.5"}>
                <ul>
                    <li key={'dashboard'}>
                        <NavLink 
                            to={`/${props.userId}/dashboard`}
                            className={`
                                group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                                ${pathname.includes('dashboard') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                            `}
                        >
                            <RiDashboardFill size={'25px'}/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li key={'profile'}>
                        <NavLink 
                            to={`/${props.userId}/profile`}
                            className={`
                                group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                                ${pathname.includes('profile') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                            `}
                        >
                            <Icon icon={'carbon:user-avatar-filled-alt'} height={"25px"} width={"25px"}/>
                            <span>Profile</span>
                        </NavLink>
                    </li>
                    <li key={'reservations'}>
                        <NavLink 
                            to={`/${props.userId}/reservations`}
                            className={`
                                group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                                ${pathname.includes('reservations') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                            `}
                        >
                            <Icon icon={'carbon:flight-schedule'} height={"25px"} width={"25px"}/>
                            <span>Reservations</span>
                        </NavLink>
                    </li>
                    <li key={'activities'}>
                        <NavLink 
                            to={`/${props.userId}/activities`}
                            className={`
                                group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                                ${pathname.includes('activities') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                            `}
                        >
                            <Icon icon={"mdi:history"} height={"25px"} width={"25px"} />
                            <span>Activities</span>
                        </NavLink>
                    </li>
                </ul>

                {/* Sidebar Footer */}
                <ul>
                    <NavLink
                        to={'/settings'}
                        className={`
                            group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                            ${pathname.includes('settings') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                        `}
                    >
                        <Icon icon={"material-symbols:settings-outline"} height={"25px"} width={"25px"}/>
                        <span>Settings</span>
                    </NavLink>

                    <NavLink
                        to={'/logout'}
                        className={`
                            group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out 
                            ${pathname.includes('logout') ? 'bg-[#f9fafb] dark:bg-[#111827] text-[#111827] dark:text-[#f9fafb]' : 'text-[#f9fafb] dark:text-[#111827]'}
                        `}
                    >
                        <Icon icon={"ic:round-logout"} height={"25px"} width={"25px"}/>
                        <span>Logout</span>
                    </NavLink>
                </ul>
            </nav>
        </aside>
    );
};
export default DashBoardSideBar;
