import * as React from 'react';
import "../../../../styles/components/users/profile/useFiles.css"
import {Icon} from "@iconify/react";
import {useState} from "react";

export function UseFiles() {

    const [imageUrl, setImageUrl] = useState('')

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const fileUrl = URL.createObjectURL(event.target.files[0])
            setImageUrl(fileUrl)
        }

    }

    return (
        <div className={'UseFiles-Main-Frame'}>
            <form className={'Profile-Form-Element'}>
                {imageUrl === '' ? (<>
                    <div className={'Draggable-Frame'}>
                        <Icon icon={'ep:upload-filled'} height={'35vh'} width={'35vw'} color={'gray'}/>
                        <label>Drag and Drop your Image Here</label>
                    </div>
                    <p>Or</p>
                </>): (<img src={imageUrl} alt={'Profile Pic'}/>)}
                <div className={'Icon-Input-Frame'}>
                    <input onChange={handleInputChange} type={'file'} accept={'.png, .jpg, .jpeg, .svg'} placeholder={'Drag and Drop your Image Here'}/>
                    <button type={'submit'}>Upload</button>
                </div>
            </form>
        </div>
    );
}