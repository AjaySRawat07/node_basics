const express = require("express");
const fs = require("fs");

const app = express();

app.use((req,res)=>{
    fs.appendFile("log.file",,(req,res)=>{

    })
})

const PORT = 7777;
app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})