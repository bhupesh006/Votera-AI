import { fakeBoothLookup } from '../services/mapsService.js';

// Centralized response templates for efficiency and maintainability
const RESPONSES = {
  READY: "You are fully ready to vote 🎉",

  HOW_TO: "To vote: register at https://voters.eci.gov.in/, get your voter ID, and find your polling booth. Which step do you need help with?",

  FIRST_TIME: "Since this is your first time, start by registering at https://voters.eci.gov.in/. After that, get your voter ID and find your polling booth. What do you want help with?",

  REGISTERED_ALREADY: "You are already registered. Next, check if you have your voter ID.",
  REGISTER_LINK: "Register here: https://voters.eci.gov.in/. After registering, check your voter ID.",
  PORTAL_LINK: "Official portal: https://voters.eci.gov.in/",

  HAS_ID_ALREADY: "Great! Next, find your polling booth.",
  APPLY_ID: "Apply for a voter ID online or at local offices. After that, find your polling booth.",
  ID_LOST: "You can reapply or download a duplicate voter ID from the official portal.",

  KNOWS_BOOTH_ALREADY: "Perfect. You are almost ready to vote.",
  FIND_BOOTH: "Enter your pincode to find your polling booth.",

  WHAT_TO_CARRY: "Carry your voter ID or any valid ID proof when going to vote.",
  VOTING_DATE: "Election dates vary by region. Check official election announcements for your area.",
  ELIGIBILITY: "You must be 18+ and a registered citizen to vote.",

  CONFIRM_REGISTERED: "Great! Next, check if you have your voter ID.",
  CONFIRM_HAS_ID: "Good. Now find your polling booth.",

  GENERAL_HELP: "You can register, check your voter ID, or find your polling booth. What would you like to do next?",

  BOOTH_NOT_FOUND: "Booth not found. Try another pincode or search nearby government schools on Google Maps."
};

// Only responsible for mapping intent and state to a response string
/**
 * Maps a detected intent and current user state to a specific response string.
 * This includes progressive guidance to lead the user toward 100% readiness.
 * @param {string} intent - The detected intent key.
 * @param {string} input - The original raw user input.
 * @param {Object} userState - The current state of the user.
 * @returns {string} The assistant's response.
 */
export function handleIntent(intent, input, userState) {
  // 1. Readiness Detection
  if (userState.registered && userState.hasVoterId && userState.knowsBooth) {
    return RESPONSES.READY;
  }

  // Progressive guidance (only for general help/unstructured input)
  if (intent === "GENERAL_HELP") {
    if (userState.registered && !userState.hasVoterId) {
      return "You’ve registered. Next, make sure you have your voter ID.";
    }

    if (userState.hasVoterId && !userState.knowsBooth) {
      return "Now, find your polling booth using your pincode.";
    }
  }

  // 2. Direct Mappings and State-based Logic
  switch (intent) {
    case "HOW_TO_VOTE":
      return RESPONSES.HOW_TO;
      
    case "FIRST_TIME_VOTER":
      return RESPONSES.FIRST_TIME;

    case "REGISTER":
      return userState.registered ? RESPONSES.REGISTERED_ALREADY : RESPONSES.REGISTER_LINK;

    case "REGISTRATION_LINK":
      return RESPONSES.PORTAL_LINK;

    case "VOTER_ID_APPLY":
      return userState.hasVoterId ? RESPONSES.HAS_ID_ALREADY : RESPONSES.APPLY_ID;

    case "VOTER_ID_LOST":
      return RESPONSES.ID_LOST;

    case "POLLING_BOOTH_FIND":
      return userState.knowsBooth ? RESPONSES.KNOWS_BOOTH_ALREADY : RESPONSES.FIND_BOOTH;

    case "LOCATION_INPUT":
      const booth = fakeBoothLookup(input);

      if (booth.found) {
        return `Your polling booth is ${booth.name}. You can view it on [Google Maps](${booth.mapUrl}). You are ready to vote 🎉`;
      }

      return `${RESPONSES.BOOTH_NOT_FOUND} [Search on Google Maps](${booth.mapUrl})`;

    case "WHAT_TO_CARRY":
      return RESPONSES.WHAT_TO_CARRY;

    case "VOTING_DATE":
      return RESPONSES.VOTING_DATE;

    case "ELIGIBILITY":
      return RESPONSES.ELIGIBILITY;

    case "CONFIRM_REGISTERED":
      return RESPONSES.CONFIRM_REGISTERED;

    case "CONFIRM_HAS_ID":
      return RESPONSES.CONFIRM_HAS_ID;

    case "CONFIRM_KNOWS_BOOTH":
      return RESPONSES.KNOWS_BOOTH_ALREADY;

    case "GENERAL_HELP":
    default:
      return RESPONSES.GENERAL_HELP;
  }
}
