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
    let error = "";

    console.log(req.session);

    if(req.session.messages != undefined)
    {
        error = req.session.messages[0];
    }

    res.render("signin", {error});
});

//==============================//
//        User Sign Out         //
//==============================//

router.get("user/logout", (req, res) => {
    req.logout();
});

module.exports = router;