const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");
/** 
* -user register controller
* - POST /api/auth/register 
*/
async function userRegisterController(req,res){

    const {email,password,name} = req.body;
    const isExists = await userModel.findOne({
        email: email
    })
    if(isExists){
        return res.status(422).json({
            message: `User already exists with email ${email}`,
            status: "failed"
        })
    }

    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn: "3d"})

    //set token in cookie using cookie-parser 
    res.cookie("token", token)
    res.status(201).json({
        user: {
            _id : user._id,
            email: user.email,
            name: user.name
        },
        token
    })
    //so now we have to send registration email to user using nodemailer and google oauth2.0
    await emailService.sendRegistrationEmail(user.email,user.name);
}

/** 
* -user login controller
* - POST /api/auth/login 
*/
async function userLoginController(req,res){
    
    const {email,password} = req.body;
    // console.log(password);
    //now check if user with email exists or not 
    const user = await userModel.findOne({email}).select("+password"); // select password field explicitly since it is set to select: false in user model
    console.log(user);
    if(!user){
        return res.status(401).json({
            message: "Invalid email or password",
            status: "failed"
        })
    }
    //check valid password
    const isValidPassword = await user.comparePassword(password);
    if(!isValidPassword){
        return res.status(401).json({
            message: "Email or password is incorrect",
            status: "failed"
        })
    }  
    
    //if password is valid then generate token for user
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn: "3d"})

    //set token in cookie using cookie-parser 
    res.cookie("token", token)
    res.status(200).json({
        user: {
            _id : user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

module.exports = {
    userRegisterController, userLoginController
}