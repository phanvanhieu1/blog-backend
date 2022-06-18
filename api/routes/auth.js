const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
    const { email, password, userName, age, gender } = req.body;
    if(!email || !password || !userName || !age || !gender)
        return res.status(400).json({success: false, message: "vui long dien thong tin"});
    try{
        const user = await User.findOne({email});
        if(user)
            return res.status(400).json({success: false, message: "email da ton tai"});
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            email: req.body.email,
            password: hashPassword,
            userName:req.body.userName,
            age: req.body.age,
            gender: req.body.gender
        });
        await newUser.save();
        const accessToken = jwt.sign(
          {userID : newUser._id}, 
           process.env.ACCESS_TOKEN_SECRET );
           res.json({success:true, message: "dang ky thanh cong", accessToken});
    }catch(err){
        console.log(err);
        return res.status(400).json({success: false, message: "dang ky that bai"});
        
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.status(400).json({success: false, message: "vui long dien thong tin"});
    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({success: false, message: "email khong ton tai"});
        const isMatch = await argon2.verify(user.password, password);
        if(!isMatch)
            return res.status(400).json({success: false, message: "sai mat khau"});
        const accessToken = jwt.sign(
            {userID : user._id},
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({success:true, message: "dang nhap thanh cong", accessToken});
    }catch(err){
        console.log(err);
        return res.status(400).json({success: false, message: "dang nhap that bai"});
    }
})

module.exports = router;