import React from "react";
import {useEffect, useRef} from "react";

declare global {
    interface Window {
      cloudinary: any; // Replace 'any' with the appropriate type if known
    }
  }
  

function UploadWidget() {
    const cloudinaryRef = useRef<any>()
    const widgetRef = useRef<any>()
    useEffect(()=>{
        
        cloudinaryRef.current = window.cloudinary
        console.log(cloudinaryRef.current)
        
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.CLOUDINARY_API_NAME,
            uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        },  
        function (error: any, result: { event: string; info: { secure_url: any; }; }) {
            if (!error && result && result.event === 'success') {
                return result.info.secure_url;
            }
            if(error) alert("error "+error)
        })
        console.log(widgetRef)
    }, [])

    return (
        <button onClick={() =>widgetRef.current.open()}>
            Upload
        </button>
    )
}
export default UploadWidget