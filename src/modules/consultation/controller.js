


export const createConsultation = async (req, res) => {
    try {
        const { name, email, phone, state, city, pincode, description, category, proof, defaulter_name, defaulter_email, defaulter_phone } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !state || !city || !pincode || !description || !category || !proof || !defaulter_name || !defaulter_email || !defaulter_phone) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "All fields are required",
            }));
        }

        // Create new query
        const query = new Query({
            name,
            email,
            phone,
            state,
            city,
            pincode,
            description,
            category,
            proof,
            defaulter_name,
            defaulter_email,
            defaulter_phone,
        });

        // Save the query to the database
        await query.save();

        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "Query has been created successfully",
            data: query,
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
        const query = await Query.findById(req.params.id);

        if (!query) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Query not found",
            }));
        }

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Query retrieved successfully",
            data: query,
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

        // Fetch all queries with pagination
        const queries = await Query.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // Get total documents count
        const count = await Query.countDocuments();

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Queries retrieved successfully",
            data: {
                queries,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalQueries: count,
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

        // Find the query by ID and update it with the new data
        const query = await Query.findByIdAndUpdate(id, updateData, { new: true });

        if (!query) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Query not found",
            }));
        }

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Query updated successfully",
            data: query,
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