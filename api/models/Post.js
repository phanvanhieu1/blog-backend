const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    },
    avatar: {
        type: String,
        default:""
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

    
},{timestamps:true});
module.exports = mongoose.model('Post', PostSchema);