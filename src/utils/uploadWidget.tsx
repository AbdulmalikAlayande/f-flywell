import { useEffect, useRef } from "react";

interface CloudinaryUploadWidget {
  open: () => void;
}

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
  };
}

interface Cloudinary {
  createUploadWidget: (options: {
    cloudName: string;
    uploadPreset: string;
  }, 
  callback: (error: Error | null, result: CloudinaryResult) => void) => CloudinaryUploadWidget;
}

declare global {
  interface Window {
    cloudinary: Cloudinary;
  }
}

function UploadWidget() {
  const cloudinaryRef = useRef<Cloudinary | null>(null);
  const widgetRef = useRef<CloudinaryUploadWidget | null>(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);

    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: process.env.CLOUDINARY_API_NAME ? process.env.CLOUDINARY_API_NAME : '',
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET ? process.env.CLOUDINARY_UPLOAD_PRESET : ''
    },

    function (error: Error | null, result: CloudinaryResult) {
      if (!error && result && result.event === 'success') {
        return result.info.secure_url;
      }
      if(error) alert("error "+error)
    })
    console.log(widgetRef);
  }, []);

  return (
    <button onClick={() => widgetRef.current?.open()}>
      Upload
    </button>
  )
}
export default UploadWidget;