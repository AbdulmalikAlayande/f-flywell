import * as React from 'react';
import {useState} from "react";
import UseCamera from "../../../../../hooks/useCamera";
import UseVideo from "../../../../../hooks/useVideo";
import {UseFiles} from "../../../../../hooks/useFiles";
import {UseWeb} from "../../../../../hooks/useWeb";
import { UseGoogleSearch } from '../../../../../hooks/useGoogleSearch';
import ButtonWithIcon from '@src/views/components/reusables/buttonWithIcon';


const choiceField= {
    FILES: "files",
    WEB_ADDRESS: "web address",
    CAMERA: "camera",
    VIDEO: "video",
    GOOGLE_IMAGE_SEARCH: "image search"
}

type EditProfilePictureProp = {
    method: ()=>unknown
}
function EditProfilePicture({method}: EditProfilePictureProp) {
    const [choice, setChoice] = useState<string>(choiceField.FILES)

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const eventTarget = event.target as HTMLButtonElement;
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
                {choice === choiceField.CAMERA && <UseCamera postImage={method}/>}
                {choice === choiceField.VIDEO && <UseVideo postImage={method}/>}
                {choice === choiceField.WEB_ADDRESS && <UseWeb postImage={method}/>}
                {choice === choiceField.FILES && <UseFiles postImage={method}/>}
                {choice === choiceField.GOOGLE_IMAGE_SEARCH && <UseGoogleSearch postImage={method}/>}
            </div>
        </div>
    );
}

export default EditProfilePicture;