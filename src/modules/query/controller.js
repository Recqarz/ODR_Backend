
import constant from '../../utilities/constant.js';
import { customResponse, customPagination } from "../../utilities/customResponse.js";
import { generateTicketEmailContent } from '../../utilities/templates.js';
import { sendMail } from '../../utilities/utils.js';
import Query from './model.js';



export const createQuery = async (req, res) => {
    try {
        const { name, email, phone, description, category } = req.body;
        if (!name || !email || !phone || !description ) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "Name, email, phone, description, and category are required",
            }));
        }

        const query = new Query({ name, email, phone, description, category });
        await query.save();
        sendMail(email, 'Query', generateTicketEmailContent(name, query.queryNumber, 'Areness'))

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


export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Queries fetched successfully",
            data: queries,
        }));
    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};

export const getQueryById = async (req, res) => {
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
            message: "Query fetched successfully",
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

export const updateQuery = async (req, res) => {
    try {
        const { name, email, phone, description, category } = req.body;
        if (!name || !email || !phone || !description || !category) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "Name, email, phone, description, and category are required",
            }));
        }

        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Query not found",
            }));
        }

        query.name = name;
        query.email = email;
        query.phone = phone;
        query.description = description;
        query.category = category;
        await query.save();

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Query has been updated successfully",
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

export const deleteQuery = async (req, res) => {
    try {
        const query = await Query.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "Query not found",
            }));
        }

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Query has been deleted successfully",
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

export default {
    createQuery,
    getAllQueries,
    getQueryById,
    updateQuery,
    deleteQuery
}
