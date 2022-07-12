// Handles routes for tasks crud app

const express = require("express");
const router = express.Router();

// User Schema
const User = require("../../models/User");

// Task Schema
const Task = require("../../models/Task");

// Auth middleware
const { ensureAuthenticated } = require("../../config/auth");

// Create task
router.post("/create", ensureAuthenticated, async (req, res) => {
    // Get task info from request
    const reqName = req.body.taskName || "New Task";
    const reqDesc = req.body.taskDescription || "";
    const reqStart = new Date(req.body.taskStartTime);
    const reqEnd = new Date(req.body.taskEndTime);
    const reqColor = req.body.taskColor || "#000000";
    const task = {
        name:reqName,
        description:reqDesc,
        startTime:reqStart,
        endTime:reqEnd,
        color:reqColor,
        userId: req.user.id
    }

    console.log(typeof req.body.taskStartTime);

    // Validate Info
    const valid = validate_new_task(task);

    if(valid)
    {
        //If valid, save task to db
        await Task.create(task);
        res.redirect("/tasks");
    }
    else
    {
        //Else, tell user task failed to be created
    }
});

// Update task
router.put("/update", ensureAuthenticated, async (req, res) => {
    const taskId = req.body.taskId;

    console.log(`Put request on task number ${taskId}`);

    const updateTask = await Task.findByIdAndUpdate(
                                // The id
                                taskId,
                                // The changes
                                req.body.newTask,
                                // Return updated?
                                {new: true}
                            );
    console.log(updateTask);

    res.json("Updated");
});

// Delete task
router.delete("/delete", ensureAuthenticated, async (req, res) => {
    const taskId = req.body.taskId;
    console.log("ATTEMPTING")
    try
    {
        const delet = await Task.findByIdAndDelete(taskId);
        console.log(delet);
        res.json("Deleted successfully")
    }
    catch (e)
    {
        console.error(e);
        res.json("Not deleted")
    }
});

function validate_new_task(task)
{
    return true;
}

module.exports = router;