const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// Get user schema
const User = require("../models/User");

//Bcrypt config
const saltRounds = 10;

//==============================//
//      User Registration       //
//==============================//

//Registration Page
router.get("/signup", (req,res) => {
    res.render("signup.ejs");
});

//==============================//
//        User Sign In          //
//==============================//

// Sign in page
router.get("/signin", (req, res) => {
    res.render("signin");
});

//==============================//
//        User Sign Out         //
//==============================//

router.get("user/logout", (req, res) => {
    req.logout();
    req.flash('success_msg', "You have been logged out!")
});

module.exports = router;