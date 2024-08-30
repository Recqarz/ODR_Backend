import express from 'express';

const router = express.Router();

import userRoutes from './../modules/user/route.js'
import { isAuth } from '../middleware/auth.js';



//user
router.use('/user', userRoutes)
export default router

