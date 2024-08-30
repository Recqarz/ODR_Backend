import express from "express";
import {isAuth, checkRole} from '../../middleware/auth.js';


import {
    getAllUser,
    // getOneUser,
    registerUser,
    loginUser,
    reGenerateAccessToken,
    forgotPassword,
    verifyforgotPassword
} from "./controller.js";
const router = express.Router();

// router.get("/:id",getOneUser)
router.post("/", registerUser)
router.get("/all",getAllUser)
router.post("/login",loginUser)
router.post("/renew",reGenerateAccessToken)
router.post('/forget',forgotPassword)
router.post('/verify/:userId/:hashedToken',verifyforgotPassword)



export default router