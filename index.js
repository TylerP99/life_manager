const express = require("express");
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect()

const app = express();
app.set("view engine","ejs");

const dbName = "idk";
const dbConnectionString = process.env.DB_STRING;


app.get("/tasks", (req, res) => {
    //Get task data from db

    //Format for ejs

    //Render ejs
});

app.post("/create/task", (req, res) => {
    //Validate info

    //Format for db

    //Add to db (user func comes next)
});