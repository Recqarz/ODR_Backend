

import express from 'express';
import {
    createQuery,
    getAllQueries,
    getQueryById,
    updateQuery,
    deleteQuery
} from './controller.js'; // Adjust the import based on your project structure

const router = express.Router();

// Route to create a new query
router.post('/', createQuery);
router.get('/', getAllQueries);
router.get('/:id', getQueryById);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQuery);

export default router;
