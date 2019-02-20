const express = require('express');
const userModel = require('./models');

const userRouter = express.Router();

userRouter.get('/:userId', async (req,res) => {
    try {
        const {userId} = req.params;
        const userInfo = await userModel.findById(userId).exec();

        res.status(200).json(userInfo);

    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

userRouter.post('/', async (req, res) => {
    try{
        const userInfo = req.body;
        const newUser = new userModel(userInfo);
        await newUser.save();

        res.status(201).json({
            id : newUser._id,
        });
    }catch(error){
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
});

module.exports = userRouter;