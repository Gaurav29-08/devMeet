const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validatesSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");



app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
  try{

    //validation of data 
    validatesSignUpData(req);

    const {firstName,lastName,emailId,password} = req.body;
    //Encrypt password

    const passwordHash = await bcrypt.hash(password,10);
    
  const user = new User({firstName,lastName,emailId,password:passwordHash});
  
    await user.save();
    res.send("User added successfully");
  }
  catch(err) {
    res.status(400).send("Error saving the user: "+err.message);
  }
});

app.post("/login",async(req,res)=>{
  try{
    const {emailId,password} = req.body;

    const user = await User.findOne({emailId:emailId});
  if(!user){
    throw new Error("invalid credentials");
  }
  const isPasswordValid = await user.validatePassword(password);
  
  if(isPasswordValid){
   
     const token = await user.getJWT();
   
     
res.cookie("token",token,{
  expires : new Date(Date.now()+8*3600000),
});
    res.send("Login sussessfull");
  }
  else {
    throw new Error("Invalid credentials");
  }
  }
  catch(err){
    res.status(400).send("error" + err.message);
  }

})

app.get("/profile",userAuth, async(req,res)=>{
  try {

  const user = req.user;
res.send(user);
  }  catch(err){
    res.status(400).send("error" + err.message);
  }
  
});


app.post("/Request", userAuth, async (req, res) => {
  const user = req.user;
  
  console.log("Sending a connection request");
  res.send(user.firstName  + " sent the connection request");
});


    
connectDB().then(()=>{
  console.log("DataBase connection established...");
  app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
  });
    
  }).catch((err)=>{
    console.log("Database can not be connected");
    
  
  
});

