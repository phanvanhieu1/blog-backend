const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    userName:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type:String,
        required:false
    },
    avatar:{
        type:String,
        default:""
    }
},{timestamps:true}
);
module.exports = mongoose.model("User", UserSchema)