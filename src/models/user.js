const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
 
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique : true,
    trim : true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address");
      }
    }
  
  },
  password: {
    type: String,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("your password is not strong")

      }
    }
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
validate(value){
  if(!["male","female","others"].includes(value)){
    throw new Error("Gender data is not valid");
  }
}
  },
  about : {
    type : String,
    default : "This is a default value",
  },
  skills : {
    type : [String]
  },
 
  
},{
  timestamps : true
});

module.exports = mongoose.model("User", userSchema);
