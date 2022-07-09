const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

// Get user schema
const User = require("../models/User");

//==============================//
//      User Registration       //
//==============================//

//Registration Page
router.get("/signup", (req,res) => {
    res.render("signup");
});

//Registration Request
router.post("/user/signup", (req,res) => {
    // Get form data from request
    const userData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        passwordConfirmation:req.body.passwordConf,
    }

    const validation_obj = validate_user_info(userData)
    let valid = validation_obj.isValid;

    // If valid, create new db entry for user
    if(valid) {
        // Delete passwordConf from user object
        delete userData.passwordConfirmation;

        // Hash password
        bcrypt.hash(userData.password, saltRounds, (err, hash) => {
            // Save hashed password in object
            userData.password = hash;

            // Add user object to database
            db.collection(userCollection)
              .insertOne(userData)
              .then(result => {
                  console.log("Added user to database")
                  res.redirect("/signin")
              })
              .catch(err => console.error(err))
        });
    }
    else
    {
        // If invalid, provide some feedback for what is invalid
        console.log("Invalid")
        res.json(validation_obj.errorData);
    }
});

// Helper functions

function validate_user_info(user) {
    // Will return object with validation variable and other error info

    const validation_obj = {
        isValid:true,
        errorData:{
            usernameErrors:{
                emptyField:false,
            },
            emailErrors:{
                alreadyExists:false,
                emptyField:false,
            },
            passwordErrors:{
                emptyField:false,
                tooShort:false,
                doesNotMatchPasswordConf:false
            }
        }
    }

    // Check username field
    if(!user.email)
    {
        // Username field empty
        validation_obj.errorData.usernameErrors.emptyField = true;
        validation_obj.isValid = false;
    }

    // Check email field
    if(!user.email)
    {   
        // Email field empty
        validation_obj.errorData.emailErrors.emptyField = true;
        validation_obj.isValid = false;
    }
    else if(await User.findOne({"email":user.email}))
    {
        // Email in use
        validation_obj.errorData.emailErrors.alreadyExists = true;
        validation_obj.isValid = false;
    }

    // Check password fields
    if(!user.password)
    {
        // Password doesnt exist
        validation_obj.errorData.passwordErrors.emptyField = true;
        validation_obj.isValid = false;
    }
    else if(user.password.length < 8)
    {
        // Password too short
        validation_obj.errorData.passwordErrors.tooShort = true;
        validation_obj.isValid = false;
    }

    if(user.password !== user.passwordConf)
    {
        // Passwords dont match
        validation_obj.errorData.passwordErrors.doesNotMatchPasswordConf = true;
        validation_obj.isValid = false;
    }

    return validation_obj;
}

//==============================//
//        User Sign In          //
//==============================//

// Sign in page
router.get("/signin", (req, res) => {
    res.render("signin");
});

// Sign in request
router.post("/user/signin", passport.authenticate("local", {
        successRedirect:"/dashboard",
        failureRedirect:"/signin",
        failureFlash:true,
    })
);

//==============================//
//        User Sign Out         //
//==============================//

router.get("user/logout", (req, res) => {
    req.logout();
    req.flash('success_msg', "You have been logged out!")
});

module.exports(router);