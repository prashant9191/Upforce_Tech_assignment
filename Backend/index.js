const express = require('express');
const cors = require('cors');
const connection=require("./configs/db")
const {userRouter}=require("./routes/user.routes")
const {logger}=require("./middlewares/logger")
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);
app.use("/user",userRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to Db")
    } catch (error) {
        console.log(error)
    }
    console.log(`http://localhost:${process.env.port}/`)
})
