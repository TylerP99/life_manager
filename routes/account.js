// Treat account system like a CRUD App
// Registration is a create
// Signin is a read (authenticate for sign in, read for basic account loading)
// Changing account info is an update
// Deleting account is a delete
// Handled on its own route to create separation from the /user route used to render the signup/signin pages

const express = require("express");
const router = express.Router();

// Create account
router.post("/create", (req, res) => {

});

// Authenticate
router.post("/authenticate")

module.exports = router;