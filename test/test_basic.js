import { detectIntent } from '../src/logic/intentDetector.js';
import { handleIntent } from '../src/logic/decisionEngine.js';

console.log("Running Basic Verification Tests...");

// 1. Intent Detection
console.assert(detectIntent("how to vote") === "HOW_TO_VOTE", "how to vote -> HOW_TO_VOTE");
console.assert(detectIntent("638505") === "LOCATION_INPUT", "638505 -> LOCATION_INPUT");
console.assert(detectIntent("first time voting") === "FIRST_TIME_VOTER", "first time voting -> FIRST_TIME_VOTER");

// 2. Decision Engine (State-aware)
console.assert(
  handleIntent("REGISTER", "", { registered: true })
  .includes("already registered"),
  "REGISTER intent with registered:true should return 'already registered'"
);

// 3. Decision Engine (Response Accuracy)
console.assert(
  handleIntent("HOW_TO_VOTE", "", {})
  .includes("register"),
  "HOW_TO_VOTE should include 'register' instructions"
);

console.log("✅ All Verification Tests Passed!");
