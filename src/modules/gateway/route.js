
import express from 'express'
import { createOrder, orderDetails } from './controller.js'

const gatewayRoutes = express.Router()



gatewayRoutes.post('/order',createOrder)
gatewayRoutes.get('/detail',orderDetails)
gatewayRoutes.post('/detail',orderDetails)



export default gatewayRoutes