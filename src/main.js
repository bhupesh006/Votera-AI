import './style.css';
import { detectIntent } from './logic/intentDetector.js';
import { getState, updateState, setLastResponse, setState, addMessageToHistory } from './logic/stateStore.js';
import { handleIntent } from './logic/decisionEngine.js';
import { rephrase as geminiRephrase } from './services/geminiService.js';
import { saveUserState, loadUserState } from './services/firebaseService.js';
import { renderMessage, toggleInputState, showTypingIndicator, removeTypingIndicator } from './components/chatInterface.js';

const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');

let sessionId = localStorage.getItem('votera_session_id');
if (!sessionId) {
  sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('votera_session_id', sessionId);
}

// Persisting user state using Firebase for session continuity
async function startApp() {
  try {
    const savedState = await loadUserState(sessionId);
    if (savedState) {
      setState(savedState);
      const state = getState();
      if (state.messages && state.messages.length > 0) {
        state.messages.forEach(msg => renderMessage(chatContainer, msg.role, msg.text));
        return; // Skip init message if history exists
      }
    }
  } catch (err) {
    console.warn("Could not load previous session:", err);
  }

  const initMessage = "I can help with voter registration, voter ID, polling booth location, and the voting process. What would you like to know?";
  renderMessage(chatContainer, 'assistant', initMessage);
  addMessageToHistory('assistant', initMessage);
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  renderMessage(chatContainer, 'user', text);
  addMessageToHistory('user', text);
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
    // Gemini is used strictly for response rephrasing to improve conversational quality
    const [finalMessage] = await Promise.all([
      geminiRephrase(rawResponse),
      new Promise(resolve => setTimeout(resolve, 800)) // Guarantee at least 800ms of animation
    ]);
    
    // 6. Render
    removeTypingIndicator();
    renderMessage(chatContainer, 'assistant', finalMessage);
    addMessageToHistory('assistant', finalMessage);

    // Save final state including messages
    await saveUserState(sessionId, getState());

  } catch (err) {
    console.error(err);
    removeTypingIndicator();
    renderMessage(chatContainer, 'assistant', 'System error encountered. Please try again.');
  }

  toggleInputState(userInput, submitBtn, false);
});

startApp();
