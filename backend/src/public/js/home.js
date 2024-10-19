const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const exchangeBtn = document.getElementById("exchange-btn");
const roomIdElement = document.getElementById("room-id");
const waitingMessage = document.getElementById("waiting-message");

room.hidden = true;

let roomName;

function generateRoomId() {
  const roomId = Math.random().toString(36).substring(2, 10);
  roomIdElement.innerText = roomId;
  return roomId;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  roomName = generateRoomId(); 
  socket.emit("enter_room", roomName, showRoom);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
}

form.addEventListener("submit", handleRoomSubmit);

exchangeBtn.addEventListener("click", () => {
  if (roomName) {
    window.location.href = `/app/${roomName}`; 
  }
});
