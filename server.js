import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-type"],
  },
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error connecting to DB", err));

//middlewares
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// io.on("connect", (socket) => {
//   //console.log(`SOCKET.IO`, socket.id));
//   socket.on("send-message", (message) => {
//     // console.log("new message received", message);
//     socket.broadcast.emit("receive-msg", message);
//   });
// });

io.on("connect", (socket) => {
  //console.log(`SOCKET.IO`, socket.id));
  socket.on("new-post", (newPost) => {
    //console.log("new message received", newPost);
    socket.broadcast.emit("new-post", newPost);
  });
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server is flying`));
