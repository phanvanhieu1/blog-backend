const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Post = require('../models/Post');
const { route } = require('./auth');

router.post('/create',verifyToken, async (req, res) => {
    const { title, description, content, status } = req.body;
    if(!title || !description || !content || !status)
        return res.status(400).json({success: false, message: "vui long dien thong tin"});
    try{
        const post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            status: status || 'private',
            avatar: req.body.avatar,
            user: req.userID
        });
        await post.save();
        res.json({success:true, message: "tao bai viet thanh cong", post});
}catch(err){
    console.log(err);
    return res.status(400).json({success: false, message: "tao bai viet that bai"});
}});

// CHINH SUA BAI VIET
router.put('/update-post/:id', verifyToken, async (req, res) => {
    const { title, description, content, status } = req.body;
    if(!title || !description || !content || !status)
        return res.status(400).json({success: false, message: "vui long dien thong tin"});
    try{
        let updatedPost = {
            title,
            description: description || '',
            content: content || '',
            status: status || 'private',
        }
        const postUpdateCondition  = {_id: req.params.id, user: req.userID};
        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            {new: true}
        );
        if(!updatedPost){
            return res.status(400).json({success: false, message: "khong tim thay bai viet"});
        }
        res.json({success:true, message: "chinh sua bai viet thanh cong", updatedPost});

    }catch(err){
        console.log(err);
        return res.status(400).json({success: false, message: "chinh sua bai viet that bai"});
    }
})

//DELETE
router.delete('/delete-post/:id', verifyToken, async (req, res) => {
    try{
        const post = await Post.findOneAndDelete({_id: req.params.id, user: req.userID});
        if(!post){
            return res.status(400).json({success: false, message: "khong tim thay bai viet"});
        }
        res.json({success:true, message: "xoa bai viet thanh cong"});
    }catch(err){
        console.log(err);
        return res.status(400).json({success: false, message: "xoa bai viet that bai"});
    }
})

module.exports = router;