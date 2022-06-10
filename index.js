const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const dbName = "tasks";
const dbConnectionString = process.env.DB_STRING;
let db;
const PORT = 3000;

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

app.post("/create/task", (req, res) => {
    //Info should be valid if user sent it, validate on client side please
    const reqName = req.body.taskName;
    const reqDesc = req.body.taskDescription;
    const reqStart = req.body.taskStartTime;
    const reqEnd = req.body.taskEndTime;
    const reqColor = req.body.taskEndTime;
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