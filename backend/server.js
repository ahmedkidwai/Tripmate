//All the things we need for our server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Where we are going to store environment variables
require("dotenv").config();

//How we are going to create our express server
const app = express();
//Port our server will be on.
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Connecting our URI to our DB,
const uri = process.env.ATLAS_URI_DEV;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const testRouter = require("./routes/user");
app.use("/user", testRouter);

//This starts listening for the port for the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
