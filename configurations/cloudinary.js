const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary") 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats : ['png','jpg','jpeg'],
    params:{
        folder:"BlogAppUsers",
    }

})


const upload = multer({storage});

module.exports = {
    storage,
    upload,
}