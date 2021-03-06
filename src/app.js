// Packages
require("dotenv").config();
const path = require("path");
const express = require("express");
const axios = require("axios").default;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Controllers
const twitch = require("./controllers/twitch");
const github = require("./controllers/github");

// Default Configs
// const app = express();
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
app.get("/twitch-badges", (req, res) => {
  axios
    .get("https://badges.twitch.tv/v1/badges/global/display", {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((resp) => res.json(resp.data.badge_sets));
});

// GitHub
app.get("/github", github.getProjects(axios));
app.get("/github/:id", github.getProjectsById(axios));

io.on("connect", (socket) => {
  console.log("a user connect with id: ", socket.id);

  socket.on("sendMessage", (obj) => {
    console.log(obj);

    // Emit to frontend
    io.emit("sendMessage", obj);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected with id: ", socket.id);
  });
});

// Listening server
http.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    `Server start listening http://localhost:${process.env.EXPRESS_PORT}`
  );
});
