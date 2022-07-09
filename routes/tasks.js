// Handles routes for tasks crud app

const express = require("express");
const router = express.Router();


//============================================================================================================//
//
// Tasks Page/Route
//
// Read tasks
router.get("/tasks", (req, res) => {
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
router.post("/create/task", (req, res) => {
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

module.exports = router;