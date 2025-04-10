import ThemeToggle from "@utils/themeToggle"
import Logo from "@src/assets/icons/tsx/Logo"
import { useNavigate } from "react-router"

const NavBar = () => {

    const navigate = useNavigate();

    function navigateTo(route: string){
        navigate(route)
    }

    return (
        <header className={"fixed z-10 flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 bg-neutral-800"}>
            <nav className={"max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"}>
                
                {/* LOGO */}
                <a className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
                    <span className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white">
                        <Logo className={"w-10 h-auto"} />
                        <span>FlyWell</span>
                    </span>
                </a>
    
                {/* NAVIGATION */}
                <div className={"sm:order-3 flex items-center gap-x-2"}>
                    {/* MOBILE MENU BUTTON */}
                    <button type="button" className="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" id="hs-navbar-alignment-collapse" aria-expanded="false" aria-controls="hs-navbar-alignment" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-alignment">
                        <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/>
                        </svg>
                        <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                        <span className="sr-only">Toggle</span>
                    </button>
                    {/* LOGIN BUTTON */}
                    <button onClick={()=>navigateTo("/auth/login")} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 cursor-pointer">
                        Login
                    </button>
                    {/* THEME TOGGLE BUTTON */}
                    <ThemeToggle />
                </div>

                {/* NAV LINKS */}
                <div id={"hs-navbar-alignment"} className={"hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"} aria-labelledby="hs-navbar-alignment-collapse">
                    <div className={"flex flex-col gap-5 mt-5 text-[16px]/8 sm:flex-row sm:items-center sm:mt-0 sm:ps-5"}>
                        <a className={"font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-blue-500 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-blue-500"} href={"#"} aria-current="page">Home</a>
                        <a className={"font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-blue-500 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-blue-500"} href={"#search"}>Search</a>
                        <a className={"font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-blue-500 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-blue-500"} href={"#about"}>About</a>
                        <a className={"font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-blue-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-blue-500"} href={"#services"}>Services</a>
                        <a className={"font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-blue-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-blue-500"} href={"#contact us"}>Contact</a>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default NavBar