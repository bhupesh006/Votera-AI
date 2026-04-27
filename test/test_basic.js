import { detectIntent } from '../src/logic/intentDetector.js';
import { handleIntent } from '../src/logic/decisionEngine.js';
import { updateState, getState, setState } from '../src/logic/stateStore.js';

console.log("Running Basic Tests...");

// --- A. Intent Detection Tests ---
const intentHowTo = detectIntent("how to vote");
console.assert(intentHowTo === "HOW_TO_VOTE", `Expected HOW_TO_VOTE, got ${intentHowTo}`);

const intentLocation = detectIntent("638505");
console.assert(intentLocation === "LOCATION_INPUT", `Expected LOCATION_INPUT, got ${intentLocation}`);

const intentFirstTime = detectIntent("first time voting");
console.assert(intentFirstTime === "FIRST_TIME_VOTER", `Expected FIRST_TIME_VOTER, got ${intentFirstTime}`);


// --- B. Decision Engine Tests ---
let testState = {
  registered: true,
  hasVoterId: false,
  knowsBooth: false,
  lastIntent: null,
  lastResponse: null
};
const registerResponse = handleIntent("REGISTER", "I want to register", testState);
console.assert(registerResponse.includes("already registered"), "Expected response to contain 'already registered'");

const locationResponse = handleIntent("LOCATION_INPUT", "638505", testState);
console.assert(locationResponse.includes("Government Higher Secondary School"), "Expected response to return the correct booth string");


// --- C. State Update Tests ---
// Reset state for testing updateState
setState({
  registered: false,
  hasVoterId: false,
  knowsBooth: false,
  lastIntent: null,
  lastResponse: null
});

updateState("CONFIRM_REGISTERED", "I have registered");
const currentState = getState();
console.assert(currentState.registered === true, "Expected state.registered to become true");


console.log("✅ All Basic Tests Passed!");
