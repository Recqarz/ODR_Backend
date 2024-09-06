
import mongoose  from "mongoose";


const verifyEmail = mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
      },
    isVerified:{
        type: Boolean,
        required: true,
        default:false
    },
    token:{
        type:String,
    },
    tokenValid:{
        type:Date,
    }
})

const emailVerify = mongoose.Schema("emailverify", verifyEmail)

export default emailVerify