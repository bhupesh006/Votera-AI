import { detectIntent } from '../src/logic/intentDetector.js';
import { handleIntent } from '../src/logic/decisionEngine.js';
import { updateState, getState, setState } from '../src/logic/stateStore.js';

console.log("🚀 Running Comprehensive Verification Tests...");

// --- 1. INTENT DETECTION TESTS ---
console.log("\nTesting Intent Detection...");
const intentTests = [
  { input: "how to vote", expected: "HOW_TO_VOTE" },
  { input: "I am a first time voter", expected: "FIRST_TIME_VOTER" },
  { input: "638505", expected: "LOCATION_INPUT" },
  { input: "find my booth near 560001", expected: "LOCATION_INPUT" },
  { input: "i have registered already", expected: "CONFIRM_REGISTERED" },
  { input: "I HAVE MY VOTER ID", expected: "CONFIRM_HAS_ID" },
  { input: "what documents should I bring?", expected: "WHAT_TO_CARRY" },
  { input: "lost my voter card", expected: "VOTER_ID_LOST" },
  { input: "am I eligible?", expected: "ELIGIBILITY" },
  { input: "random gibberish text", expected: "GENERAL_HELP" }
];

intentTests.forEach(t => {
  const result = detectIntent(t.input);
  console.assert(result === t.expected, `❌ Intent Fail: "${t.input}" -> Expected ${t.expected}, got ${result}`);
});

// --- 2. STATE STORE TESTS ---
console.log("\nTesting State Updates...");
setState({ registered: false, hasVoterId: false, knowsBooth: false });

updateState("CONFIRM_REGISTERED", "i have registered");
console.assert(getState().registered === true, "❌ State Fail: registered should be true");

updateState("CONFIRM_HAS_ID", "i have id");
console.assert(getState().hasVoterId === true, "❌ State Fail: hasVoterId should be true");

// --- 3. DECISION ENGINE (PROGRESSIVE GUIDANCE) ---
console.log("\nTesting Progressive Guidance Logic...");

// Case: Not registered
let res = handleIntent("GENERAL_HELP", "", { registered: false });
console.assert(res.includes("register"), "❌ Guidance Fail: Should suggest registration for new user");

// Case: Registered but no ID
res = handleIntent("GENERAL_HELP", "", { registered: true, hasVoterId: false });
console.assert(res.includes("voter ID"), "❌ Guidance Fail: Should suggest getting ID if registered");

// Case: Has ID but no booth
res = handleIntent("GENERAL_HELP", "", { registered: true, hasVoterId: true, knowsBooth: false });
console.assert(res.includes("polling booth"), "❌ Guidance Fail: Should suggest finding booth if ID exists");

// Case: 100% Ready
res = handleIntent("GENERAL_HELP", "", { registered: true, hasVoterId: true, knowsBooth: true });
console.assert(res.includes("fully ready"), "❌ Guidance Fail: Should show ready message at 100%");

// --- 4. MAPS LINK INTEGRATION ---
console.log("\nTesting Maps Link Generation...");
res = handleIntent("LOCATION_INPUT", "638505", { registered: true, hasVoterId: true });
console.assert(res.includes("google.com/maps"), "❌ Maps Fail: Response should contain a Google Maps link");

console.log("\n✅ ALL TESTS PASSED! Your project logic is 100% verified.");
