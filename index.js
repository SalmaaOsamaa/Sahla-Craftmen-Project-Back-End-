const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const Task = require('./models/Task.model')
const Tasker = require('./models/Tasker.model')
const WorkArea = require('./models/WorkArea.model')
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const session = require("express-session");
const User = require("./models/User.model");
const Address = require("./models/Address.model");
const TaskRequest = require("./models/TaskRequest.model");
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
    User.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 8);

            const newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                role: 'customer',
                name: req.body.name,
                address: req.body.address 

            });
            await newUser.save();
            res.send("User Created");
        }
    });
});
app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.post('/createTask', (req, res) => {
    var task = new Task(req.body)
    task.save()
    res.json(task)
})
app.get('/tasks', async (req, res) => {
    let tasks = await Task.find()
    res.json(tasks)

})
app.post('/createTaskrequests', (req, res) => {
    var taskrequest = new TaskRequest(req.body)
    taskrequest.save()
    res.json(taskrequest)
})
app.get('/taskrequests', async (req, res) => {
    let taskrequests = await TaskRequest.find()
    res.json(taskrequests)

})
app.get('/addresses', async (req, res) => {
    let addresses = await Address.find()
    res.json(addresses)

})
app.get('/taskers', async (req, res) => {
    let taskers = await Tasker.find()
    res.json(taskers)

})

app.get('/workAreas', async (req, res) => {
    let workAreas = await WorkArea.find()
    res.json(workAreas)

})
app.get('/workAreas/:name', async (req, res) => {
    let name = req.params.name.toLowerCase()

    let workAreas = await WorkArea.findOne({name:name})
    res.json(workAreas)
})

app.get('/workAreas/search/:city', async (req, res) => {
    let city = req.params.city.toLowerCase()
    const expression = new RegExp(city);
    let workAreas = await WorkArea.findOne({name: { $regex: expression, $options: ['i', 'm'] }})
    res.json(workAreas)
})
app.listen(4000, () => {
    console.log("server started at port 4000");
})


