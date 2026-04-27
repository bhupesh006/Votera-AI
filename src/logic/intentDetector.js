export function detectIntent(input) {
  const text = input.toLowerCase();

  // 1. LOCATION_INPUT (pincode ONLY, must be isolated first to prevent misfires)
  if (/^\s*\d{5,6}\s*$/.test(text) || /\b\d{5,6}\b/.test(text) && text.split(" ").length < 4) {
    return "LOCATION_INPUT";
  }

  // 2. USER PROGRESS (CONFIRMATIONS)
  if (text.includes("i have registered") || text.includes("already registered") || text.includes("am registered") || text.includes("done register")) {
    return "CONFIRM_REGISTERED";
  }
  if (text.includes("have voter id") || text.includes("got voter id") || text.includes("got id") || text.includes("have id")) {
    return "CONFIRM_HAS_ID";
  }
  if (text.includes("know my booth") || text.includes("found booth") || text.includes("know booth")) {
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
