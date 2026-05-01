let userState = {
  registered: false,
  hasVoterId: false,
  knowsBooth: false,
  lastIntent: null,
  lastResponse: null,
  messages: []
};

/**
 * Retrieves the current global user state.
 * @returns {Object} The current userState object.
 */
export function getState() {
  return userState;
}

/**
 * Updates the user state based on the detected intent.
 * @param {string} intent - The detected intent key.
 * @param {string} input - The raw user input.
 */
export function updateState(intent, input) {
  // Use explicitly parsed intents to map to boolean memory safely
  if (intent === "CONFIRM_REGISTERED") {
    userState.registered = true;
  }
  if (intent === "CONFIRM_HAS_ID") {
    userState.hasVoterId = true;
  }
  if (intent === "CONFIRM_KNOWS_BOOTH") {
    userState.knowsBooth = true;
  }

  userState.lastIntent = intent;
}

/**
 * Stores the last response sent by the assistant to prevent repetition.
 * @param {string} response - The response text.
 */
export function setLastResponse(response) {
  userState.lastResponse = response;
}

/**
 * Overwrites the global state with a new state object (used during Firebase loading).
 * @param {Object} newState - The new state object.
 */
export function setState(newState) {
  if (newState) {
    userState = { ...userState, ...newState };
  }
}

/**
 * Adds a message to the persistent chat history.
 * @param {string} role - 'user' or 'assistant'.
 * @param {string} text - The message content.
 */
export function addMessageToHistory(role, text) {
  userState.messages.push({ role, text });
}
