const express = require('express');
const bcryptjs = require('bcryptjs');
const userModel = require('../users/models');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const userInfo = req.body;

        //hash password
        const hashPassword = bcryptjs.hashSync(userInfo.password, 10);
        //save to database
        const newUser = new userModel({
            ...userInfo,
            password: hashPassword,
        });

        await newUser.save();

        res.status(201).json({
            id: newUser._id,
        });
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error');
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const {username} = req.body;
        const {password} = req.body;

        const existUser = await userModel.findOne({username: username}).exec();
        
        if(existUser){

            if(bcryptjs.compareSync(password, existUser.password)){
                //save user to session 
                req.session.authUser = {
                    id: existUser._id,
                    username: existUser.username,
                    fullName: existUser.fullName
                }
                req.session.save();
                
                res.status(200).json({
                    success: true,
                    message: 'Login success',
                });
            }else{
                res.status(200).json({
                    success: false,
                    message: 'Password is not correct',
                });
            }

        }else{
            res.status(404).json({
                success: false,
                messgae: 'Username not found',
            });
        }
    } catch (error) {
        res.status(error.status || 500).end(error.message || 'Internal server error'); 
    }
})

module.exports = authRouter;