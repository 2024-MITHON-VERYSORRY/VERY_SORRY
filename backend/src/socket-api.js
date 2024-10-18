// socket-api.js
import { Server } from "socket.io";

const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  console.log("새로운 사용자 접속");

//   socket.on("exchange_messages", (data) => {
//     // 메시지를 보낸 사용자에게서 다른 사용자에게 전송
//     socket.broadcast.emit("exchange_messages", data); // 모든 클라이언트에게 메시지 전송
//   });

    socket.on("exchange_ready", (roomName) => {
    // 해당 방의 모든 소켓에게 메시지 전송
    socket.to(roomName).emit("exchange_messages", { otherUserMessage });
  });
});
