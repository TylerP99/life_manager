//Mongoose tasks schema

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    color: {
        type: String,
        default: "#000"
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;