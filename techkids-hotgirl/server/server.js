const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./api/users/routes')
const postRouter = require('./api/posts/routes')

const bootstrap = async() => {
    try {
        //init app
        const app = express();

        //connect mongodb
        await mongoose.connect('mongodb://localhost:27017/techkids-hotgirl');

        //use middlewares + routers
        app.use(bodyParser.urlencoded({ extended: false } ));
        app.use(bodyParser.json());
        app.use('/api/users', userRouter);
        app.use('/api/posts', postRouter);

        //start server
        await app.listen(process.env.PORT || 3000);
        console.log(`server listens on port ${process.env.PORT || 3000}...`)
    } catch (error) {
        console.log('Error happens: ',error);
    }
};

bootstrap();