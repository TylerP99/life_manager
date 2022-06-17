const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const dbName = "tasks";
const dbConnectionString = process.env.DB_STRING;
let db;
const PORT = 3100;

MongoClient.connect(dbConnectionString, {useUnifiedTopology: true})
           .then(client => {
               console.log(`Connected to ${dbName} database`);
               db = client.db(dbName);
           })


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
app.get("/public/css/reset.css", (req,res) => {
    console.log("Reqesting reset")
    res.sendFile(__dirname + "/public/css/reset.css");
})


app.get("/register", (req,res) => {
    res.render("signup.ejs")
})
app.get("/login", (req,res)=> {
    res.render("login.ejs")
})

app.post("/create/task", (req, res) => {
    //Info should be valid if user sent it, validate on client side please
    const reqName = req.body.taskName;
    const reqDesc = req.body.taskDescription;
    const reqStart = new Date(req.body.taskStartTime);
    const reqEnd = new Date(req.body.taskEndTime);
    const reqColor = req.body.taskColor;
    const task = new Task(reqName, reqDesc, reqStart, reqEnd, reqColor);

    //Add to db (user func comes next)
    db.collection("task-list")     //Get collection
      .insertOne(task)  //Insert task object
      .then( result => {
          console.log("Added task");
          res.redirect("/tasks");
      })
      .catch(err=> {
          console.error(err);
      })
});

// SIGN UP FORM HANDLER
app.post("/user/signup", (req, res) => {
    // Grab form data for validation
    const formData = {
        username: req.body.usernameField,
        email: req.body.emailField,
        password: req.body.passwordField,
        passwordConf: req.body.passwordConfField
    }

    //Is form complete?
    if( !formData.username || !formData.email || !formData.password || !formData.passwordConf )
    {
        return res.status(400); // Incomplete fields, send error
    }

    // Valid username?


    // Valid email?

    // Valid password? (conf matches?)
    if(formData.password !== formData.passwordConf)
    {
        return res.status(400);
    }

});

app.listen(process.env.PORT || PORT, _ => {
    console.log(`Server running on port ${PORT}`)
})

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