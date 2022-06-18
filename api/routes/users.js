const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const verifyToken = require('../middleware/auth');


//UPDATE USER
router.put("/update-user/:id",verifyToken, async (req, res) => {
    if(req.body.userID===req.params.id){
        if(req.body.password){
            const hashPassword = await argon2.hash(req.body.password);
            req.body.password = hashPassword;
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
            res.json({success:true, message: "cap nhat thanh cong", updatedUser});
        }catch(err){
            console.log(err);
            return res.status(400).json({success: false, message: "cap nhat that bai"});
        }
    }

})
module.exports = router;