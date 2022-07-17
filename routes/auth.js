const router = require("express").Router()
const { verifyPassword } = require("../helpers/utils")
const {User,Note} = require("../models/index")
const {createJWT} = require("../helpers/jwt")

router.post("/register",async (req,res)=>{
   
    try{
        const {firstName,lastName,username,email,password} = req.body
        const user = new User ({firstName,lastName,username,email,password})
        await user.save()
        const data = {
           success:true,
           data:{user},
           message:"User created sucessfully"
        }
        res.status(201).json(data)
    }catch(error){
        console.log(error)
        const data = {
            success:false,
            data:{user:null},
            message:error.message
         }
        res.status(400).json(data)
    }

})

router.post("/login",async (req,res)=>{
   
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.json({
            success:false,
            data:{token:null},
            message:"User does not exist"
        })
        const isAuthorized = verifyPassword(password,user)
        if(isAuthorized){
             const token = createJWT({
                id:user._id,
                email:user.email
             },'7d')
             const data = {
                success:true,
                data:{token},
                message:"Login Success"
             }
             res.status(201).json(data)
        }
        else{
            return res.json({
                success:false,
                data:{token:null},
                message:"Incorrect Password"
            })
        }
        
    }catch(error){
        console.log(error)
        const data = {
            success:false,
            data:{user:null},
            message:error.message
         }
        res.status(400).json(data)
    }

})



module.exports = router