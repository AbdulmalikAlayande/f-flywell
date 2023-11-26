import React, {useState, useRef, useCallback} from 'react'
import Webcam from 'react-webcam'
import "../../../../styles/components/users/profile/useCamera.css"
import {Icon} from "@iconify/react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";


const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}


const UseCamera = () => {
    const imageRef = useRef<Webcam>(null)
    const [image, setImage] = useState<string>('')

    const captureImage = useCallback(()=>{
        if(imageRef.current){
            const imageSource = imageRef.current.getScreenshot()
            if(imageSource) setImage(imageSource)
        }
    }, [imageRef])


    function postToCloudinary() {

    }

    return (
        <div className='Use-Camera-Main-Frame'>
            {image!==''?(
                <>
                    <img src={image} alt={'Pic'}></img>
                    <button onClick={()=>setImage('')}>Recapture</button>
                </>):(
                <div className='Webcam-Image-Before-Snap'>
                    <Webcam
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        audio={false}
                        height={200}
                        width={200}
                        ref={imageRef}
                    />
                    <ButtonWithIcon
                        onClick={(event)=>{event.preventDefault(); captureImage()}}
                        icon={'ph:camera-fill'} buttonPlaceHolder={'capture'} iconHeight={'40px'} iconWidth={'8vw'}
                    />
                </div>
            )}
            <button id={'Camera-Image-Upload-Button'} onClick={postToCloudinary}>Upload Image</button>
        </div>
    )
}
export default UseCamera