require("dotenv").config();

const express = require("express");

const app = express();

const PORT_NO = process.env.PORT_NO;

app.listen(PORT_NO,()=>{
    console.log(`Server started at PORT_NO ${PORT_NO}`);
})