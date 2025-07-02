const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validatesSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");



app.use(express.json());

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
  const isPasswordValid = await bcrypt.compare(password,user.password);
  if(isPasswordValid){
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



app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const users = await User.find({emailId : userEmail});
    if(users.length===0){
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }

  } catch (err){
    res.status(400).send("Something went wrong")
  }
});

//with the help of feed
app.get("/feed",async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users);
  } catch (err){
    res.status(400).send("something went wrong");
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if(!user){
      res.status(400).send("Something went wrong");
    }
    else {
       res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});


//delete with the help of findByIdandDelete
app.delete("/user",async (req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User successfully deleted");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})

//update data of the user
app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params.userId;
  const data = req.body;
  

  try{
    const Allowed_updates = ["userId","photoUrl","about","gender","age","skills"];

  const isUpdateAllowed = Object.keys(data).every((k)=>
    Allowed_updates.includes(k)

  );
  if(!isUpdateAllowed){
    throw new Error("Update not allowed")
  }

   const user=  await User.findByIdAndUpdate({_id : userId},data,{
    runValidators : true,

   });
    res.send("User updated successfully");

  } catch (err){
    res.status(400).send("Update Failed: "+err.message);
  }

});


    
connectDB().then(()=>{
  console.log("DataBase connection established...");
  app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
  });
    
  }).catch((err)=>{
    console.log("Database can not be connected");
    
  
  
});

