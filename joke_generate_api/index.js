const express = require("express");
const axios = require("axios");
// const bodyParser = require("body-parser");
const http = require("http");

const app = express();
const URL = "https://official-joke-api.appspot.com/jokes/random";


let response;

app.set("view engine","ejs");

app.get("/", async(req,res) => {
    try{
        response = await axios.get(URL);
        res.render("index", {"data" : response.data});
        console.log(response.data);
    }
    catch(error){
        console.error(error);
        res.render("index",{"data" : null });
    }
});


const server = http.createServer(app);

server.listen(8001, () => {
    console.log("Server is running on port 8001");
});
