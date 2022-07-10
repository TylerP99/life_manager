//This is the leading interface for anything that changes the database (ie accounts, tasks, etc)
const express = require("express");
const router = express.Router();


// Account route
router.use("/account", require("./api/account.js"));

// Task route
router.use("/task", require("./api/task.js"));


module.exports = router;