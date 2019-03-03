const express = require('express');
const postModel = require('./models');
const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
    try {
        if (req.session.authUser) {
            const postInfo = req.body;
            const newPost = new postModel(postInfo);
            await newPost.save();

            res.status(201).json({
                id: newPost._id,
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Please Login',
            });
        }

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Inrenal server error');
    }
});


// localhost:3000/api/post?after=.....&pageSize=...
postRouter.get('/', async (req, res) => {
    try {
        const after = req.query.after;
        const pageSize = Number(req.query.pageSize);

        const filter = {};
        if (after) {
            filter._id = {
                $lt: after
            }
        }
        const data = await postModel.find(filter)
            .sort({
                _id: -1
            })
            .limit(pageSize + 1)
            .populate('author', '_id username fullName createAt')
            .exec();

        console.log(data);

        res.status(200).json({
            data: data.length > pageSize ? data.slice(0, pageSize) : data,
            after: data.length > pageSize ? data[pageSize]._id : undefined,
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Inrenal server error');
    }
})

postRouter.get('/:postId', async (req, res) => {
    try {
        const {
            postId
        } = req.params;
        const postInfo = postModel.findById(postId).exec();

        res.status(200).json(postInfo);
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

module.exports = postRouter;