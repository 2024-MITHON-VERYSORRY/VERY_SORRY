const socket = io();

const messagesContainer = document.getElementById("messages-container");
const sendButton = document.getElementById("send-exchange");
const input = document.getElementById("exchange-input");
const waitingMessage = document.getElementById("waiting-message");

let userMessage = ""; 
let otherUserMessage = ""; 
let isUserMessageSent = false; 
let isOtherUserMessageReceived = false; 

function displayMessages() {
  messagesContainer.innerHTML = "";

  if (userMessage) {
    const userMessageElement = document.createElement("div");
    userMessageElement.innerText = `나: ${userMessage}`; 
    messagesContainer.appendChild(userMessageElement);
  }

  if (otherUserMessage) {
    const otherUserMessageElement = document.createElement("div");
    otherUserMessageElement.innerText = `상대방: ${otherUserMessage}`;
    messagesContainer.appendChild(otherUserMessageElement);
  }
  if (userMessage && otherUserMessage) {
    console.log("Both messages sent, redirecting to exchange view.");
    window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([userMessage, otherUserMessage]))}`; // 페이지 이동
  }
}

sendButton.addEventListener("click", () => {
  userMessage = input.value;

  if (userMessage) {
    console.log("Sending user message:", userMessage);


    socket.emit("exchange_messages", { userMessage });
    isUserMessageSent = true; 
    waitingMessage.innerText = "상대방의 메시지를 기다리고 있습니다...";
    input.value = "";

    displayMessages();
  }
});

socket.on("exchange_messages", (data) => {
  console.log("Received other user message:", data.userMessage);
  otherUserMessage = data.userMessage;
  isOtherUserMessageReceived = true;
  displayMessages();

  if (isUserMessageSent && isOtherUserMessageReceived) {
    console.log("Both messages sent, redirecting to exchange view.");
    window.location.href = `/exchange-view?messages=${encodeURIComponent(JSON.stringify([userMessage, otherUserMessage]))}`; // 페이지 이동
  }
});

// 페이지 로드 시 메시지 표시
window.onload = displayMessages;
