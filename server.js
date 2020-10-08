// Budget API

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use("/", express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

const budget = require("./budgetData.json");

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
