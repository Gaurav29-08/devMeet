const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName : {
    type:String,
    required : true,
    minLength : 4,
    maxLength : 40,
  },
  lastName : {
    type:String,
  },
  password : {
    type:String,
    required : true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Give strong password" + value);
      }
    }
  
  },
  age : {
    type:Number,
  },
  emailId :{
    type : String,
    required : true,
    lowercase : true,
    unique: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid emaild address: "+value);
      }
    }
  
  },
  gender : {
    type:String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender is not valid");
      }
    }

  },
  photoUrl : {
    type: String,
    default : "https://www.google.com/imgres?q=dummy%20photos%20for%20profile&imgurl=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fbusiness-and-finance-related-hand-gestures%2F256%2Fface_female_blank_user_avatar_mannequin-512.png&imgrefurl=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F1054492%2Favatar_blank_face_female_mannequin_user_icon&docid=TMjsSXTHRzCSdM&tbnid=kbP0lULd14TxfM&vet=12ahUKEwiFqZ3knZOOAxUTRmcHHan7LlIQM3oECFsQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwiFqZ3knZOOAxUTRmcHHan7LlIQM3oECFsQAA",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid url : "+value)
      }
    }
  },
  about : {
    type : String ,
    default :  "This is a default about of the user"
  },
  skills : {
    type : [String],
  },
  

},
{
  timestamps : true,
}
);


UserSchema.methods.getJWT = async function (){
  const user = this;
  const token = await jwt.sign({ _id:user._id},"Dev@TEnderhgdhdh",{
      expiresIn : "1d",
     });
     return token;
};


UserSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;

}
module.exports = mongoose.model("User",UserSchema);