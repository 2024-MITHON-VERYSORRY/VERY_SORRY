const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const exchangeBtn = document.getElementById("exchange-btn");
const waitingMessage = document.getElementById("waiting-message");

room.hidden = true;

let roomName;
let userMessage = "";
let otherUserMessage = "";
let isUserMessageSent = false; // 사용자가 메시지를 보냈는지 체크

// 메시지 추가 함수
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

// 메시지 제출 처리
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;

  userMessage = value; // 현재 사용자 메시지 저장
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

// 방 보여주기
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

// 방 제출 처리
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  socket.emit("enter_room", roomName, showRoom);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

// 교환 버튼 클릭 시 메시지 교환 페이지로 이동
exchangeBtn.addEventListener("click", () => {
  if (!isUserMessageSent) {
    // 사용자가 메시지를 보냈다면 교환 버튼 클릭 처리
    socket.emit("exchange_ready", roomName);
    isUserMessageSent = true; // 사용자 메시지 전송 플래그 설정
    waitingMessage.innerText = "상대방의 메시지를 기다리고 있습니다...";
  }
});

exchangeBtn.addEventListener("click", () => {
    window.location.href = `/exchange`; // 페이지이동
});

// 상대방의 메시지를 받았을 때 처리
socket.on("exchange_messages", (messages) => {
  otherUserMessage = messages.otherUserMessage;
  window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([userMessage, otherUserMessage]))}`; // 페이지 이동
});

// 새로운 메시지 수신 처리
socket.on("new_message", addMessage);
