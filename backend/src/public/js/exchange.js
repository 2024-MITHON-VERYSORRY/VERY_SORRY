const socket = io();

// DOM 요소 가져오기
const messagesContainer = document.getElementById("messages-container");
const sendButton = document.getElementById("send-exchange");
const input = document.getElementById("exchange-input");
const waitingMessage = document.getElementById("waiting-message");

let userMessage = ""; // 사용자가 입력한 메시지
let otherUserMessage = ""; // 상대방의 메시지를 저장할 변수
let isUserMessageSent = false; // 사용자가 메시지를 보냈는지 여부
let isOtherUserMessageReceived = false; // 상대방이 메시지를 보냈는지 여부

// 수신한 메시지를 화면에 표시하는 함수
function displayMessages() {
  messagesContainer.innerHTML = ""; // 이전 메시지 제거

  // 사용자의 메시지 표시
  if (userMessage) {
    const userMessageElement = document.createElement("div");
    userMessageElement.innerText = `나: ${userMessage}`; // 사용자의 메시지 추가
    messagesContainer.appendChild(userMessageElement);
  }

  // 상대방 메시지 표시
  if (otherUserMessage) {
    const otherUserMessageElement = document.createElement("div");
    otherUserMessageElement.innerText = `상대방: ${otherUserMessage}`; // 상대방 메시지 추가
    messagesContainer.appendChild(otherUserMessageElement);
  }
  if (userMessage && otherUserMessage) {
    console.log("Both messages sent, redirecting to exchange view.");
    window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([userMessage, otherUserMessage]))}`; // 페이지 이동
  }
}

// 메시지를 교환할 때 처리
sendButton.addEventListener("click", () => {
  userMessage = input.value; // 사용자의 메시지 저장

  if (userMessage) {
    console.log("Sending user message:", userMessage); // 로그 추가

    // 사용자의 메시지를 소켓을 통해 상대방에게 전송
    socket.emit("exchange_messages", { userMessage }); // 서버에 메시지 전송
    isUserMessageSent = true; // 사용자가 메시지를 보냈다고 표시
    waitingMessage.innerText = "상대방의 메시지를 기다리고 있습니다..."; // 대기 메시지 표시
    input.value = ""; // 입력 필드 비우기

    // 화면에 메시지 표시
    displayMessages();
  }
});

// 상대방의 메시지를 수신할 때 처리
socket.on("exchange_messages", (data) => {
  console.log("Received other user message:", data.userMessage); // 로그 추가
  otherUserMessage = data.userMessage; // 상대방 메시지 수신
  isOtherUserMessageReceived = true; // 상대방이 메시지를 보냈음을 표시
  displayMessages(); // 메시지 표시

  // 둘 다 메시지를 보냈을 때 결과 페이지로 이동
  if (isUserMessageSent && isOtherUserMessageReceived) {
    console.log("Both messages sent, redirecting to exchange view.");
    window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([userMessage, otherUserMessage]))}`; // 페이지 이동
  }
});

// 페이지 로드 시 메시지 표시
window.onload = displayMessages;
