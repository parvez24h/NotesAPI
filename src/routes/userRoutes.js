const express = require("express");
const { signup, signin, userUpdate, userDelete } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.put("/update/:id", userUpdate);
userRouter.delete("/delete/:id", userDelete);

module.exports = userRouter;


