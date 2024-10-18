import http from "http";
import path from 'path';
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/exchange", (_, res) => res.render("exchange"));



app.post("/create-room", (_, res) => {
  const roomId = uuidv4();
  res.json({ roomId });
});

app.get("/app/:roomId", (req, res) => {
  const { roomId } = req.params;
  res.render("app", { roomId });
});


app.get("/exchange-view", (req, res) => {
  const messages = JSON.parse(req.query.messages);
  res.render("exchange-view", { messages });
});

app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomId, done) => {
    socket.join(roomId);
    done();
  });

  socket.on("new_message", (msg, roomId, done) => {
    socket.to(roomId).emit("new_message", msg);
    done();
  });

  socket.on("exchange_messages", (messages) => {
    console.log(`Received exchange_messages: ${JSON.stringify(messages)}`);
    socket.broadcast.emit("exchange_messages", messages);
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
