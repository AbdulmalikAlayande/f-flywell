import React, {useState, useRef, useCallback, SyntheticEvent} from 'react'
import Webcam from 'react-webcam'
import "../../../../styles/components/users/profile/useCamera.css"
import {Icon} from "@iconify/react";
import ButtonWithIcon from "../../reusableComponents/buttonWithIcon";


const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
type UseCameraProps = {
    userEmail?:string
    postImage: ()=>any
}

const UseCamera = ({userEmail, postImage: method}: UseCameraProps) => {
    const imageRef = useRef<Webcam>(null)
    const [image, setImage] = useState<string>('')
    const [file, setFile] = useState<Blob>()

    const captureImage = useCallback(()=>{
        if(imageRef.current){
            const imageSource = imageRef.current.getScreenshot()
            if(imageSource) setImage(imageSource)
        }
    }, [imageRef])

    function handleImageLoad(event: SyntheticEvent<HTMLImageElement>){
        const eventTarget = event.target as HTMLImageElement;
        fetch(eventTarget.src)
            .then(response => response.blob())
            .then(blob => {
                console.log(blob); 
                setFile(blob)
                return new File([blob], 'email-Profile-Image');
            })
            .catch(error => {
                console.log(error.message); 
                return error.message
            })
    }

    function postToCloudinary(event: React.FormEvent<HTMLFormElement>) {
        const eventTarget = event.target as HTMLFormElement;
        const file = eventTarget;
    }

    return (
        <div className='Use-Camera-Main-Frame'>
            <form onSubmit={postToCloudinary} action="Use-Camera-Main-Form">
                {image!==''?(
                <div className={'Webcam-Image-After-Snap'}>
                    <img onLoad={handleImageLoad} src={image} alt={'Pic'}></img>
                    <button onClick={()=>setImage('')}>Recapture</button>
                </div>):(
                <div className='Webcam-Image-Before-Snap'>
                    <Webcam
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        audio={false}
                        height={250}
                        width={250}
                        ref={imageRef}
                    />
                    <ButtonWithIcon
                        onClick={(event)=>{event.preventDefault(); captureImage()}}
                        icon={'ph:camera-fill'} buttonPlaceHolder={'Capture'} iconHeight={'35px'} iconWidth={'8vw'}
                    />
                </div>
            )}
                <button id={'Camera-Image-Upload-Button'} disabled={image===''}>Upload Image</button>
            </form>
        </div>
    )
}
export default UseCamera