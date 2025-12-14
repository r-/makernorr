// assistant.js

import { sendAudioToAI, sendTextToAI } from "./openrouter.js";
import { TOOL_SCHEMA_MAP, TOOL_RUNNERS } from "./tools/index.js";
import { validateToolUse } from "./tools/validate.js";

export class Assistant {
    constructor(chat) {
        this.chat = chat;
    }

    async processText(history) {
        const thinkingId = this.showThinking();
        try {
            const result = await sendTextToAI(history);
            await this.handleResult(result, thinkingId);
        } catch (error) {
            this.removeThinking(thinkingId);
            this.chat.addAIMessage("Fel: " + error.message);
        }
    }

    async processAudio(history, audioBase64) {
        const thinkingId = this.showThinking();
        try {
            const result = await sendAudioToAI(history, audioBase64);
            await this.handleResult(result, thinkingId);
        } catch (error) {
            this.removeThinking(thinkingId);
            this.chat.addAIMessage("Fel: " + error.message);
        }
    }

    async handleResult(result, thinkingId) {
        console.log("AI result:", result);
        this.removeThinking(thinkingId);
        this.chat.addAIMessage(result.response);

        if (!result.tool_use) return;

        console.log("Tool use:", result.tool_use);
        const check = validateToolUse(result.tool_use, TOOL_SCHEMA_MAP);
        console.log("Validation check:", check);
        if (!check.ok) {
            this.chat.addAIMessage("(Ogiltigt verktyg: " + check.error + ")");
            return;
        }

        const { name, args } = result.tool_use;
        await TOOL_RUNNERS[name](args);
    }

    showThinking() {
        const id = Date.now().toString();
        const div = document.createElement("div");
        div.className = "message ai thinking";
        div.id = "thinking-" + id;
        div.innerHTML = '<span class="dots">Tänker</span><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
        this.chat.chatWindow.appendChild(div);
        this.chat.chatWindow.scrollTop = this.chat.chatWindow.scrollHeight;
        return id;
    }

    removeThinking(id) {
        const thinkingDiv = document.getElementById("thinking-" + id);
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }
}