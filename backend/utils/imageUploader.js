//const cloudinary = require('cloudinary')
const cloudinary = require("cloudinary").v2;

require('dotenv').config();

exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    //options.timeout = 60000;
    options.resource_type = "auto";
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,options);
    return result
    }
    catch(err){
        console.log(err);
    }
}