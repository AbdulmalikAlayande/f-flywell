import * as React from 'react';
import {useState} from "react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";
import UseCamera from "./useCamera";
import UseVideo from "./useVideo";
import {UseFiles} from "./useFiles";
import {UseWeb} from "./useWeb";
import "../../../../styles/components/users/profile/editProfile.css"
import { UseGoogleSearch } from './useGoogleSearch';


const choiceField= {
    FILES: "files",
    WEB_ADDRESS: "web address",
    CAMERA: "camera",
    VIDEO: "video",
    GOOGLE_IMAGE_SEARCH: "image search"
}

function EditProfilePicture() {
    const [choice, setChoice] = useState<string>(choiceField.FILES)

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        let eventTarget = event.target as HTMLButtonElement;
        setChoice(eventTarget.value)
    }

    return (
        <div className={'Edit-Profile-Main-Frame'}>
            <div className={'Edit-Choices-Button-Frame'}>
                <ButtonWithIcon className={choice === 'files'?'Current-Button':'Files-Button'} onClick={handleClick} value={'files'} icon={'tabler:files'} buttonPlaceHolder={'Files'} iconHeight={'50px'} iconWidth={'50px'}/>
                <ButtonWithIcon className={choice === 'web address'?'Current-Button':'Web-Address-Button'} onClick={handleClick} value={'web address'} icon={'mdi:web'} buttonPlaceHolder={'Web Address'} iconHeight={'50px'} iconWidth={'50px'}/>
                <ButtonWithIcon className={choice === 'camera'?'Current-Button':'Camera-Button'} onClick={handleClick} value={'camera'} icon={'mdi:camera'} buttonPlaceHolder={'Camera'} iconHeight={'50px'} iconWidth={'50px'}/>
                <ButtonWithIcon className={choice === 'video'?'Current-Button':'Video-Button'} onClick={handleClick} value={'video'} icon={'bxs:video'} buttonPlaceHolder={'Video'} iconHeight={'50px'} iconWidth={'50px'}/>
                <ButtonWithIcon className={choice === 'image search'?'Current-Button':'Image-Search-Button'} onClick={handleClick} value={'image search'} icon={'flat-color-icons:google'} buttonPlaceHolder={'Image Search'} iconHeight={'50px'} iconWidth={'50px'}/>
            </div>
            <div className={'Edit-Choices-Frame'}>
                {choice === choiceField.CAMERA && <UseCamera/>}
                {choice === choiceField.VIDEO && <UseVideo/>}
                {choice === choiceField.WEB_ADDRESS && <UseWeb/>}
                {choice === choiceField.FILES && <UseFiles/>}
                {choice === choiceField.GOOGLE_IMAGE_SEARCH && <UseGoogleSearch/>}
            </div>
        </div>
    );
}

export default EditProfilePicture;