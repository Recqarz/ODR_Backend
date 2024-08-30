import multer from 'multer'
import path from 'path'
import fs from 'fs'; 

const multerUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve('src/modules/operation/notice/uploads');
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath);
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        // Generate a new filename
        const newFilename = file.originalname;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: multerUpload });

export default upload
