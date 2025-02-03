import { useState } from "react";
import OutsideClickHandler from "../outsideClickHandler";
import { Icon } from "@iconify-icon/react";

const ProfileDropdown = () => {
  
    const [displayed, setDisplayed] = useState<boolean>(false);
    
    function handleVisibleChange(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.stopPropagation();
        setDisplayed(!displayed);
    }

    return (
        <OutsideClickHandler onClick={() => setDisplayed(false)} className={'relative'}>
            
            <div className="relative inline-block">
                <button
                    className="flex items-center p-2 bg-gray-800 text-white rounded-full focus:outline-none"
                    onClick={handleVisibleChange}
                >
                    <Icon icon={"carbon:user-avatar-filled-alt"} height={"25px"} width={"25px"}/>
                </button>
            </div>

        </OutsideClickHandler>
    )
}

export default ProfileDropdown