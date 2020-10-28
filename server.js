// Budget API

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const budgetModel = require("./models/budgetSchema");

let url = "mongodb://localhost:27017/personalBudget";
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            console.log("Connected to the database");
            budgetModel.find({})
                        .then((data)=>{
                          console.log(data);
                          res.json(data);
                          mongoose.connection.close();
                        })
                        .catch((connectionError)=>{
                          console.log(connectionError);
                        })  
          })
          .catch((connectionError) => {
            console.log(connectionError);
          })
});

app.put("/add", (req, res) => {
  console.log(req.body);
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(()=>{
            console.log("Connected to the database");
            let addBudget = new budgetModel({
              title: req.body.title,
              budget: req.body.budget,
              color: req.body.color,
            });
            budgetModel.insertMany(addBudget)
                        .then((data)=> {
                          console.log(data);
                          res.json(data);
                          mongoose.connection.close();
                        })
                        .catch((connectionError)=>{
                          console.log(connectionError);
                        })  
          })
          .catch((connectionError) => {
            console.log(connectionError);
          })
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});