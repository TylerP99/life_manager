// Treat account system like a CRUD App
// Registration is a create
// Signin is a read (authenticate for sign in, read for basic account loading)
// Changing account info is an update
// Deleting account is a delete
// Handled on its own route to create separation from the /user route used to render the signup/signin pages

// Express and Router
const express = require("express");
const router = express.Router();


// Mongoose User Schema for db save and read
const User = require("../models/User");

//Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Passport for Authentication
const passport = require("passport");


//Registration Request
router.post("/create", async (req,res) => {
    // Get form data from request
    const userData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        passwordConfirmation:req.body.passwordConf,
    }

    const validation_obj = await validate_user_info(userData)
    let valid = validation_obj.isValid;

    // If valid, create new db entry for user
    if(valid) {
        // Delete passwordConf from user object
        delete userData.passwordConfirmation;

        // Hash password
        bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
            // Save hashed password in object
            userData.password = hash;

            // Add user object to database
            await User.create({name:userData.username, email:userData.email, password:userData.password});
            res.redirect("/user/signin");
        });
    }
    else
    {
        // If invalid, provide some feedback for what is invalid
        console.log("Invalid")
        console.log(validation_obj)
        res.json(validation_obj.errorData);
    }
});

// Helper functions

async function validate_user_info(user) {
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
    
    const userFromDb = await User.findOne({email:user.email})
    console.log(userFromDb);

    if(userFromDb)
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

    if(String(user.password) !== String(user.passwordConfirmation))
    {
        console.log(`Entered ${user.password} and ${user.passwordConfirmation}`)
        // Passwords dont match
        validation_obj.errorData.passwordErrors.doesNotMatchPasswordConf = true;
        validation_obj.isValid = false;
    }

    return validation_obj;
}

// Authenticate
router.post("/authenticate", passport.authenticate("local", {
    successRedirect:"/dashboard",
    failureRedirect:"/user/signin",
    failureFlash:true,
})
);

module.exports = router;