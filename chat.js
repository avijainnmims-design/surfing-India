const chatLaunch = document.querySelector(".chat-launch");
const chatPanel = document.querySelector("#surf-chat-panel");
const chatClose = document.querySelector(".chat-close");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");
const chatStatus = document.querySelector("#chat-status");
const chatSend = document.querySelector(".chat-send");
const conversation = [];

function setChatOpen(open) {
  chatPanel.hidden = !open;
  chatLaunch.setAttribute("aria-expanded", String(open));
  if (open) chatInput.focus();
  else chatLaunch.focus();
}

function addBubble(text, kind) {
  const bubble = document.createElement("p");
  bubble.className = `chat-bubble ${kind}`;
  bubble.textContent = text;
  chatMessages.append(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

async function sendChatMessage() {
  const question = chatInput.value.trim();
  if (!question || chatSend.disabled) return;

  addBubble(question, "user");
  conversation.push({ role: "user", content: question });
  chatInput.value = "";
  chatSend.disabled = true;
  chatInput.disabled = true;
  chatStatus.textContent = "GPT-6 Luna is thinking…";
  const thinking = addBubble("Thinking…", "assistant");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation.slice(-12) }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Chat is temporarily unavailable.");

    thinking.textContent = data.reply;
    conversation.push({ role: "assistant", content: data.reply });
    chatStatus.textContent = "AI answers can be wrong. Check conditions and details locally.";
  } catch (error) {
    thinking.classList.add("error");
    thinking.textContent = error.message || "Chat is temporarily unavailable. Please try again.";
    conversation.pop();
    chatStatus.textContent = "Your question wasn’t sent. Please try again.";
  } finally {
    chatSend.disabled = false;
    chatInput.disabled = false;
    chatInput.focus();
  }
}

chatLaunch.addEventListener("click", () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener("click", () => setChatOpen(false));
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendChatMessage();
});
chatInput.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});
document.querySelectorAll(".chat-suggestions [data-prompt]").forEach(button => {
  button.addEventListener("click", () => {
    chatInput.value = button.dataset.prompt;
    chatForm.requestSubmit();
  });
});

