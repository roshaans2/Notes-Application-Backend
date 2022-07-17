const { verify } = require("crypto")
const fs = require("fs")
const path = require("path")
const { verifyJWT,decodeJWT } = require("../helpers/jwt")

const something = (req,res,next)=>{
    console.log(req.url)
    console.log("You made a request")
    next()
}

const isAuthorized = (req,res,next)=>{
    const {authorization:key} = req.headers

    // if(key=="my_api_key"){
    //     next()
    // }
    // else
    // {
    //     res.send("Unauthorized")
    // }

    const users = JSON.parse(fs.readFileSync(path.join(path.resolve(),"users.json"),{encoding:"UTF-8"}))
    const user = users.find(u=>u.api_key==key)
    if(user){
        next();
    }
    else{
        res.send("Unauthorized")
    }
}

const isValidTodo = (req,res,next)=>{
    const {title,completed} = req.body
    if(title.length>0)next()
    else{
        res.send("Invalid Title")
    }
}

const validateSignup = (req,res,next)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password) return res.send("Invalid Fields")
    next()
}

const validateLogin = (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password) return res.send("Invalid credentials")
    next()
}

const Authorized = (req,res,next)=>{
    const token = req.headers['auth']
    if(verifyJWT(token)) {
        const {id} = decodeJWT(token)
        req.user = id
        next()
    }
    else res.send("Access denied")
}



module.exports = {
    something,
    isAuthorized,
    validateSignup,
    validateLogin,
    Authorized
}

