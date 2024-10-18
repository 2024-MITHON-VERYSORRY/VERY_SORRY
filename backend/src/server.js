import http from "http";
import path from 'path';
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";
import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성을 위한 UUID 라이브러리

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));

// 방 생성 페이지
app.get("/", (_, res) => res.render("home"));

// 방 생성 요청 처리 (POST 요청을 처리하여 roomId 반환)
app.post("/create-room", (_, res) => {
  const roomId = uuidv4(); // 새로운 고유 방 ID 생성
  res.json({ roomId }); // 생성된 roomId를 JSON 형식으로 반환
});

// 채팅방 페이지 (방 ID 포함)
app.get("/app/:roomId", (req, res) => {
  const { roomId } = req.params;
  res.render("app", { roomId }); // app.pug에서 roomId를 사용
});

// 메시지 결과 페이지
app.get("/exchange-view", (req, res) => {
  const messages = JSON.parse(req.query.messages);
  res.render("exchange-view", { messages });
});

// 모든 다른 요청은 홈으로 리디렉션
app.get("/*", (_, res) => res.redirect("/"));

// HTTP 서버 및 Socket.io 서버 설정
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

// Socket.io 연결 및 이벤트 처리
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
