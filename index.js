const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("morgan");
const mongoose = require("mongoose");

const router = express.Router();

require("dotenv").config();

const PORT = 3100;

// 
// Middle-wares and such
//
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
//
//
//
//============================================================================================================//
//============================================================================================================//
//
//                                           Passport Config
//

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
    {usernameField:"email"},
    async function verifyCredentials(email, password, done) {
        const user = await User.findOne({"email": email});

        if(user)
        {
            // User exists
            // Compare entered password with stored password
            const match = await bcrypt.compare(password, user.password);

            if(!match)
            {
                // Password Incorrect
                done(null, false, {"message":"That password is incorrect!"});
            }
            else
            {
                // Authenticate
                done(null, user);
            }
        }
        else
        {
            // User does not exist
            // Email "Incorrect"
            done(null, false, {"message":"That email was not found!"})
        }
    }
));

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id,done) => {
    const user = await User.findById(id);
    console.log(`Deserialize user user obj ${user}`);
    done(null,user);
})
//
//
//============================================================================================================//
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
//
//
//
//============================================================================================================//
//============================================================================================================//
//
// Connect Flash
//
app.use(flash());
//
//
//
//============================================================================================================//
//============================================================================================================//
//
// Passport middleware
//
app.use(passport.initialize());
app.use(passport.session());
//
//
//
//============================================================================================================//

// Root Routes
app.use("/", require("./routes/index.js"));

// User route
app.use("/user", require("./routes/user.js"));

// Account API Route
app.use("/account", require("./routes/account.js"));

app.listen(process.env.PORT || PORT, _ => {
    console.log(`Server running on port ${PORT}`);
});




//
// Task Class lmao
//
class Tasks {
    DEFAULT_DESC = "";
    DEFAULT_END = "";
    DEFAULT_COLOR = "#000";

    constructor(name, description, start, end, color)
    {
        this.name = name; // String, idk char limit yet. 50 seems reasonable
        this.description = description || DEFAULT_DESC; // String (text field for db semantics) (limit unclear right now)
        this.startTime = start;  // Should be a date object
        this.endTime = end || this.DEFAULT_END; // Should be a date object
        this.color = color; // Should be a hex code probably
    }
}