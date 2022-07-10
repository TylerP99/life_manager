// Handles routes for tasks crud app

const express = require("express");
const router = express.Router();

// User Schema
const User = require("../../models/User");

// Task Schema
const Task = require("../../models/Task");

// Create task
router.post("/create", async (req, res) => {
    // Get task info from request
    const reqName = req.body.taskName || "New Task";
    const reqDesc = req.body.taskDescription || "";
    const reqStart = new Date(req.body.taskStartTime);
    const reqEnd = new Date(req.body.taskEndTime);
    const reqColor = req.body.taskColor;
    const task = {
        name:reqName,
        description:reqDesc,
        startTime:reqStart,
        endTime:reqEnd,
        color:reqColor
    }

    // Validate Info
    const valid = validate_new_task(task);

    if(valid)
    {
        //If valid, save task to db
        await Task.create(task);
        res.redirect("/tasks")
    }
    else
    {
        //Else, tell user task failed to be created
    }
});

function validate_new_task(task)
{
    return true;
}

module.exports = router;