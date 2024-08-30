import  express  from 'express'
import {
    createConsultation,
    getConsultationById,
    getAllConsultation,
    updateConsultationById,
    
} from './controller.js'
const consultation = express.Router();

consultation.post("/", createConsultation)
consultation.get("/:id",getConsultationById)
consultation.get("/all",getAllConsultation)
consultation.put("/",updateConsultationById)


export default consultation