const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


const signup = async(req, res)=>{

    const {username, email, password, image} = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });

        if(existingUser){
            return res.status(400).json({message: "User Already Esits!!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
            image: image
        });


        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY);

        res.status(200).json({ user: result, token: token });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            message:"Something went wrong!!"
        });
        
    }

}

const signin = async(req, res)=>{




    const { email, password} = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });

        if(!existingUser){
            return res.status(400).json({message: "User Not Found!!"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credential!!"});
        }


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY);

        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            message:"Something went wrong!!"
        });
        
    }

}

const userUpdate = async(req, res)=>{

    const id = req.params.id;
    const {username, email, image} = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });

        if(!existingUser){
            return res.status(400).json({message: "User Not Found!!"});
        }

        const updateUser = {
            username: username,
            email: existingUser.email,
            password: existingUser.password,
            image: image

        }

        
        await userModel.findByIdAndUpdate(id, updateUser, {new : true});

        res.status(200).json(updateUser);


    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            message:"Something went wrong!!"
        });
        
    }

}

const userDelete = async(req, res)=>{




    const id = req.params.id;

    try {
        const user = await userModel.findByIdAndDelete(id);

        res.status(202).json(user);

    } catch (error) {
        console.log(error);

        res.status(500).json({message : "Something went wrong!!"});
        
    }

}



module.exports = { signup, signin, userUpdate, userDelete }