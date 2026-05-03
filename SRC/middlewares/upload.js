
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const CloudinaryStorage  = require("multer-storage-cloudinary").CloudinaryStorage;
const storage = new CloudinaryStorage({
    cloudinary,params: {folder:"uploads", allowed_formats: ["jpg", "jpeg", "png"],}
})
const upload = multer({ storage,limits: { fileSize: 3 * 1024 * 1024 } });

module.exports = upload
