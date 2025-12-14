// main.js

import { Chat } from "./chat.js";
import { Assistant } from "./assistant.js";
import { recordOnce, blobToBase64 } from "./recorder.js";
import { loadTools } from "./tools/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadTools();

    const chatWindow = document.getElementById("chat-window");
    const chatInput  = document.getElementById("chat-input");
    const micButton  = document.getElementById("mic-button");

    const chat = new Chat(chatWindow);
    const assistant = new Assistant(chat);

    // ---- TEXT ----
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendText();
    });

    async function sendText() {
        const text = chatInput.value.trim();
        if (!text) return;

        chatInput.value = "";
        chat.addUserMessage(text);

        await assistant.processText(chat.buildPrompt());
    }

    // ---- RÖST ----
    micButton.addEventListener("click", async () => {
        micButton.textContent = "🎙️";

        const blob = await recordOnce(3000);
        const base64 = await blobToBase64(blob);

        micButton.textContent = "🎤";

        chat.addUserMessage("(tal skickat…)");

        await assistant.processAudio(chat.buildPrompt(), base64);
    });
});