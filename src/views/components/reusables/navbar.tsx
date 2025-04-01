import Logo from '@/assets/icons/tsx/Logo'
import { Label } from '@/components/ui/label'
import ThemeToggle from '@src/utils/themeToggle'
import { NavLink } from 'react-router';
import { userDetailsStore } from '@src/store/userDetailsStore';


const Navbar = () => {
    const userId = userDetailsStore.getState().publicId;
    
    return (
        <nav className={"w-full h-15 flex items-center border rounded-t-lg justify-between px-2 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"}>
            <div className={"w-1/3 h-full flex items-center justify-center cursor-pointer"}>
                <NavLink to={"/"} className={"w-full h-full bg-inherit flex items-center space-x-2"}>
                    <Label className={'text-lg '}>FlyWell</Label>
                    <Logo className={"w-12 h-12 text-blue-500 dark:text-blue-400"} />
                </NavLink>
            </div>
            <div className={"w-2/3 h-full hidden md:flex justify-center items-center space-x-6 md:space-x-8"}>
                <NavLink to={`/${userId}/dashboard`} className={"text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"}>
                    Dashboard
                </NavLink>
                <NavLink to={`/deals`} className={"text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"}>
                    Deals
                </NavLink>
                <NavLink to={`${userId}/schedules`} className={"text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"}>
                    Schedules
                </NavLink>
                <NavLink to={`/about`} className={"text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"}>
                    About
                </NavLink>
            </div>
            <div className={"w-1/3 h-full flex items-center justify-end"}>
                <ThemeToggle />
            </div>
        </nav>
    )
}

export default Navbar