const express = require("express");
const app = express();
const fs = require("fs");

app.use("/about", express.static("front-end/about"));
app.use("/",  express.static("front-end/homepage"));

// app.get("/", function (req, res) {
//    res.send("Home");
// });

// app.get("/about", function(req, res){
//     res.send("About");
// });

app.listen("8080", function (err) {
    if (err) {
        console.log("Server error:", err);
    } else {
        console.log("Server start success");
    }
})