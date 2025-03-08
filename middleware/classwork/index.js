const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

// middleware -> software component sits between client and server for check validation
const date = new Date();

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n ${Date.now()} : ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n Data request on Date : ${date}`,(err,data)=>{

        next();
    })
})

app.get("/user/data",(req,res)=>{
    console.log("user data get successfully");
});
app.listen(PORT, ()=> console.log(`Server running at port : ${PORT}`));