import  express  from 'express'
import {
    createConsultation,
    getConsultationById,
    getAllConsultation,
    updateConsultationById,
    
} from './controller.js'

import {upload, uploadS3} from '../../middleware/upload.js';

const consultation = express.Router();

consultation.post("/",uploadS3.single('proof'), createConsultation)
consultation.get("/all",getAllConsultation)
consultation.get("/:id",getConsultationById)
consultation.put("/:id",updateConsultationById)


export default consultation