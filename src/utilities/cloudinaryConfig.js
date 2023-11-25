import cloudinary from "cloudinary-core";

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET,
};

const cl = new cloudinary.Cloudinary(cloudinaryConfig);
