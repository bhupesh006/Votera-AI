/**
 * Centralized application configuration and environment variable validation.
 */
const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    model: "gemini-1.5-flash"
  },
  maps: {
    apiKey: import.meta.env.VITE_MAPS_API_KEY
  },
  app: {
    isDev: import.meta.env.DEV,
    version: "1.2.0"
  }
};

/**
 * Validates that all critical API keys are present.
 * @returns {boolean}
 */
export function validateConfig() {
  const missing = [];
  if (!config.firebase.apiKey) missing.push("Firebase API Key");
  if (!config.gemini.apiKey) missing.push("Gemini API Key");
  
  if (missing.length > 0) {
    console.error(`⚠️ Missing configuration: ${missing.join(", ")}`);
    return false;
  }
  return true;
}

export default config;
