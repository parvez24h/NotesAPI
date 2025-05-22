const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.json({
        message: "Welcome to NotesAPI"
    });
});

app.listen(8080, ()=>{
    console.log("Server Started at Port No. 8080");
    
})