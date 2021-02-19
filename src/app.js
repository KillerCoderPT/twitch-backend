// Packages
require("dotenv").config();
const path = require("path");
const express = require("express");
const axios = require("axios").default;

// Controllers
const twitch = require("./controllers/twitch");
const github = require("./controllers/github");

// Default Configs
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

{
  /* Endpoints */
}
// Default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "twitch.html"));
});

// Twitch
app.get("/twitch-status", twitch.status(axios));
app.get("/twitch-status/:id", twitch.statusById(axios));

// GitHub
app.get("/github", github.getProjects(axios));
app.get("/github/:id", github.getProjectsById(axios));

// Listening server
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    `Server start listening http://localhost:${process.env.EXPRESS_PORT}`
  );
});
