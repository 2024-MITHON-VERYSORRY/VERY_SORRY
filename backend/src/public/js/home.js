const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const exchangeBtn = document.getElementById("exchange-btn");
const roomIdElement = document.getElementById("room-id");
const waitingMessage = document.getElementById("waiting-message");

room.hidden = true;

let roomName; // 방 ID를 저장할 변수

// 방 ID를 생성하고 보여주는 함수
function generateRoomId() {
  const roomId = Math.random().toString(36).substring(2, 10); // 간단한 랜덤 ID 생성
  roomIdElement.innerText = roomId; // 방 ID 표시
  return roomId;
}

// 방 생성 처리
function handleRoomSubmit(event) {
  event.preventDefault();
  roomName = generateRoomId(); // 방 ID 생성
  socket.emit("enter_room", roomName, showRoom);
}

// 방 보여주기
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
}

// 방 제출 처리 이벤트 리스너 추가
form.addEventListener("submit", handleRoomSubmit);

// 채팅방으로 이동 버튼 클릭 처리
exchangeBtn.addEventListener("click", () => {
  if (roomName) {
    window.location.href = `/app/${roomName}`; // 방 ID를 포함한 URL로 이동
  }
});
