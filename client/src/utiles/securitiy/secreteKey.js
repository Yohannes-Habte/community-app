//=================================================================
// Cloudnary
//=================================================================
export const cloud_name = process.env.REACT_APP_CLOUD_NAME;
export const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
export const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//=================================================================
// The URL portion
//=================================================================
export const API = process.env.REACT_APP_BACKEND_URL;