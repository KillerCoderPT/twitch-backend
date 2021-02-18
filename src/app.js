// Packages
require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

// Controllers
const twitch = require("./controllers/twitch");

// Default Configs
const app = express();
app.use(express.json());

{
  /* Endpoints */
}
// Default
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// Twitch
app.get("/twitch-status", twitch.status(axios));
app.get("/twitch-status/:id", twitch.statusById(axios));

// Listening server
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    `Server start listening http://localhost:${process.env.EXPRESS_PORT}`
  );
});
