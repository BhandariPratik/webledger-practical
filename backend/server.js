const express = require('express');
const cors = require('cors');
require('colors');
require('dotenv').config()
const connect = require('./config/connection')

const app = express();

//middlewares
app.use(cors())
app.use(express.json())

// Initialize the server
app.listen(process.env.PORT || 4001,async () => {
    try{
        console.log(`Server is running on port ${process.env.PORT}`.magenta);
        console.log(`At ${new Date().toLocaleString()}`.yellow);
      await connect.connectDB();
    }
    catch(error){
       console.log("Server Error".red,error)
    }
})
