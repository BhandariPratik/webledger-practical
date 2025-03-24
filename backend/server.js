const express = require("express");
const cors = require("cors");
const connect = require("./config/connection");
const routes = require("./routes/index");
const app = express();
require("colors");
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());

//Initialize the Route
app.use("/api", routes);

//Initialize the server
app.listen(process.env.PORT || 4001, async () => {
  try {
    console.log(`Server is running on port ${process.env.PORT}`.magenta);
    console.log(`At ${new Date().toLocaleString()}`.yellow);
    await connect.connectDB();
  } catch (error) {
    console.log("Server Error".red, error);
  }
});
