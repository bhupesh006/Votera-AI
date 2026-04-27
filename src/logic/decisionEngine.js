import { fakeBoothLookup } from '../services/mapsService.js';

const RESPONSES = {
  READY: "You are fully ready to vote 🎉",
  HOW_TO: "To vote: 1) Register at https://voters.eci.gov.in/ 2) Get your voter ID 3) Find your polling booth 4) Visit and vote. Which step do you need help with?",
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
  GENERAL_HELP: "I can help with registration, voter ID, polling booth, and voting process. What would you like to do next?",
  BOOTH_NOT_FOUND: "Booth not found. Try another pincode or search nearby government schools on Google Maps."
};

// Only responsible for mapping intent and state to a response string
export function handleIntent(intent, input, userState) {
  // 1. Readiness Detection
  if (userState.registered && userState.hasVoterId && userState.knowsBooth) {
    return RESPONSES.READY;
  }

  // 2. Direct Mappings and State-based Logic
  switch (intent) {
    case "HOW_TO_VOTE":
    case "FIRST_TIME_VOTER":
      return RESPONSES.HOW_TO;

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
      const match = input.match(/\d{5,6}/);
      const pincode = match ? match[0] : input;
      const booth = fakeBoothLookup(pincode);

      if (booth.found) {
        return `Your polling booth is ${booth.name}. You are ready to vote 🎉`;
      }
      return RESPONSES.BOOTH_NOT_FOUND;

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
