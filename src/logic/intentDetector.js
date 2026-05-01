/**
 * Analyzes raw user input to determine the underlying intent.
 * @param {string} input - The raw text input from the user.
 * @returns {string} The detected intent key.
 */
export function detectIntent(input) {
  const text = input.toLowerCase();

  // 1. LOCATION_INPUT (detects pincodes even inside sentences)
  if (/\b\d{5,6}\b/.test(text)) {
    return "LOCATION_INPUT";
  }

  // 2. USER PROGRESS (CONFIRMATIONS) - Improved with more flexible keywords
  const hasRegistered = /registered|already registered|am registered|done register/i.test(text);
  const confirmedRegistration = /i have|i've|already|done/i.test(text) && hasRegistered;

  if (confirmedRegistration || text.includes("i am registered")) {
    return "CONFIRM_REGISTERED";
  }

  if (/\b(have|got|my|own)\b.*\b(id|voter id|card|epic)\b/i.test(text) && !text.includes("lost")) {
    return "CONFIRM_HAS_ID";
  }

  if (/know|found|got|have/i.test(text) && /booth|location|center/i.test(text)) {
    return "CONFIRM_KNOWS_BOOTH";
  }

  // 3. VOTING PROCESS
  if (text.includes("how to vote") || text.includes("voting process") || text.includes("what to do")) {
    return "HOW_TO_VOTE";
  }
  if (text.includes("first time") || text.includes("first vote") || text.includes("new voter")) {
    return "FIRST_TIME_VOTER";
  }

  // 4. REGISTRATION
  if (text.includes("link") || text.includes("website") || text.includes("portal") || text.includes("url")) {
    return "REGISTRATION_LINK";
  }
  if (text.includes("register") || text.includes("signup") || text.includes("enroll") || text.includes("apply online")) {
    return "REGISTER";
  }

  // 5. VOTER ID
  if (text.includes("lost") && (text.includes("id") || text.includes("voter"))) {
    return "VOTER_ID_LOST";
  }
  if (text.includes("voter id") || text.includes("id card") || text.includes("epic") || text.includes("card")) {
    return "VOTER_ID_APPLY";
  }

  // 6. ELECTION DAY / CARRY
  if (text.includes("what to carry") || text.includes("documents") || text.includes("bring")) {
    return "WHAT_TO_CARRY";
  }
  if (text.includes("when is") || text.includes("date") || text.includes("time")) {
    return "VOTING_DATE";
  }

  // 7. POLLING BOOTH
  if (text.includes("where do i vote") || text.includes("booth") || text.includes("polling") || text.includes("where to vote") || text.includes("find center")) {
    return "POLLING_BOOTH_FIND";
  }

  // 8. ELIGIBILITY
  if (text.includes("eligible") || text.includes("eligibility") || text.includes("age") || text.includes("can i vote")) {
    return "ELIGIBILITY";
  }

  // Input recovery
  if (text === "ok" || text === "hmm" || text.includes("what next") || text.includes("help")) {
    return "GENERAL_HELP";
  }

  return "GENERAL_HELP";
}
