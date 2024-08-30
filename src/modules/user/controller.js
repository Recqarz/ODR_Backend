
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import constant from '../../utilities/constant.js';
import { customResponse, customPagination } from "../../utilities/customResponse.js";
import User from './model.js';



export const getAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;

        // Fetch users with pagination
        const users = await User.find()
            .skip(skip)
            .limit(limit);

        // Count total users for pagination info
        const totalUsers = await User.countDocuments();

        // Pagination data
        const pagination = {
            totalItems: totalUsers,
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            itemsPerPage: limit,
        };

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Users fetched successfully",
            data: {
                users: users,
                pagination: pagination,
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


export const registerUser = async (req, res) => {
    try {
        const { userName, email, name, password, role, client } = req.body;
        if (!userName || !email || !name || !password || !role) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "userName, email, name, password, and role are required",
            }));
        }

        const existingUser = await User.findOne({ $or: [{ username: userName }, { email: email }] });
        if (existingUser) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "Username or email is already registered"
            }));
        }
        // if (client){
        //     const clientMaster = await ClientMaster.findById(client)
        //     if (!clientMaster){
        //         return res.status(constant.HTTP_400_CODE).send(customResponse({
        //             code: constant.HTTP_400_CODE,
        //             message: "Client does not found in client Master",
        //         }));
        //     }
        // }

        const salt = await bcrypt.genSalt(Number.parseInt(process.env.ENC_SALT_ROUND));
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({ username: userName, email: email, name: name, role: role, password: hashPassword });
        await user.save();

        return res.status(constant.HTTP_201_CODE).send(customResponse({
            code: constant.HTTP_201_CODE,
            message: "User has been created",
        }));
    } catch (err) {
        console.log(err, "-->>>");
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password, token } = req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(constant.HTTP_401_CODE).send(customResponse({
                code: constant.HTTP_401_CODE,
                message: 'Email does not exist'
            }))
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(constant.HTTP_401_CODE).send(customResponse({
                code: constant.HTTP_401_CODE,
                message: constant.WRONG_PASSWORD
            }))
        }
        const { accessToken, accessTokenExpiry } = await user.generateAccessToken()
        const { refreshToken, refreshTokenExpiry } = await user.generateRefreshToken()
        if(token) user.Webtokens.push(token)
        const data = {
            accessToken: accessToken,
            accessTokenExpiry: accessTokenExpiry,
            refreshToken: refreshToken,
            refreshTokenExpiry: refreshTokenExpiry,
            role:user.role
        }
        await user.save()
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: constant.LOGIN_SUCCESS,
            data: data
        }))
    }
    catch (err) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }))
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(constant.HTTP_404_CODE).send(customResponse({
                code: constant.HTTP_404_CODE,
                message: "User with this email does not exist",
            }));
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        // Set reset token and expiration on the user
        user.resetPasswordToken = hash;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: ${resetUrl}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset',
            text: message,
        });

        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Password reset email sent successfully",
        }));

    } catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
};


export const reGenerateAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(constant.HTTP_401_CODE).send(customResponse({
                code: constant.HTTP_401_CODE,
                message: constant.REFRESH_TOKEN_MISSING
            }))
        }

        const user = await User.findOne({ 'tokens.refreshToken': refreshToken })
        if (!user) {
            return res.status(constant.HTTP_401_CODE).send(customResponse({
                code: constant.HTTP_401_CODE,
                message: constant.REFRESH_TOKEN_INVALID
            }))

        }
        const jwtSecret = process.env.JWTSECRET
        jwt.verify(refreshToken, jwtSecret, async (err, data) => {
            if (err) {
                res.status(constant.HTTP_401_CODE).send(customResponse({
                    code: constant.HTTP_401_CODE,
                    message: constant.ACCESS_TOKEN_INVALID
                }))

            }
            if (data) {
                const { accessToken, accessTokenExpiry } = await user.generateAccessToken()
                const { refreshToken, refreshTokenExpiry } = await user.generateRefreshToken()
                const data = {
                    accessToken: accessToken,
                    accessTokenExpiry: accessTokenExpiry,
                    refreshToken: refreshToken,
                    refreshTokenExpiry: refreshTokenExpiry
                }
                return res.status(constant.HTTP_200_CODE).send(customResponse({
                    code: constant.HTTP_200_CODE,
                    message: constant.TOKEN_RENEW_SUCCESS,
                    data: data
                }))

            }
        })

    }
    catch (err) {
        res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }))
    }


}
export default  {
    getAllUser,
    registerUser,
    loginUser,
    reGenerateAccessToken
}