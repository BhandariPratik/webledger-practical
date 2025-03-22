const express = require('express');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config()

const app = express();

//middlewares
app.use(cors())
app.use(express.json())

// Initialize the server
app.listen(process.env.PORT || 4001, () => {
    console.log(`Server is running on port ${process.env.PORT}`.magenta);
    console.log(`At ${new Date().toLocaleString()}`.rainbow);
  })
