
import jwt from 'jsonwebtoken';
import constant from '../utilities/constant.js';
import { customResponse } from '../utilities/customResponse.js';
import User from '../modules/user/model.js';

export const isAuth = async function(req, res, next){
    const accessToken = req?.headers?.authorization
    if (!accessToken){
        return res.status(constant.HTTP_401_CODE).send(customResponse({
            code:constant.HTTP_401_CODE,
            message:constant.ACCESS_TOKEN_MISSING
        }))

    }
    const token = accessToken.split(" ")[1]
    const jwtSecret = process.env.JWTSECRET
    jwt.verify(token, jwtSecret, (err, data)=>{
        if(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(constant.HTTP_401_CODE).send(customResponse({
                    code: constant.HTTP_419_CODE,
                    message: constant.ACCESS_TOKEN_EXPIRED
                }));
            } else {
                return res.status(constant.HTTP_401_CODE).send(customResponse({
                    code: constant.HTTP_401_CODE,
                    message: constant.ACCESS_TOKEN_INVALID
                }));
            }

        }
        req.user = data._id
        next()
    })
}

export const checkRole = (requiredRole='') => {
    return async (req, res, next) => {
    const userData = await User.findById(req.user)
    if (!userData) {
        return res.status(constant.HTTP_401_CODE).send(customResponse({
          code: constant.HTTP_401_CODE,
          message: 'Error Validating Role',
        }));
      }
      if (userData.role !== requiredRole && requiredRole != '' && userData.role != 'admin') {
        return res.status(constant.HTTP_403_CODE).send(customResponse({
          code: constant.HTTP_403_CODE,
          message: 'Access denied. Insufficient permissions.',
        }));
      }
      req.userData = userData
  
      next();


}
}


