const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware = (req, res, next) => {
    //First check request header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({Error: "Token Not Found"});
    }

    //Extract the jwt token from the Header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({error : "Unauthorized"});


    try {
        //verify the jwt token 
        const decoded_val = jwt.verify(token,process.env.JWT_SECRET);
        //Attach user information to the request object
        req.user = decoded_val
        console.log(decoded_val)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Invalid token"});
    }

}

//Function to generate jwt token
const generateToken = (userData) => {
    //Generate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: 30000});
}


module.exports = {jwtAuthMiddleware,generateToken};