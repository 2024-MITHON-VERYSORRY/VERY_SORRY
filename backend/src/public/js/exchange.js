// exchange.js
const socket = io();

// URL에서 메시지를 가져오기
const urlParams = new URLSearchParams(window.location.search);
const messages = JSON.parse(decodeURIComponent(urlParams.get("messages")));

const messagesContainer = document.getElementById("messages-container");
const sendButton = document.getElementById("send-exchange");
const input = document.getElementById("exchange-input");
const waitingMessage = document.getElementById("waiting-message");

let otherUserMessage = ""; // 상대방의 메시지를 저장할 변수
let isUserMessageSent = false; // 사용자가 메시지를 보냈는지 여부

// 수신한 메시지를 화면에 표시하는 함수
function displayMessages() {
  messagesContainer.innerHTML = ""; // 이전 메시지 제거

  if (!messages || !Array.isArray(messages)) {
    console.error("Messages is null or not an array:", messages);
    return; // 배열이 아니면 함수 종료
  }

  messages.forEach(message => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message; // 메시지 추가
    messagesContainer.appendChild(messageElement);
  });

  // 상대방 메시지 표시
  if (otherUserMessage) {
    const otherUserMessageElement = document.createElement("div");
    otherUserMessageElement.innerText = `상대방: ${otherUserMessage}`; // 상대방 메시지 추가
    messagesContainer.appendChild(otherUserMessageElement);
  }
}

// 메시지를 교환할 때 처리
sendButton.addEventListener("click", () => {
  const userMessage = input.value;

  if (userMessage) {
    // 사용자의 메시지를 소켓을 통해 상대방에게 전송
    socket.emit("exchange_messages", { userMessage }); // 서버에 메시지 전송
    isUserMessageSent = true; // 사용자가 메시지를 보냈다고 표시
    waitingMessage.innerText = "상대방의 메시지를 기다리고 있습니다..."; // 대기 메시지 표시
    input.value = ""; // 입력 필드 비우기
  }
});

// 상대방의 메시지를 수신할 때 처리
socket.on("exchange_messages", (data) => {
  otherUserMessage = data.userMessage; // 상대방 메시지 수신
  displayMessages(); // 메시지 표시

  // 둘 다 메시지를 보냈을 때 결과 페이지로 이동
  if (isUserMessageSent && otherUserMessage) {
    window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([data.userMessage, otherUserMessage]))}`; // 페이지 이동
  }
});

// 페이지 로드 시 메시지 표시
window.onload = displayMessages;
