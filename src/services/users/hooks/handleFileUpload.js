const multer = require('multer')
const sharp = require('sharp')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = function ()
{
    return async context =>
    {
        if (context.params.file)
        {
            const uploadedFiles = context.params.file;
            const buffer = await sharp(uploadedFiles.buffer).resize({ width: 250, height: 250 }).toBuffer()
            context.data.profileImage = {
                imageBuffer: buffer,
                fileName: uploadedFiles.originalname + "-" + Date.now(),
                type: uploadedFiles.mimetype,
            }
        }
    }
}