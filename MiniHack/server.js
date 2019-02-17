const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
GAMENUMBER = 0;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

// route font-end
app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/html/index.html");
})

app.get("/games/:id",function(req,res){
    res.sendFile(__dirname + "/public/html/game.html");
});

// route get data ajax
app.post('/api/createGame',function(req,res){
    console.log("create game");
    const { playerListInJson } = req.body;
    
    let playerList = [];
    try {
        playerList = JSON.parse(playerListInJson);
    } catch (error) {
        console.log(error);
    }

    let gameList = [];
    try {
        gameList = JSON.parse(fs.readFileSync("database.json"));
        console.log("read successful");
    } catch (error) {
        console.log(error);
    }

    gameList.push(playerList);
    fs.writeFileSync("database.json", JSON.stringify(gameList));
    res.json({
        success:true, 
    });
});

app.get("/api/gamecount",function(req,res){
    let gameList = [];
    try {
        gameList = JSON.parse(fs.readFileSync("database.json", "utf-8"));
    } catch (error) {
        console.log(error);
    } 

    res.json(gameList.length);
});

app.post("/api/update", (req, res) => {
    const { gameId, playerListInJson } = req.body;
    
    let playerList = [];
    try {
        playerList = JSON.parse(playerListInJson);
        console.log(playerList);
    } catch (error) {
        console.log(error);
        res.status(500).end(error.message);
    }

    let gameList = [];
    try {
        gameList = JSON.parse(fs.readFileSync("database.json"));
        console.log("read successful");
    } catch (error) {
        console.log(error);
    }

    if(playerList.length != 0 && gameList.length !=0){
        gameList[gameId] = playerList;
    }else{
        res.status(500).end("Data error");
    }

    fs.writeFileSync("database.json", JSON.stringify(gameList));
    res.json({
        success:true, 
    });
});

app.get("/api/getPlayerList/:gameId", (req, res) => {
    const { gameId } = req.params;
    let gameList = [];
    try{
        gameList = JSON.parse(fs.readFileSync("database.json", "utf-8"));
    }catch(err){
        console.log("Reading database error");
        console.log(err);
    }

    let playerList = [];

    if(gameList.length == 0){
        console.log("No game in database");
    }else{
        playerList = gameList[gameId];
    }

    console.log(playerList);

    res.json(playerList);
})

app.listen("8080",function(error){
    if(error){
        console.log(error);
    }else{
        console.log("server start successful!");
    }
});


