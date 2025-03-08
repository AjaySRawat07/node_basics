const express = require("express");
const axios = require("axios");
const http = require("http");

const app = express();

const url = "https://picsum.photos/400/500";
const PORT = 8000;

app.set("view engine", "ejs" );

app.get("/",async (req,res)=>{
    
    try{
        const response = await axios.get(url, { responseType: "arraybuffer" }); // Fetch image as binary data
        const imageBase64 = Buffer.from(response.data, "binary").toString("base64"); // Convert to base64

        res.render("index", { data: `data:image/jpeg;base64,${imageBase64}` });
    }       
    catch(error){
        console.log("Error while fetching data",error);
        res.render("index", {"data": null});
    }
});

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log("Server Started");
})