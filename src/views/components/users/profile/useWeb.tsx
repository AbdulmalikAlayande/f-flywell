import * as React from 'react';
import "../../../../styles/components/users/profile/useWeb.css"
import {useState} from "react";


type UseWebProps = {
    userEmail?:string
    postImage: (file: string | File | Blob | null)=>any
}

export function UseWeb({userEmail, postImage}: UseWebProps) {

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState<File | Blob | null>(null)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        let eventTarget = event.target as HTMLInputElement
        const value = eventTarget.value;
        setImageUrl(value);
    }

    function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setImage(imageUrl)
        fetch(imageUrl)
            .then((response)=>response.blob())
            .then((blob) => {
                setFile(new File([blob], userEmail?userEmail:"user_profile_image"))
            })
            .catch((error) => error)
    }

    async function postToCloudinary(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        await postImage(file);
    }

    return (
        <div className={'UseWeb-Main-Frame'}>
            {image === ''? (<form onSubmit={handleFormSubmission} className={'Use-Web-Form-Element'}>
                <input onChange={handleInputChange} type={'url'} placeholder={'Enter Image Web Address or Image Url'} required={true}/>
                <button type={"submit"}>Search</button>
            </form>) : (
                <div className={'Web-Image-Frame'}>
                <img src={image} alt={'Profile Pic'}/>
                    <button onClick={()=> {
                        setImage('');
                        setImageUrl('')
                    }}>Change Image</button>
            </div>)}
            <button onClick={postToCloudinary}>Upload</button>
        </div>
    );
}