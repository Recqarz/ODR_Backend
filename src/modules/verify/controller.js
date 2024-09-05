import emailVerify from "./model"


export const sendVerifyEmail = async (req, res) => {
    try {
        const email = req.body.email
    
        const emailExist = await emailVerify.findOne({ email: email, isVerified: true, tokenValid: { $gt: Date.now() } })
    
        if (emailExist) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "Email is already verified",
            }));
        }
        const hash = generateOTP(6);
        
        const message = `
                <p>You are receiving this email because you (or someone else) have requested the to signin on ODR.</p>
                <p>Please use this Otp ${hash} to verify the email.</p>
                <br/>
                <br/>
                <br/>
                <p>Thank you for trusting us , we makes life easier</p>
                `; 
       const emailParams = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: message,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: 'Verify your Email', // Dynamic subject
                },
            },
            Source: 'cc1@areness.co.in',
            ConfigurationSetName: 'arenessconin', // Name of your SES configuration set
        };
    
        const sentEmailData = await ses.sendEmail(emailParams).promise();
        console.log("Email sent:", sentEmailData.MessageId);

        const expiresIn = 60 * 60 * 1000; // 1 hour in milliseconds
        const tokenExpiresAt = new Date(Date.now() + expiresIn);

        const newEmail = new emailVerify({
            email:email,
            token:hash,
            tokenValid:tokenExpiresAt
        })
        await newEmail.save()

    
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Email verification token sent successfully",
        }));
    }
    catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
}


export const confirmVerifyEmail = async (req, res) => {
    try {
        const {email,otp} = req.body
    
        const emailExist = await emailVerify.findOne({ email: email, token: otp, tokenValid: { $lt: Date.now() } })
    
        if (!emailExist) {
            return res.status(constant.HTTP_400_CODE).send(customResponse({
                code: constant.HTTP_400_CODE,
                message: "Opt is not valid",
            }));
        }

        emailExist.isVerified= true
        await emailExist.save()

    
        return res.status(constant.HTTP_200_CODE).send(customResponse({
            code: constant.HTTP_200_CODE,
            message: "Email verification successfully",
        }));
    }
    catch (err) {
        console.error(err);
        return res.status(constant.HTTP_500_CODE).send(customResponse({
            code: constant.HTTP_500_CODE,
            message: err.message,
        }));
    }
}