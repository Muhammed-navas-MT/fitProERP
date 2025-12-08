import { v2 as cloudinary } from "cloudinary";
import { configEnv } from "./envConfig";

cloudinary.config({
  cloud_name:configEnv.CLOUDINARY_CLOUD_NAME,
  api_key: configEnv.CLOUDINARY_API_KEY,
  api_secret:configEnv.CLOUDINARY_API_SECRET,
});

export default cloudinary;
