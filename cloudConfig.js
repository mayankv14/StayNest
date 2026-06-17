const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'StayNest',
    resource_type: "image",
    // allowedFormats: ["png", "jpg", "jpeg", "webp"],
  },
});

console.log("NAME =", process.env.CLOUD_NAME);
console.log("KEY =", process.env.CLOUD_API_KEY);
console.log("SECRET =", process.env.CLOUD_API_SECRET.length);
// console.log("SECRET =", process.env.CLOUD_API_SECRET);

module.exports = {
    cloudinary,
    storage,
};