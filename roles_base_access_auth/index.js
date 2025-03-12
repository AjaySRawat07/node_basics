require("dotenv").config();
const express = require("express");

const connectToDB = require("./database/db");
const userRouter = require("./routes/auth.routes");
const uiRouter = require("./routes/ui.routes");

connectToDB();


const app = express();

app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v2/page",uiRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})