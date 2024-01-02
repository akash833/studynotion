const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//auth
const auth = async (req,res,next)=>{
    const token = req.cookies.token 
    || req.body.token 
    || req.header("AccessToken").replace("Bearer ","");

}

//isStudent

//isInstructor

//isAdmin