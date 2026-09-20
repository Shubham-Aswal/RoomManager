import mongoose from "mongoose"
import jwt from  "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    avatar : {
        type : url,
        url : {
            type : url
        },
        default : {
            type : url,
            url : "https://placehold.co/200x200"
        }
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    isVerified : {
        type : Boolean,
        required : true,
        default : false
    },
    password : {
        type : String,
        required : true
    },
    phoneNo : {
        type : Number
    },
    accessToken : {
        type : String
    },
    acceesTokenExpiry :  {
        type : String
    },
    refreshToken : {
        type : String
    },
    refreshTokenExpiry : {
        type : String
    },
    temporaryToken : {
        type : String
    },
    temporaryTokenExpiry : {
        type : String
    }
})

userSchema.pre("save",(next)=>{
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatreTemporaryToken = async function(){
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
        .createHash("sha512")
        .update(token)
        .digest("hex")
   return {token,hashedToken}

}
