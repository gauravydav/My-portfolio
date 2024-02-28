const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Initialize express
const app = express(); 

// Middleware
app.use(cors(
 { origin: "http://localhost:3002",
 credentials:true }
));

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
//--------------------CORS Handling--------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://bapu-portfolio.onrender.com, https://bapu12-portfolio.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
