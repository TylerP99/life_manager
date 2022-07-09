const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");


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

    const errorData = {
        usernameErrors:{
            empty:false,
        },
        emailErrors:{
            empty:false,
            alreadyExists:false,
        },
        passwordErrors:{
            empty:false,
            short:false,
            mismatchConf:false,
        }
    }

    let valid = true;

    // Validate form info
    // Validate name
    if(!userData.username)
    {
        // No name entered
        errorData.usernameErrors.empty = true;
        valid = false;
    }

    // Validate email
    // Confirmation email? Best way to validate i guess
    // Ensure email is unique
    if(!userData.email)
    {
        // No email entered
        errorData.emailErrors.empty = true;
        valid = false;
    }
    const emailExists = await db.collection(userCollection)
                          .findOne( {"email": userData.email});

    console.log(emailExists);
    if(emailExists)
    {
        console.log("email exists")
        errorData.emailErrors.alreadyExists = true;
        valid = false;
    }


    // Validate password
    // 8 char minimum
    // PasswordConf matches
    if(!userData.password)
    {
        // No password entered
        errorData.passwordErrors.empty = true;
        valid = false;
    }
    else if(userData.password.length < 8)
    {
        // Password too short
        errorData.passwordErrors.short = true;
        valid = false;
    }

    if(userData.password !== userData.passwordConfirmation)
    {
        // Passwords dont match
        errorData.passwordErrors.mismatchConf = true;
        valid = false;
    }

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
                  res.redirect("/html/signin.html")
              })
              .catch(err => console.error(err))
        });
    }
    else
    {
        // If invalid, provide some feedback for what is invalid
        console.log("Invalid")
        res.json(errorData);
    }
});

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