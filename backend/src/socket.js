import { Server } from "socket.io";

export const webSocket = (server) => {
  const io = new Server(server, {path: "/socket.io"});

  io.on("connection", (socket) => {
    socket.on("enter_room", (roomId, done) => {
      socket.join(roomId);
      done();
    });
  
    socket.on("send_message", (msg, roomId,) => {
      socket.broadcast.to(roomId).emit("send_message", msg);
    });
  });
};