// Generic Route Handler

const express = require("express");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const router = express.Router();

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
router.get("/tasks", ensureAuthenticated, (req, res) => {
    res.render("tasks.ejs")
});

module.exports = router;