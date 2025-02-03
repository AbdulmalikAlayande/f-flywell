import { Icon } from "@iconify-icon/react";
import ThemeToggle from "@src/utils/themeToggle";
import NotificationDropdown from "./notificationDropdown";
import ProfileDropdown from "./profileDropdown";

type NavbarProps = { 
    sidebarOpen: boolean,
    setSidebarOpen: (arg: boolean) => void
}
const DashboardNavBar = (props: NavbarProps) => {
  

    function openSidebar(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        props.setSidebarOpen(!props.sidebarOpen);
    };

    
    return (
      <nav className={"sticky top-0 z-999 flex items-center justify-between w-full pt-2"}>

            <div className={"flex w-full h-full items-center gap-4 px-6 py-3.5"}>
                <button
                    aria-controls="sidebar"
                    onClick={openSidebar}
                    className={"z-99999 block cursor-pointer rounded-sm border border-stroke shadow-sm lg:hidden"}
                >
                    <Icon icon={'radix-icons:hamburger-menu'}/>
                </button>
            </div>

            <div className="flex items-center gap-3 sm:gap-7">
                <ThemeToggle/>
                <NotificationDropdown />
                
                <ProfileDropdown />
            </div>
      </nav>
    );
};

export default DashboardNavBar;



