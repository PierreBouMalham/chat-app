const express = require("express");
const cors = require("cors");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1780502",
  key: "6e33d52e619ff33d3853",
  secret: "a8f614f5bd68a2f9417f",
  cluster: "ap2",
  useTLS: true,
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080", //node.js
      "http://localhost:4200", //angular
    ],
  })
);

app.use(express.json());
app.post("/api/messages", async (req, resp) => {
  await pusher.trigger("my-channel", "message", {
    username: req.body.username,
    message: req.body.message,
  });

  resp.json([]);
});

app.listen(8000);
