import  express  from 'express'
import {
    createConsultation,
    getConsultationById,
    getAllConsultation,
    updateConsultationById,
    
} from './controller.js'
const consultation = express.Router();

consultation.post("/", createConsultation)
consultation.get("/all",getAllConsultation)
consultation.get("/:id",getConsultationById)
consultation.put("/:id",updateConsultationById)


export default consultation