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
    res.render("dashboard.ejs");
});

//Task page
router.get("/tasks", ensureAuthenticated, async (req, res) => {
    // Get user tasks from db
    const tasks = await Task.find({userId:req.user.id});

    console.log(tasks);

    // Convert date values to something more readable
    const updatedTasks = tasks.map( x => {
        console.log("Editting task");
        let newStart = new Date_Formatter(x.startTime);
        newStart = newStart.get_date_and_time();

        let newEnd = new Date_Formatter(x.endTime);
        newEnd = newEnd.get_date_and_time();

        return {
            _id: x._id,
            name: x.name,
            description: x.description,
            startTime: newStart,
            endTime: newEnd,
            color: x.color,
            userId: x.userId
        };
    });

    console.log(updatedTasks)       


    // Render the page
    res.render("tasks.ejs", {tasks: updatedTasks, user: req.user});
});

router.get("/storagesystem", (req, res) => {
    res.render("storage.ejs");
});

module.exports = router;