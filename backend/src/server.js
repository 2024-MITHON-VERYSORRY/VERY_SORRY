import express from "express";
import {webSocket} from "./socket.js";
import path from "path";

const app = express();

const __dirname = path.resolve(); // pwd

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/src/views"));

// 방 생성 페이지
app.get("/", (_, res) => res.render("home"));

// 방 생성 요청 처리 - roomId 반환
app.get("/create-room", (_, res) => {
  const roomId = Math.random().toString(36).substring(2, 8);;
  console.log(`Room created with ID: ${roomId}`);
  res.redirect(`/room/${roomId}`);
});

// 채팅방 페이지
app.get("/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  console.log(`enter room : ${roomId}`);
  res.render("room", {roomId});
});

app.get("/*", (_, res) => res.redirect("/"));

const server = app.listen(3000, ()=>{
  console.log('listening on 3000');
});

webSocket(server);