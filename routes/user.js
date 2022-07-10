const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// Get user schema
const User = require("../models/User");

//Bcrypt config
const saltRounds = 10;

// Authentication middleware
const {ensureAuthenticated, forwardAuthenticated} = require("../config/auth");

//==============================//
//      User Registration       //
//==============================//

//Registration Page
router.get("/signup", forwardAuthenticated, (req,res) => {
    res.render("signup.ejs");
});

//==============================//
//        User Sign In          //
//==============================//

// Sign in page
router.get("/signin", forwardAuthenticated, (req, res) => {
    res.render("signin");
});

//==============================//
//        User Sign Out         //
//==============================//

router.get("user/logout", (req, res) => {
    console.log("Logging out");
    req.logout();
    req.flash('success_msg', "You have been logged out!");
});

module.exports = router;