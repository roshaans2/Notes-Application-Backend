const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { hashPassword } = require("../helpers/utils")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:1,
    },
    lastName:{
        type:String,
        required:true,
        minlength:1,
    },
    username:{
       type:String,
       unique:true,
       required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note",
    }]
},{timestamps:true})

UserSchema.pre("save",async function(next){
     if(this.password.length<5){
        next(new Error("Error"))
     }
     else{
        const hashedPassword = hashPassword(this.password)
        this.password = hashedPassword
        next()
     }
})

const User = mongoose.model("User",UserSchema)

module.exports = User
