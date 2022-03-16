const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require("bcryptjs");

const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const session = require("express-session");
const User = require("./models/User.model");
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // <-- location of react app
    credentials: true
}))
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
// app.use('/users', usersRoute);

//connecting to mongodb
const dbURL = 'mongodb+srv://SalmaOsama:Salma0@project.vbieb.mongodb.net/Project0?retryWrites=true&w=majority';
mongoose.connect(dbURL).then(() => null)
    .catch((err) => {
        console.log(err);
    });
//Routes

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});
app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                role: 'customer',
                name: req.body.name,
                address: req.body.addressId
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});
app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


app.listen(4000, () => {
    console.log("server started at port 4000");
})


