const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello  Gaurav   singh sirari from the server");
});

app.use("/you", (req, res) => {
  res.send("Ky yaar pad q nhi raha hai okkk ");
});

app.listen(3000, () => {
  console.log("successfully listeing");
});
