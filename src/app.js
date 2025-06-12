const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup",async(req,res)=>{
  //Creating a new instance of the user model
  const user = new User({
    firstName : "Gaurav",
    lastName : "Sirari",
    emailId:"gauravsirari123@gmail.com",
    password:"Gaurav@123",
  });

  try{
     await user.save();
  res.send("User added sucessfully");

  } catch(err){
    res.status(400).send("error saving the user:"+err.message);
  }
 
})


connectDB().then(()=>{
  console.log("DataBase connection established...");
  app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
  });
    
  }).catch((err)=>{
    console.log("Database can not be connected");
    
  
  
});

