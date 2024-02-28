const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Initialize express
const app = express(); 

// Middleware
app.use(cors());

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// console.log(process.env.SMTP_MAIL)
// console.log(process.env);

//------------------connect to MongoDB-----------------
const url = "mongodb+srv://portfolio:portfolio@cluster0.kobcd5u.mongodb.net/";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log(err));

//----------------------routes------------------------
app.use("/email", require("./routes/contactRoute.js"));
app.use("/user", require("./routes/userRoute.js"));
app.use("/", require("./routes/educationRoute.js"));
app.use("/", require("./routes/aboutRoute.js"));
app.use("/", require("./routes/experienceRoute.js"));
app.use("/", require("./routes/projectRoute.js"));
app.use("/", require("./routes/uploadRoute.js"));


app.use((err, req, res, next) => {
  console.error(err); 

  res.status(500).json({
    error: "Internal Server Error",
  });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
