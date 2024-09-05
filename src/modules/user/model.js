import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';



const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true  // for ref -> will remove white spaces only
    },
    name:{
        type:String,
        required:true,
    },
    organizationName:{
        type:String,
        required:true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true, // Ensure the mobile number is unique
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Validates that the mobile number is exactly 10 digits
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['admin', 'user','arbitory'], 
        required: true
    },
    tokens:{
        accessToken:{type:String},
        accessTokenExpiry:{type:Date},
        refreshToken:{type:String},
        refreshTokenExpiry:{type:Date}
    },
    token:{
        type:String
    },
    tokenExpiry:{
        type:String
    },


})

userSchema.methods.generateAccessToken = async function(){
    const secret = process.env.JWTSECRET
    const expire_time = process.env.ACCESS_TOKEN_EXPIRY
    const accessToken = jwt.sign({_id: this._id.toString(), role: this.role }, secret, {expiresIn: expire_time}); // Expires in 24 hours
    const accessTokenExpiry = new Date(new Date().getTime() + Number(expire_time))
    this.tokens.accessToken = accessToken
    this.tokens.accessTokenExpiry = accessTokenExpiry
    await this.save()
    return {accessToken,accessTokenExpiry}
}
userSchema.methods.generateRefreshToken = async function(){

    const secret = process.env.JWTSECRET
    const expire_time = process.env.REFRESH_TOKEN_EXPIRY
    const refreshToken = jwt.sign({_id: this._id.toString()}, secret, {expiresIn: expire_time}); // Expires in 7 DAYS
    const refreshTokenExpiry = new Date(new Date().getTime() + Number(expire_time))
    this.tokens.refreshToken = refreshToken
    this.tokens.refreshTokenExpiry = refreshTokenExpiry
  
    await this.save()
    return {refreshToken, refreshTokenExpiry}
   
}
const User = mongoose.model('User', userSchema);
export default User;