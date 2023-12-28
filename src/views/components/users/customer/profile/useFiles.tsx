import * as React from 'react';
import "../../../../../styles/components/users/customer/profile/useFiles.css"
import {Icon} from "@iconify/react";
import {useState} from "react";

type UseFilesProps = {
    userEmail?:string
    postImage: (file: string | File)=>any
}
export function UseFiles({postImage}: UseFilesProps) {

    const [imageUrl, setImageUrl] = useState('')
    const [file, setFile] = useState<File | null>(null)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files) {
            const fileUrl = URL.createObjectURL(event.target.files[0])
            setImageUrl(fileUrl)
            setFile(event.target.files[0])
        }
    }

    function postToCloud(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if(file){
            let valueReturned = postImage(file)
            console.log('valueReturned ==> ',valueReturned);
            
        }
        else console.log("file was ==> ", file)
    }

    return (
        <div className={'UseFiles-Main-Frame'}>
            <form onSubmit={postToCloud} className={'Profile-Form-Element'}>
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