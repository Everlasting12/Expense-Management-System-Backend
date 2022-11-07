const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = function ()
{
    return async context =>
    {
        if (context.params.file)
        {
            const uploadedFiles = context.params.file;
            context.data.profileImage = {
                imageBuffer: uploadedFiles.buffer,
                fileName: uploadedFiles.originalname + "-" + Date.now(),
                type: uploadedFiles.mimetype,
            }
        }
    }
}