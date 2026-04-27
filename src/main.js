import './style.css';
import { detectIntent } from './logic/intentDetector.js';
import { getState, updateState, setLastResponse } from './logic/stateStore.js';
import { handleIntent } from './logic/decisionEngine.js';
import { rephrase } from './services/geminiService.js';
import { renderMessage, toggleInputState, showTypingIndicator, removeTypingIndicator } from './components/chatInterface.js';

const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');

function startApp() {
  const initMessage = "I can help with voter registration, voter ID, polling booth location, and the voting process. What would you like to know?";
  renderMessage(chatContainer, 'assistant', initMessage);
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  renderMessage(chatContainer, 'user', text);
  userInput.value = '';
  toggleInputState(userInput, submitBtn, true);

  try {
    // Show premium animation
    showTypingIndicator(chatContainer);

    // 1. Detect Intent
    const intent = detectIntent(text);

    // 2. Update State
    updateState(intent, text);
    const userState = getState();

    // 3. Handle Intent (Decision Engine)
    let rawResponse = handleIntent(intent, text, userState);

    // 4. Anti-Repetition Guard
    if (rawResponse === userState.lastResponse) {
      rawResponse = "Let's move forward. What would you like to do next?";
    }
    setLastResponse(rawResponse);

    // 5. Gemini Rephrase + Artificial UX Delay for animation feel
    const [finalMessage] = await Promise.all([
      rephrase(rawResponse),
      new Promise(resolve => setTimeout(resolve, 800)) // Guarantee at least 800ms of animation
    ]);
    
    // 6. Render
    removeTypingIndicator();
    renderMessage(chatContainer, 'assistant', finalMessage);

  } catch (err) {
    console.error(err);
    removeTypingIndicator();
    renderMessage(chatContainer, 'assistant', 'System error encountered. Please try again.');
  }

  toggleInputState(userInput, submitBtn, false);
});

startApp();
