import express from "express";
import {isAuth, checkRole} from '../../middleware/auth.js';


import {
    getAllUser,
    // getOneUser,
    registerUser,
    loginUser,
    reGenerateAccessToken
} from "./controller.js";
const router = express.Router();

// router.get("/:id",getOneUser)
router.post("/", registerUser)
router.get("/all",getAllUser)
router.post("/login",loginUser)
router.post("/renew",reGenerateAccessToken)


export default router