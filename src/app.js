const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
  res.send("user bhai")
})

app.get("/admin/getAllData",(req,res)=>{
  res.send("All Data sent");
});

app.get("/admin/deleteUser",(req,res)=>{
  res.send("Deleted user");
});

app.listen(7777,()=>{
  console.log("Successfully working on port number 7777");

})


