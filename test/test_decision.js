import assert from 'assert';
import { detectIntent } from '../src/logic/intentDetector.js';
import { handleIntent } from '../src/logic/decisionEngine.js';

console.log("Running Expanded Intent Assistant Tests...");

let testState = {
  registered: false,
  hasVoterId: false,
  knowsBooth: false,
  lastIntent: null,
  lastResponse: null
};

// Test 1: New Intent - HOW_TO_VOTE
const intent1 = detectIntent("How to vote?");
assert.strictEqual(intent1, "HOW_TO_VOTE");
const res1 = handleIntent(intent1, "How to vote?", testState);
assert.strictEqual(res1.includes("To vote: 1) Register"), true);

// Test 2: New Intent - VOTER_ID_LOST
const intent2 = detectIntent("I lost my voter id");
assert.strictEqual(intent2, "VOTER_ID_LOST");
const res2 = handleIntent(intent2, "I lost my voter id", testState);
assert.strictEqual(res2.includes("reapply or download"), true);

// Test 3: New Intent - WHAT_TO_CARRY
const intent3 = detectIntent("what documents should I carry");
assert.strictEqual(intent3, "WHAT_TO_CARRY");
const res3 = handleIntent(intent3, "what documents should I carry", testState);
assert.strictEqual(res3.includes("valid ID proof"), true);

// Test 4: New Intent - ELIGIBILITY
const intent4 = detectIntent("Am I eligible to vote?");
assert.strictEqual(intent4, "ELIGIBILITY");

// Test 5: State memory update matching
const intent5 = detectIntent("I have registered already");
assert.strictEqual(intent5, "CONFIRM_REGISTERED");
const res5 = handleIntent(intent5, "I have registered already", testState);
assert.strictEqual(res5.includes("check if you have your voter ID"), true);

console.log("✅ All Expanded Intent tests passed!");
