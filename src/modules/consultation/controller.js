import constant from "../../utilities/constant.js";
import { customResponse } from "../../utilities/customResponse.js";
import Cosultation from "./model.js";


export const createConsultation = async (req, res) => {
    try {
        const { name, email, phone, state, city, pincode, address ,description, category, proof, defaulter_name, defaulter_email, defaulter_phone } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !state || !city || !pincode || !address || !description || !category || !proof || !defaulter_name || !defaulter_email || !defaulter_phone) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "All fields are required",
            }));
        }

        // Create new query
        const cosultation = new Cosultation({
            name,
            email,
            phone,
            state,
            city,
            pincode,
            address,
            description,
            category,
            proof,
            defaulter_name,
            defaulter_email,
            defaulter_phone,
        });

        // Save the cosultation to the database
        await cosultation.save();

        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "cosultation has been created successfully",
            data: cosultation,
        }));
    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};


export const getConsultationById = async (req, res) => {
    try {
        const cosultation = await Cosultation.findById(req.params.id);

        if (!cosultation) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Consultation not found",
            }));
        }

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Consultation retrieved successfully",
            data: cosultation,
        }));
    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};


export const getAllConsultation = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Fetch all consultations with pagination
        const consultations = await Cosultation.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
            
        // Get total documents count
        const count = await Cosultation.countDocuments();

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Consultations retrieved successfully",
            data: {
                consultations,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalConsultations: count,
            },
        }));
    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};



export const updateConsultationById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the cosultation by ID and update it with the new data
        const cosultation = await Cosultation.findByIdAndUpdate(id, updateData, { new: true });

        if (!cosultation) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Consultation not found",
            }));
        }

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Consultation updated successfully",
            data: cosultation,
        }));
    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};


export default  {
    createConsultation,
    getConsultationById,
    getAllConsultation,
    updateConsultationById,
    
}