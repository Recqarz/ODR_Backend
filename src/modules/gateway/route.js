
import express from 'express'
import { creatOrder } from './controller.js'

const gatewayRoutes = express.Router()



gatewayRoutes.post('/order',creatOrder)

export default gatewayRoutes