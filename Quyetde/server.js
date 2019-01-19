const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/", express.static("view"))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/view/answer.html");

    // res.sendFile(__dirname + "/view/answer.html");
});

app.get("/question", (req, res) => {
    let questionList = new Array();
    try {
        questionList = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }

    let ranQuestion;

    if (questionList.length == 0) {
        res.send("Không có câu hỏi")
    } else {
        const index = Math.floor(Math.random() * questionList.length);
        ranQuestion = questionList[index];
    }

    if (ranQuestion != null) {
        res.send({
            question: ranQuestion
        });
    }
});

app.post("/vote", (req, res) => {

    console.log("Hello");
    const {
        questionId,
        vote
    } = req.body;

    let questionList = new Array();
    try {
        questionList = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }

    const question = questionList.filter(item => item.id == questionId)[0];
    if (question != null) {
        if (vote == 1) {
            question.yes += 1;
        } else if (vote == 0) {
            question.no += 1;
        } else {
            console.log("Vote error");
        }
    }

    fs.writeFileSync("./data.json", JSON.stringify(questionList));
    res.send("abc")
});

app.get("/result/:questionId", (req, res) => {
    const {
        questionId
    } = req.params;
    let questionList = new Array();
    try {
        questionList = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }
    const question = questionList.filter(item => item.id == questionId)[0];
    const totalVote = question.yes + question.no;
    const yesByPercent = Math.round((question.yes) / totalVote * 100);
    const noByPercent = 100 - yesByPercent;
    res.send(`
        <h1>${question.content}</h1>
        <div>Tổng số lượt vote: ${totalVote}</div>
        <div>Đúng/Có: ${yesByPercent} %</div>
        <div>Sai/Không: ${noByPercent} %</div>
        <div> <a href = "/"><button>Xem câu hỏi khác</button></a></div>
    `);
})

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html");
});

app.post("/addquestion", (req, res) => {
    console.log("question posted");
    console.log(req.body);
    const {
        questionContent
    } = req.body;

    let questionList = new Array();
    try {
        questionList = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    } catch (error) {
        console.log(error);
    }

    const question = {
        id: questionList.length,
        content: questionContent,
        yes: 0,
        no: 0
    }
    questionList.push(question);

    fs.writeFileSync("./data.json", JSON.stringify(questionList));
    res.send("Question added");
});

app.listen("8080", function (err) {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server start success");
    }
})