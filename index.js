const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const PORT = 3010;

// 
// Middle-wares and such
//
const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//
// MongoDB connection
//
const dbName = "LifeManager"; // Connect to DB
const dbConnectionString = process.env.DB_STRING; // Connect to Cluster
const userCollection = "LM-users";
const tasksCollection = "LM-tasks";
let db;

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
           .then(client => {
               console.log(`Connected to ${dbName} database`);
               db = client.db(dbName);
           })

//=====================================================================================================================//
//
// Tasks Page/Route
//
// Read tasks
app.get("/tasks", (req, res) => {
    //Get task data from db
    db.collection("task-list").find().toArray()
      .then(data => {
          res.render("tasks.ejs", {info : data});
      })
      .catch(err => {
          console.error(err);
      })
});
//
//
// NOTE: NEED TO CONNECT TASK TO PROPER DB, REDO TASK OBJECT TO USE USER UID
//
//
// Create tasks
app.post("/create/task", (req, res) => {
    //Info should be valid if user sent it, validate on client side please
    const reqName = req.body.taskName;
    const reqDesc = req.body.taskDescription;
    const reqStart = new Date(req.body.taskStartTime);
    const reqEnd = new Date(req.body.taskEndTime);
    const reqColor = req.body.taskColor;
    const task = new Task(reqName, reqDesc, reqStart, reqEnd, reqColor);

    //Add to db (user func comes next)
    db.collection(tasksCollection)     //Get collection
      .insertOne(task)  //Insert task object
      .then( result => {
          console.log("Added task");
          res.redirect("/tasks");
      })
      .catch(err=> {
          console.error(err);
      })
});

//Edit/update task

//Delete task

//=====================================================================================================================//

//=====================================================================================================================//
//
// SIGN UP FORM HANDLER (Create Account)
//
app.post("/user/signup", async (req, res) => {
    // Get form data from request
    const userData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        passwordConfirmation:req.body.passwordConf,
    }

    const errorData = {
        usernameErrors:{
            empty:false,
        },
        emailErrors:{
            empty:false,
            alreadyExists:false,
        },
        passwordErrors:{
            empty:false,
            short:false,
            mismatchConf:false,
        }
    }

    let valid = true;

    // Validate form info
    // Validate name
    if(!userData.username)
    {
        // No name entered
        errorData.usernameErrors.empty = true;
        valid = false;
    }

    // Validate email
    // Confirmation email? Best way to validate i guess
    // Ensure email is unique
    if(!userData.email)
    {
        // No email entered
        errorData.emailErrors.empty = true;
        valid = false;
    }
    const emailExists = await db.collection(userCollection)
                          .findOne( {"email": userData.email});

    console.log(emailExists);
    if(emailExists)
    {
        console.log("email exists")
        errorData.emailErrors.alreadyExists = true;
        valid = false;
    }


    // Validate password
    // 8 char minimum
    // PasswordConf matches
    if(!userData.password)
    {
        // No password entered
        errorData.passwordErrors.empty = true;
        valid = false;
    }
    else if(userData.password.length < 8)
    {
        // Password too short
        errorData.passwordErrors.short = true;
        valid = false;
    }

    if(userData.password !== userData.passwordConfirmation)
    {
        // Passwords dont match
        errorData.passwordErrors.mismatchConf = true;
        valid = false;
    }

    // If valid, create new db entry for user
    if(valid) {
        // Delete passwordConf from user object
        delete userData.passwordConfirmation;

        // Hash password
        bcrypt.hash(userData.password, saltRounds, (err, hash) => {
            // Save hashed password in object
            userData.password = hash;

            // Add user object to database
            db.collection(userCollection)
              .insertOne(userData)
              .then(result => {
                  console.log("Added user to database")
                  res.redirect("/html/signin.html")
              })
              .catch(err => console.error(err))
        });
    }
    else
    {
        // If invalid, provide some feedback for what is invalid
        console.log("Invalid")
        res.json(errorData);
    }
});

//
// SIGN IN FORM HANDLER (Read Account Info)
//
app.post("/user/signin", async (req, res) => {
    // Get form info from request
    const userInfo = {
        email:req.body.email,
        password:req.body.password
    }

    const errorInfo = {
        emailErrors:{
            emptyField:false,
            userDoesNotExist:false,
        },
        passwordErrors:{
            emptyField:false,
            passwordDoesNotMatch:false,
        },
    }

    let valid = true;

    // Check fields are filled
    if(!userInfo.email)
    {
        // Empty email field
        errorInfo.emailErrors.emptyField = true;
        valid = false;
    }

    if(!userInfo.password)
    {
        // Empty password field
        errorInfo.passwordErrors.emptyField = true;
        valid = false;
    }

    // Compare hashed passwords
    // Get user from db
    const user = await db.collection(userCollection)
                         .findOne( {"email": userInfo.email});
    
    // Check if user was found or no
    if(user)
    {
        // User was found, compare password
        const match = bcrypt.compare(userInfo.password, user.password);

        if(!match)
        {
            // Passwords dont match
            errorInfo.passwordErrors.passwordDoesNotMatch;
            valid = false;
        }
    }
    else
    {
        // User not found
        errorInfo.emailErrors.userDoesNotExist = true;
        valid = false;
    }

    if(valid)
    {
        // Login
        // I think i need passport here?

        res.redirect("/dashboard")
    }
    else
    {
        // Give feedback
        console.log("Login errors");
        res.json(errorInfo);
    }
})

//
// USER SETTINGS
//
//
// CHANGE ACCOUNT INFO (Update Account Info)
//
// Allow name, email, password to be changed
//
// DELETE ACCOUNT
//
// With double confirmation, allow user to delete account
//=====================================================================================================================//

app.get("/public/css/reset.css", (req,res) => {
    console.log("Reqesting reset")
    res.sendFile(__dirname + "/public/css/reset.css");
})

app.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs")
})

app.listen(process.env.PORT || PORT, _ => {
    console.log(`Server running on port ${PORT}`)
})




//
// Task Class lmao
//
class Task {
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