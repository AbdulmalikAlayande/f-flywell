import * as React from 'react';
import "../../../../styles/components/users/profile/useFiles.css"
import {Icon} from "@iconify/react";
import {useState} from "react";

type UseFilesProps = {
    userEmail?:string
    postImage: (file: string | File)=>any
}
export function UseFiles({postImage}: UseFilesProps) {

    const [imageUrl, setImageUrl] = useState('')

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("api name ==> ", process.env.REACT_APP_CLOUDINARY_API_NAME)
        console.log("upload preset ==> ", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        console.log("api secret ==> ", process.env.REACT_APP_CLOUDINARY_API_SECRET)
        console.log("api key ==> ", process.env.REACT_APP_CLOUDINARY_API_KEY)
        console.log("avaiation stack access key ==> ", process.env.REACT_APP_AVIATION_STACK_ACCESS_KEY)
        console.log("pexels api key ==> ", process.env.REACT_APP_PEXELS_API)

        if (event.target.files) {
            const fileUrl = URL.createObjectURL(event.target.files[0])
            setImageUrl(fileUrl)
            postImage(fileUrl)
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