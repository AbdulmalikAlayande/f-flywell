import * as React from 'react';
import "../../../../styles/components/users/profile/useWeb.css"
import {useState} from "react";


export function UseWeb() {

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        let eventTarget = event.target as HTMLInputElement
        const value = eventTarget.value;
        setImageUrl(value);
    }

    function handleFormSubmission() {
        setImage(imageUrl)
    }

    function postToCloudinary() {

    }

    return (
        <div className={'UseWeb-Main-Frame'}>
            {image === ''? (<form className={'Use-Web-Form-Element'}>
                <input onChange={handleInputChange} type={'url'} placeholder={'Enter Image Web Address or Image Url'} required={true}/>
                <button type={"submit"} onClick={handleFormSubmission}>Search</button>
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