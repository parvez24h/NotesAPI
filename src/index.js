const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/notes", noteRouter);

app.get("/",(req,res)=>{
    res.status(200).json({
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
