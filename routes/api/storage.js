// Storage Management API Operations

// Will first make edits to a staging area, which will then make edits to the database

// Connect to api route
const express = require("express");
const router = express.Router();

// Auth middleware
const { ensureAuthenticated } = require("../../config/auth");

module.exports = router;