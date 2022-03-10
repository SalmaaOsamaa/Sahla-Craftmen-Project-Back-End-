var express = require("express");
// here i imported the express js module into our application
var app = express();
//then intialized the application using express

var mongoose = require("mongoose");
//then requiring mongoose

const dbURL = 'mongodb+srv://SalmaOsama:Salma0@project.vbieb.mongodb.net/Project0?retryWrites=true&w=majority';
mongoose.connect(dbURL).then((result) =
    app.listen(4000))
    .catch((err) => {
        console.log(err);
    })

//using app to configure route of GET and path is "/Hello"
//whenever there is a request in this path there will be response ->Hello
app.get("/Hello", (req, res) => {
    res.send("Hello");

});
