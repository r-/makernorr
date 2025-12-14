# AI Chat Agent with Tools

A complete AI chat application with text and voice input, conversation memory, and tool execution capabilities. The AI can perform actions like dancing when requested.

## Features

- **Text Chat**: Type messages and get AI responses
- **Voice Input**: Record audio and get transcribed responses
- **Conversation Memory**: Maintains context across messages
- **Tool Execution**: AI can use tools like "dance" to perform actions
- **Visual Feedback**: Thinking animation during API calls
- **Responsive Design**: Works on desktop and mobile

## Setup

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Replace `YOUR_API_KEY_HERE` in `js/openrouter.js` with your key
3. Open `index.html` in a modern web browser

## Usage

- **Text**: Type a message and press Enter
- **Voice**: Click the microphone button and speak for 3 seconds
- **Tools**: Ask the AI to "dance" to see tool execution

## Project Structure

```
www/
├── index.html                 # Main HTML with chat UI
├── css/
│   └── app.css               # Styles including chat bubbles and animations
├── js/
│   ├── main.js               # App initialization and UI event handlers
│   ├── chat.js               # Chat history and message rendering
│   ├── assistant.js          # AI processing and tool execution
│   ├── openrouter.js         # OpenRouter API communication
│   ├── recorder.js           # Audio recording (WAV format)
│   └── tools/                # Tool system
│       ├── tools.json        # Tool manifest
│       ├── index.js          # Tool loading and management
│       ├── validate.js       # Tool validation
│       └── dance/            # Dance tool
│           ├── schema.js     # Tool description for AI
│           └── tool.js       # Tool implementation
└── README.md
```

## Tool System

The app includes a modular tool system where the AI can execute actions:

- **Dance Tool**: Makes the app wiggle when the AI decides to dance
- **Extensible**: Easy to add new tools by creating subdirectories

Tools are loaded dynamically and validated for security.

## Android App

To create an Android app:

1. Place files in `/www` folder
2. Use Capacitor to build the app
3. Follow guides for Windows/Linux deployment
### Windows:
https://maker.nu/din-forsta-android-app-windows-version/
### Linux:
https://maker.nu/din-forsta-android-app-linux-version/

## Architecture

- **Sense**: User input (text/voice)
- **Think**: AI processes with tool awareness
- **Act**: AI executes validated tools

With this we intend to implement a complete a simple AI agent loop.
