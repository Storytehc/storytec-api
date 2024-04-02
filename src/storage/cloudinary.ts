import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const uploadFileToCloudinary = async (data_url: string) => {
  const uploadResponse = await cloudinary.uploader.upload(data_url);
  console.log('File uploaded successfully');
  saveSecureUrl(uploadResponse.secure_url);
  return uploadResponse;
};

const saveSecureUrl = (secureUrl: string) => {
  fs.appendFileSync('./secure_urls', `${secureUrl}\n`);
  console.log('URL successfully saved to ./secure_urls');
};
