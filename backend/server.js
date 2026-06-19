const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
 
const jwt=require("jsonwebtoken");

require("dotenv").config();

const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Cloud Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed", error);
    });

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.post("/api/register", async (req, res) => {
    try{
        const { fullName, email, password} = req.body;
        const existingUser = await User.findOne({ email: email});

        if(existingUser){
            return res.status(400).json({
                message: "Email already registered",
            });
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName:fullName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            message: "Registration Succesful",
        });
    }catch (error){
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email:email });
        


        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }
        const token=jwt.sign(
            {
                id:user._id,
                email:user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h",
            }
        );
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})




