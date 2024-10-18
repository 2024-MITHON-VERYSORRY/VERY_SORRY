const socket = io();

const room = document.getElementById("room");
const exchangeBtn = document.getElementById("exchange-btn");

room.hidden = false;

let roomId; // 방 ID를 저장
let userMessage = "";
let otherUserMessage = "";

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

  if (value.trim() === "") return; // 빈 메시지는 무시

  userMessage = value; // 현재 사용자 메시지 저장
  // 메시지를 해당 방에 전송
  socket.emit("exchange_messages", value, roomId, () => {
    addMessage(`You: ${value}`); // 메시지 화면에 추가
  });
  socket.emit("new_message", value, roomId, () => {
    addMessage(`나: ${value}`); // 메시지 화면에 추가
  });
  input.value = ""; // 입력 필드 초기화
}

// 방 보여주기
function showRoom() {
  room.hidden = false; // 채팅방 보이기
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ID: ${roomId}`; // 방 ID 표시
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit); // 메시지 제출 이벤트 리스너 추가
}

// 방 제출 처리
async function handleRoomSubmit(event) {
  event.preventDefault(); // 기본 폼 제출 방지
  // 서버에 방 생성 요청
  const response = await fetch("/create-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json(); // JSON 형식으로 응답 받기
  roomId = data.roomId; // 응답에서 roomId 추출
  // 서버에 방 ID 전송 후 방에 입장
  socket.emit("enter_room", roomId, showRoom);
}

// '완료' 버튼 클릭 시 페이지 이동
exchangeBtn.addEventListener("click", () => {
  window.location.href = `/exchange`; // 페이지 이동
});

// 상대방의 메시지를 받았을 때 처리
socket.on("exchange_messages", (messages) => {
  //otherUserMessage = messages.otherUserMessage;
  addMessage(`상대: ${messages}`);
});

//새로운 메시지 수신 처리
// socket.on("new_message", (msg) => {
//   addMessage(`Other: ${msg}`); // 상대방의 메시지를 화면에 추가
// });
// socket.emit("exchange_messages", value, roomId, () => {
//     addMessage(`Other: ${value}`); // 메시지 화면에 추가
//   });
//socket.on("exchange_messages", addMessage);

// 방 입장 처리
document.addEventListener("DOMContentLoaded", () => {
  const msgForm = room.querySelector("#msg");
  if (msgForm) {
    msgForm.addEventListener("submit", handleMessageSubmit); // 폼 이벤트 리스너 추가
  }
});
