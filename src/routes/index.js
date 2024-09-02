import express from 'express';

const router = express.Router();

import userRoutes from './../modules/user/route.js'
import queryRoutes from './../modules/query/route.js'
import consultation from '../modules/consultation/route.js';
import { isAuth } from '../middleware/auth.js';
import gatewayRoutes from '../modules/gateway/route.js';



//user
router.use('/user', userRoutes)
router.use('/query', queryRoutes)
router.use('/consultation', consultation)
router.use('/gateway',gatewayRoutes)

export default router

