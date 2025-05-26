const express = require("express");

const app = express();
  


app.use("/user",
  [
  (req,res,next)=>{
 

  console.log("response 1 console");
  res.send("reponse 1 ")
  next();

  
},
(req,res,next)=>{

  console.log("response 2 console");
  // res.send("response 2");
  next();

  
},],
(req,res,next)=>{
  console.log("response 3 console");
  
  // res.send("response 3")
  next();
},
(req,res,next)=>{
  console.log("response 4 console");
   res.send("respnse 4")

  
}

);


app.listen(7777,()=>{
  console.log("Successfully working on port number 7777");
  
})