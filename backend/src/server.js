import http from "http";
import path from 'path';
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/exchange", (_, res) => res.render("exchange"));
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
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });

  socket.on("exchange_messages", (messages) => {
    console.log(`Received exchange_messages: ${JSON.stringify(messages)}`); // 로그 추가
    socket.broadcast.emit("exchange_messages", messages); // 상대방에게 메시지 전송
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
