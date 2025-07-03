const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next)=>{
  try{
    const {token} = req.cookies;
    if(!token) {
      throw new Error("Token is not valid !!!");

    }
    const decodeObj = await jwt.verify(token,"Dev@TEnderhgdhdh");

    const {_id} = decodeObj;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User  is not found");
    }
    req.user = user;
    next();

  } catch (err){
    res.status(400).send("Eoor: "+err.message);
  }
};

module.exports = {
  userAuth,
}