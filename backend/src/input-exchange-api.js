export default function inputExchangeApi(wsServer) {
  wsServer.on("connection", (socket) => {
    socket.on("exchange_message", (message, room) => {
      // 같은 방에 있는 모든 사용자에게 메시지 전송
      socket.to(room).emit("exchange_message", message);
    });
  });
}
