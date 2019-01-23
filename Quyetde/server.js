const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const QuestionModel = require('./models/question');

mongoose.connect('mongodb://localhost:27017/web18', (error)=>{
    if(error){
        console.log(error.message);
    }
    console.log("Connected to mongo db");
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use("/", express.static("public"))
//router for page
app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/html/index.html");

    // res.sendFile(__dirname + "/view/answer.html");
});

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/public/html/ask.html");
});

app.get("/answer/:questionId", (req, res) => {
    res.sendFile(__dirname + "/public/html/answer.html");
});
//router for json data
app.post("/api/question", async (req, res) => {
    try {
        const {
            questionContent
        } = req.body;

        const question = {
            content: questionContent,
            yes:0,
            no:0,
            createdAt: new Date(),
        }
        
        
        const result = await QuestionModel.create([question]);
        console.log(result);

        res.json({
            success: true,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error,
            message,
        });
    }
});

app.get("/api/question/getRandomQuestion", async (req, res) => {
    try {
        let questionList = new Array();

        await QuestionModel.find(function (err, questions) {
            if (err) return console.error(err);
            questionList = questions;
          })

        let ranQuestion;

        if (questionList.length == 0) {
            res.send("Không có câu hỏi")
        } else {
            const index = Math.floor(Math.random() * questionList.length);
            ranQuestion = questionList[index];
        }

        res.json(ranQuestion);
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

app.get("/api/question/getQuestionById/:questionId", async (req, res) => {
    try {
        const {
            questionId
        } = req.params;

        let question;

        await QuestionModel.findById(questionId,function (err, questions) {
            if (err) return console.error(err);
            question = questions;
        });

        if (question) {
            res.json(question);
        } else {
            res.json({
                success: false,
                message: "Question not found"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

app.put("/api/question", async (req, res) => {
    try {
        const {
            questionId,
            vote
        } = req.body;

        let question;

        await QuestionModel.findById(questionId,function (err, questions) {
            if (err) return console.error(err);
            question = questions;
        });

        if (question != null) {
            if (vote == 1) {
                question.yes += 1;
            } else if (vote == 0) {
                question.no += 1;
            } else {
                console.log("Vote error");
                res.json({
                    success: false,
                    message: "Invalid vote"
                });
            }
        } else {
            res.json({
                success: false,
                message: "Question not found"
            })
        }

        await QuestionModel.findByIdAndUpdate(questionId, question, function(err){
            if(err){
                console.log(err.message);
            }
            console.log("Question updated");
        });

        console.log(result);
        res.json({
            success: true,
        });
    } catch (error) {
        res.json({
            success: false,
            messgae: error.message
        });
    }
})

app.listen("8080", function (err) {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server start success");
    }
})