const adminAuth = (req,res,next)=>{
  console.log("Admin auth is getting checked");
  const token = "xyztt";
  const isAdminAuthrized = token==="xyz";
  if(!isAdminAuthrized){
    res.status(401).send("Un request");
  } else{
    next();
  }
  

};


const userAuth = (req,res,next)=>{
  console.log("USer auth is geetinng checked");
  const token = "xyz";
  const isUserAuthrized = token ==="xyz";
  if(!isUserAuthrized){
    res.status(401).send("Un request")
  }  else {
    next();
  }
}

module.exports = {adminAuth,userAuth};

