// Generic Route Handler

const express = require("express");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const router = express.Router();

const Task = require("../models/Task");

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
    // Render the page
    res.render("tasks.ejs", {tasks: tasks});
});

module.exports = router;