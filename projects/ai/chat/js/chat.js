// chat.js

export class Chat {
    constructor(chatWindow) {
        this.chatWindow = chatWindow;
        this.history = [];
    }

    addUserMessage(text) {
        this.history.push({ role: "user", content: text });
        this.renderMessage("user", text);
    }

    addAIMessage(text) {
        this.history.push({ role: "assistant", content: text });
        this.renderMessage("ai", text);
    }

    renderMessage(role, text) {
        const div = document.createElement("div");
        div.className = `message ${role}`;
        div.textContent = text;
        this.chatWindow.appendChild(div);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    }

    buildPrompt() {
        return this.history.map(m => ({
            role: m.role,
            content: m.content
        }));
    }
}