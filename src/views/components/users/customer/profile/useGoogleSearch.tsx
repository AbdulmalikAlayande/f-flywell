// @flow
import * as React from 'react';
import {useEffect} from "react";
import '../../../../../styles/components/users/customer/profile/useGoogleSearch.css'

type UseGoogleSearchProps = {
    userEmail?:string
    postImage: ()=>any
}

export function UseGoogleSearch({postImage}: UseGoogleSearchProps) {

    const [image, setImage] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=85708e4873af04f21';
        script.async = true;
        document.body.appendChild(script);
        const div = document.createElement('div');
        div.className = "gcse-search";
        document.body.appendChild(div);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {

    }

    function handleFormSubmission(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {

    }

    function postToCloudinary(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {

    }

    return (
        <div className={'Use-Google-Search-Main-Frame'}>
            {image === ''? (<form className={'Google-Search-Form'}>
                <input onChange={handleInputChange} type={'text'} placeholder={'Search Image'} required={true}/>
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
};