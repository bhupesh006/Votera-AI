import { fakeBoothLookup } from '../services/mapsService.js';

export function handleIntent(intent, input, userState) {
  // 6. READINESS DETECTION
  if (userState.registered && userState.hasVoterId && userState.knowsBooth) {
    return "You are fully ready to vote 🎉";
  }

  switch (intent) {
    case "HOW_TO_VOTE":
    case "FIRST_TIME_VOTER":
      return "To vote: 1) Register at https://voters.eci.gov.in/ 2) Get your voter ID 3) Find your polling booth 4) Visit and vote. Which step do you need help with?";

    case "REGISTER":
      if (userState.registered) {
        return "You are already registered. Next, check if you have your voter ID.";
      } else {
        return "Register here: https://voters.eci.gov.in/. After registering, check your voter ID.";
      }

    case "REGISTRATION_LINK":
      return "Official portal: https://voters.eci.gov.in/";

    case "VOTER_ID_APPLY":
      if (userState.hasVoterId) {
        return "Great! Next, find your polling booth.";
      } else {
        return "Apply for a voter ID online or at local offices. After that, find your polling booth.";
      }

    case "VOTER_ID_LOST":
      return "You can reapply or download a duplicate voter ID from the official portal.";

    case "POLLING_BOOTH_FIND":
      if (userState.knowsBooth) {
        return "Great! You are almost ready to vote.";
      } else {
        return "Enter your pincode to find your polling booth.";
      }

    case "LOCATION_INPUT":
      const match = input.match(/\d{5,6}/);
      const pincode = match ? match[0] : input;
      const booth = fakeBoothLookup(pincode);

      if (booth.found) {
        return `Your polling booth is ${booth.name}. You are ready to vote 🎉`;
      } else {
        return "Booth not found. Try another pincode or search nearby government schools on Google Maps.";
      }

    case "WHAT_TO_CARRY":
      return "Carry your voter ID or any valid ID proof when going to vote.";

    case "VOTING_DATE":
      return "Election dates vary by region. Check official election announcements for your area.";

    case "ELIGIBILITY":
      return "You must be 18+ and a registered citizen to vote.";

    case "CONFIRM_REGISTERED":
      return "Great! Next, check if you have your voter ID.";

    case "CONFIRM_HAS_ID":
      return "Good. Now find your polling booth.";

    case "CONFIRM_KNOWS_BOOTH":
      return "Perfect. You are almost ready to vote.";

    case "GENERAL_HELP":
    default:
      return "I can help with registration, voter ID, polling booth, and voting process. What would you like to do next?";
  }
}
