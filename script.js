const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const API_KEY = "AIzaSyA-j6wXZfFgFP2FiMDNrN2X59U6SbkFlJs";

sendBtn.addEventListener("click", async () => {
const userMessage = userInput.value.trim();
if (!userMessage) return;

// Display user message
appendMessage("User", userMessage);
userInput.value = "";

// Fetch AI response
appendMessage("Bot", "Typing...");
const response = await fetchAIResponse(userMessage);
chatbox.lastChild.textContent = response || "Error fetching response.";
});

function appendMessage(sender, message) {
const messageDiv = document.createElement("div");
messageDiv.textContent = `${sender}: ${message}`;
chatbox.appendChild(messageDiv);
}

async function fetchAIResponse(message) {
try {
const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${API_KEY}`,
},
body: JSON.stringify({
model: "gpt-3.5-turbo",
messages: [{ role: "user", content: message }],
}),
});
const data = await response.json();
return data.choices[0].message.content.trim();
} catch (error) {
console.error(error);
return null;
}
}