const { v2: cloudinary } = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (imagePath) => {
    try {
        const res = await cloudinary.uploader.upload(imagePath);
        if (!res) {
            throw "failed";
        }
        const url = cloudinary.url(res.public_id, {
            transformation: [
                {
                    quality: 'auto',
                    fetch_format: 'auto'
                }
            ]
        })
        console.log(url);
        return url;
    } catch (err) {
        console.log(err);
        return null;
    }

}

exports.uploadToCloudinary = uploadToCloudinary;