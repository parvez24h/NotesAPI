const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    res.json({
        message: "Welcome to NotesAPI"
    });
});

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Database connect Successfuly");
    app.listen(8080, ()=>{
        console.log("Server Started at Port No. 8080");
    });
}).catch((error)=>{
    console.log(error); 
});
