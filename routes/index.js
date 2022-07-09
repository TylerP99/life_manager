// Generic Route Handler

const express = require("express");
const router = express.Router();

// Landing page
router.get("/", (req, res) => {
    res.render("index.ejs");
});

//Dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs");
});

module.exports = router;