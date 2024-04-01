const express = require("express");
const cors = require("cors");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1780513",
  key: "7ff2c0dcef76941a4235",
  secret: "42bac83f1a76d76a67b0",
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
