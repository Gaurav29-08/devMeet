const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");

const bcrypt = require("bcrypt");



app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const {firstName,lastName,emailId,password} = req.body;

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);

  const user = new User({firstName,lastName,emailId,
        password:passwordHash});

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/login",async(req,res)=>{
  try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Email Id is not present");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(isPasswordValid) {
      res.send("Log in succesffuly");
    } else{
      throw new Error("password is not correct")
    }
  } catch(err){
    res.status(400).send("Eroor" + err.message);
  }
});


app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId;
  try{
    const user= await User.find({emailId:userEmail});
    if(user.length===0){
      res.status(404).send("user not found");
    } else {
       res.send(user);
      
    }
   
  } catch(err){
    res.status(400).send("Something went wrong");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;



  try {

      const ALLOWED_UPDATE = ["about","gender","age","skills"];

  const isAllowedUpdate = Object.keys(data).every((k)=>
    ALLOWED_UPDATE.includes(k)
);
if(!isAllowedUpdate){
 throw new Error("Update is not allowed");
}

    const user = await User.findByIdAndUpdate({_id : userId},data,{
      returnDocument :"after",
      runValidators : true,

    });
    res.send("update successfully");
  } catch (err) {
    res.status(400).send("Update Failed : " + err.message);
  }
});



connectDB()
.then(()=>{
  console.log("connected succeffuly database");
  app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777");
    
  });
})
  .catch((err)=>{
    console.log("Database can not be connected");
    

  });