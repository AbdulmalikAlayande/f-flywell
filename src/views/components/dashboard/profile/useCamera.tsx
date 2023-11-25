import React, { useCallback, useState, useRef } from 'react'
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}


const UseCamera = () => {
    const [picture, setPicture] = useState<string>('');
    const webcamRef = useRef<Webcam>(null)

    const captureImage =  React.useCallback(() => {
        if(webcamRef.current){
            const pictureSrc = webcamRef.current.getScreenshot()
            if(pictureSrc){
                setPicture(pictureSrc)
                console.log("yes ==> ", pictureSrc)
            }
            console.log("no ", pictureSrc)
        }
        
    }, [])

    
    return (
        <div className='Use-Camera-Main-Frame'>
            <div className="image">
                <div>
                    {picture===''?<Webcam
                        audio={true}
                        height={400}
                        ref={webcamRef}
                        width={400}
                        screenshotFormat={undefined}
                        videoConstraints={videoConstraints}
                    />:<img src={picture}></img>
                    }
                </div>
                <div className="">
                    <button onClick={(event)=>{event.preventDefault(); captureImage()}}>Capture</button>
                </div>
            </div>)
        </div>
    )
}
export default UseCamera