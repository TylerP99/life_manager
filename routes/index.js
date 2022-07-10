// Generic Route Handler

const express = require("express");
const router = express.Router();

// Landing page
router.get("/", (req, res) => {
    res.render("index.ejs");
});

//Dashboard
router.get("/dashboard", (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard.ejs");
});

//Task page
router.get("/tasks", (req, res) => {
    res.render("tasks.ejs")
});

module.exports = router;