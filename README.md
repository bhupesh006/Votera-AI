# VoteReady AI 🇺🇸

## Problem Statement
Many potential voters, especially first-time voters, find the election preparation process overwhelming. Navigating registration, voter ID rules, and finding polling booths leaves voters disjointed and unready.

## Solution
**VoteReady AI** is an intelligent, purely frontend-based chat assistant that systematically assesses a user's preparedness and dynamically converses with them until they hit 100% election readiness.

## Features
- **Dynamic Decision Logic:** State-based routing from Registration to Ready.
- **Conversational Recovery:** Gemini API catches ambiguous edge cases conversationally.
- **Boot Locator:** Google Maps API dynamically parses queries for nearest venues.
- **Session State Saving:** Firebase securely logs user paths.
- **WOW Summary Card:** Unlocks at absolute completion, summarizing results visually.

## Tech Stack
- Frontend: Vanilla JavaScript (ES6+), HTML5, CSS3
- Bundler: Vite 
- Services: 
  - Google Gemini API (REST)
  - Firebase Firestore V9
  - Google Maps Places API

## Architecture
- `src/components/`: Modular UI units isolating rendering scopes.
- `src/logic/`: Pure state machine engines parsing responses.
- `src/services/`: Isolated network layers abstracting API exchanges.
- `src/main.js`: Main orchestration script uniting services and state via event listeners.

## How It Works
1. System boots sequentially assessing the user state at `NOT_REGISTERED`.
2. As messages parse in, `src/components/chatInterface.js` renders the sequence.
3. `src/logic/decisionEngine.js` bounds state progression correctly up to `READY`.
4. Fallbacks cascade to Gemini if users input unstructured assertions.
5. Location inputs dynamically invoke `mapsService.js` at the `HAS_ID_NO_BOOTH` state boundary exclusively.

## Google Services Used
- **Firebase:** Provides persistent state storage across sessions using Firestore. `saveUserState` and `loadUserState` ensure the user's progress is never lost.
- **Gemini:** Used exclusively for conversational rephrasing of final assistant responses to ensure a natural, varied user experience while strictly maintaining logic boundaries.
- **Google Maps:** Integrated as a location assistance fallback, providing guidance to nearby polling booths or government facilities.

## Testing
- **Basic Tests:** Located in `test/test_basic.js`, using native `console.assert` for zero-dependency validation.
- **Validated Logic:**
  - Intent detection for core voting queries.
  - Decision engine response accuracy based on state.
  - State update consistency (e.g., registration confirmation).

## Performance & Efficiency
- **Centralized Templates:** All response strings are stored in a `RESPONSES` constant in `decisionEngine.js` to reduce memory overhead and string duplication.
- **Lightweight Architecture:** The project maintains a tiny footprint (<1MB) by avoiding heavy frameworks and using clean separation of concerns.

## Accessibility
- Application relies strictly on Semantic HTML (`<main>`, `<header>`).
- Interactive inputs and submissions deploy descriptive `aria-label`s.
- `style.css` incorporates fully compliant contrast variables preventing screen-reader issues and ensuring visual clarity across layouts.

## Security
- API integration prevents public leaking via localized `.env` dependencies (`import.meta.env`).
- Never hardcodes direct payloads inline within repository trees.

## Assumptions
- Uses Google Services (simulate locally if `.env` keys aren't provisioned by developer).
- Since extreme minimal repository sizing (<1MB) is targeted, monolithic interface frameworks are deliberately eschewed in favor of plain DOM manipulations.
