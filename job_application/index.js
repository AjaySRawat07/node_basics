const express = require("express");
const jobRouter = require("./routes/job.routes");
const mongoose = require("mongoose");


const PORT = 8000;
const app = express();


app.use(express.json());

// db connection
const DB_URL = "mongodb://127.0.0.1:27017/job_app";

mongoose
.connect(DB_URL)
.then(() => console.log("DB connected successfully"))
.catch((err)=> console.log("ERROR WHILE CONNECTING TO DATABASE ❌ : ",err))

// apis
app.use("/api/v1/job" , jobRouter);


app.listen(PORT, () => {
    console.log("Server Started 🚀🚀");
});
