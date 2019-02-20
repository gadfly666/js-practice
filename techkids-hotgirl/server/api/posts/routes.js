const express = require('express');
const postModel = require('./models');
const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
    try {
        const postInfo = req.body;
        const newPost = new postModel(postInfo);
        await newPost.save();

        res.status(201).json({
            id: newPost._id,
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Inrenal server error');
    }
});

postRouter.get('/:postId', async (req, res) => {
    try{
        const {postId} = req.params;
        const postInfo = postModel.findById(postId).exec();

        res.status(200).json(postInfo);
    }catch(error){
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

module.exports = postRouter;