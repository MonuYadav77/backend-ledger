/// check user is logged in or not
// if logged in then add user details to request object and call next middleware

 const usermodel = require("../models/user.model");
 const jwt = require("jsonwebtoken"); // for verifying the token

 async function authMiddleware(req, res, next){
    //check if token is present in cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 

    if(!token){
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        })
    }
    //if token is present  then verify the token and get the user details from the token

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY); // verify the token and get the decoded payload
        const user = await usermodel.findById(decoded.userId); // find the user by id from the decoded payload
        req.user =user;
        return next(); // call the next middleware
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        })
 }
}


module.exports = authMiddleware;

