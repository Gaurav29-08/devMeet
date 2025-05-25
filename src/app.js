// const express = require("express");

// const app = express();


// app.use("/test", (req, res) => {
//   res.send("Hello Hello ");
// });

// app.use("/test/23", (req, res) => {
//   res.send("hello  Gaurav   singh sirari from the server");
// });



// // app.use("/", (req, res) => {
// //   res.send("Nahi pata");
// // });


// app.listen(3000, () => {
//   console.log("successfully listeing");
// });


const express = require("express");

const app = express();

app.use("/user",(req,res)=>{
  res.send("hahah aaya samaj atuje ");
  
})

app.post("/user",(req,res)=>{
  res.send("hello testing saved ")
});

app.get("/user",(req,res)=>{
  res.send({firstName:"Gaurav",lastName:"Sirari"})
});

app.delete("/user",(req,res)=>{
  res.send("Deleted successfully")
});


app.listen(3000,()=>{
  console.log("Successfully kam kar rha hu mai");
  
})