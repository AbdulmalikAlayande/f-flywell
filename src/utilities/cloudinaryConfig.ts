import {Cloudinary} from "@cloudinary/url-gen";
import ICloudConfig from "@cloudinary/url-gen/config/interfaces/Config/ICloudConfig";
import axios from "axios";

const cloudinaryConfig: ICloudConfig = {
  cloudName: process.env.CLOUDINARY_API_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.API_SECRET,
};

const cl = new Cloudinary({cloud:cloudinaryConfig});

async function uploadFile(fileUrl: string){
    let message = ''
    try {
        await axios.post('https://api.cloudinary.com/v1_1/demo/image/upload', fileUrl, {
            params: {
                public_id:"bola-air/users/media/",
                api_key: cloudinaryConfig.apiKey,
                api_secret: cloudinaryConfig.apiSecret,
                cloud_name:cloudinaryConfig.cloudName,
                secure:true,
                resource_type:"auto"
            }
        }).then((response) => {
            message = response.data
            console.log('Response data:', response.data);
            return response.data
        }).catch((error: Error)=>{
            message = error.message
            console.error('Error uploading file:', error);
            console.error('Error uploading file:', error.message);
            console.error('hi:');
            console.error('hi');
            return error.message
        })
        return message;
    }
    catch (error) {
        console.error('Error uploading file:', error);
        console.log('Error uploading file:');
        return error;
    }
}

export default uploadFile;