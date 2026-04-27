let userState = {
  registered: false,
  hasVoterId: false,
  knowsBooth: false,
  lastIntent: null,
  lastResponse: null
};

export function getState() {
  return userState;
}

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

export function setLastResponse(response) {
  userState.lastResponse = response;
}
