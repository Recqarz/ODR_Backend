import multer from 'multer'
import path from 'path'
import fs from 'fs'; 
import multerS3 from 'multer-s3'
import {s3} from './../config/aws.js'

const multerUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve('src/uploads');
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


// Multer S3 storage configuration
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'uploadsodr',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    // You can filter file types here
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images and PDFs are allowed!'));
    }
  },
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
});



export  {upload,uploadS3}


