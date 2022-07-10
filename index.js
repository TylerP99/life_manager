const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("morgan");
const mongoose = require("mongoose");

const router = express.Router();

require("dotenv").config();

const PORT = process.env.PORT || 3100;


// Middle-wares and such
const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// User Schema
const User = require("./models/User");

// Task Schema
const Task = require("./models/Task");

// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//============================================================================================================//
//
//                                              MongoDB config
//
const dbName = "LifeManager"; // Connect to DB
const dbConnectionString = process.env.DB_STRING; // Connect to Cluster
// const userCollection = "LM-users";
// const tasksCollection = "LM-tasks";
// let db;

// Connect to life manager database
mongoose.connect(dbConnectionString, { useNewUrlParser: true ,useUnifiedTopology: true})
        .then(() => console.log(`Connected to ${dbName} database`))
        .catch(err => {
            console.error(err)
        });




//============================================================================================================//
//
// Express Session
//
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
//============================================================================================================//
//
//                                           Passport Config
//

const init_passport_local = require("./config/passport-config");
init_passport_local(passport);

app.use(passport.session());

//============================================================================================================//
//
// Connect Flash
//
app.use(flash());

//============================================================================================================//
//
// Passport middleware
//
app.use(passport.initialize());
app.use(passport.session());


//==================================//
//             Routes               //
//==================================//

// Root Routes
app.use("/", require("./routes/index.js"));

// User page routes
app.use("/user", require("./routes/user.js"))

// API Route
app.use("/api", require("./routes/api.js"))




app.listen(process.env.PORT || PORT, _ => {
    console.log(`Server running on port ${PORT}`);
});