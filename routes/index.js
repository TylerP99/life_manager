// Generic Route Handler

const express = require("express");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const router = express.Router();

const Task = require("../models/Task");

const Date_Formatter = require("../config/date-formatter.js")

// Landing page
router.get("/", forwardAuthenticated, (req, res) => {
    res.render("index.ejs");
});

//Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("dashboard.ejs", {user: req.user});
});

//Task page
router.get("/tasks", ensureAuthenticated, async (req, res) => {
    // Get user tasks from db
    const tasks = await Task.find({userId:req.user.id});
    // Convert date values to something more readable
    const updatedTasks = tasks.map( x => {
        let newStart = new Date_Formatter(x.startTime);

        let newEnd = new Date_Formatter(x.endTime);

        return {
            _id: x._id,
            name: x.name,
            description: x.description,
            startDate: newStart.date,
            startTime: newStart.time,
            endDate: newEnd.date,
            endTime: newEnd.time,
            color: x.color,
            userId: x.userId
        };
    });
     


    // Render the page
    res.render("tasks.ejs", {tasks: updatedTasks, user: req.user});
});

module.exports = router;