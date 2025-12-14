# AI Assistant Web App

A simple AI assistant web app that takes audio input and responds with text using OpenRouter and Google Gemini 3.

## Features

- Record audio from microphone
- Send audio to AI model via OpenRouter
- Display text response from AI
- Client-side only, no backend required

## Setup

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Replace `YOUR_OPENROUTER_API_KEY` in `js/openrouter.js` with your actual key
3. Open `index.html` in a modern web browser

## Usage

1. Click "Start Recording"
2. Speak for 3 seconds
3. View the AI response

## Project Structure

- `index.html` - Main HTML page
- `css/app.css` - Styles
- `js/recorder.js` - Audio recording
- `js/openrouter.js` - API communication
- `js/assistant.js` - AI logic
- `js/main.js` - Main app logic

## Android App

To turn this into an Android app, place the files in the `www` folder and build with Capacitor.
