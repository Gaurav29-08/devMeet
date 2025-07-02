const mongoose = require("mongoose");

const connectDB = async ()=>{
  await mongoose.connect("mongodb+srv://gauravsirari424:IN5u9rx4nO0Oe6W6@namsatenode.gv0e6yv.mongodb.net/devMeet")
}

module.exports = connectDB;

