// openrouter.js

import { buildToolsForPrompt } from "./tools/index.js";

export const OPENROUTER_API_KEY = "YOUR_OPENROUTER_API_KEY"; // dev only – do NOT ship this in production

export function getSystemPrompt() {
  return `
Du är en hjälpsam assistent.

Du har tillgång till följande verktyg:
${buildToolsForPrompt()}

Regler:
- Svara ALLTID med JSON: { "response": string, "tool_use": object|null }
- Om du använder ett verktyg, använd EXAKT detta format för tool_use: { "name": "verktygsnamn", "args": { "param": "värde" } }
- Kör max ett verktyg per svar
- Skriv inget utanför JSON
`;
}

// ----- TEXT -----
export async function sendTextToAI(history) {
  return await callAI(history);
}

// ----- AUDIO -----
export async function sendAudioToAI(history, audioBase64) {
  return await callAI(history, audioBase64);
}

// ----- GENERELL FUNKTION -----
async function callAI(history, audioBase64 = null) {
  const messages = [
    {
      role: "system",
      content: getSystemPrompt()
    },
    ...history
  ];

  if (audioBase64) {
    messages.push({
      role: "user",
      content: [
        { type: "text", text: "Tolkar tal:" },
        {
          type: "input_audio",
          input_audio: {
            data: audioBase64,
            format: "wav"
          }
        }
      ]
    });
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
      stream: false
    })
  });

  const raw = await res.text();
  if (!res.ok) throw new Error(raw);

  const data = JSON.parse(raw);
  let content = data.choices[0].message.content;

  if (Array.isArray(content)) {
    const block = content.find(x => x.type === "text");
    content = block?.text ?? "";
  }

  console.log("AI raw text content:", content);
  content = content.replace(/^```json\s*/, "").replace(/```$/, "");
  console.log("Cleaned content:", content);
  return JSON.parse(content);

}
