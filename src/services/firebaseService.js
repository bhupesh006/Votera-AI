import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import config from '../config/index.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db = null;
let auth = null;

try {
  if (config.firebase.apiKey) {
    const app = initializeApp(config.firebase);
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Demonstrate active integration of Authentication
    signInAnonymously(auth)
      .then(() => console.log('👤 Authenticated as Guest'))
      .catch((err) => console.error('Auth Error:', err));
  } else {
    console.warn('Firebase config missing.');
  }
} catch (error) {
  console.error("Firebase initialization:", error);
}

export async function saveUserState(sessionId, stateData) {
  if (!db) return;
  try {
    const docRef = doc(db, 'users', sessionId);
    await setDoc(docRef, stateData, { merge: true });
    console.log('✅ State saved to Firebase successfully');
  } catch (error) {
    console.error('❌ Firebase save error:', error);
  }
}

export async function loadUserState(sessionId) {
  if (!db) return null;
  try {
    const docRef = doc(db, 'users', sessionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('✅ State loaded from Firebase');
      return docSnap.data();
    }
    console.log('ℹ️ No existing state found in Firebase');
    return null;
  } catch (error) {
    console.error('❌ Firebase load error:', error);
    return null;
  }
}

/**
 * Logs a custom event to Firestore for basic analytics.
 * @param {string} sessionId - Unique session identifier.
 * @param {string} eventName - Name of the event.
 * @param {Object} metadata - Additional event data.
 */
export async function logEvent(sessionId, eventName, metadata = {}) {
  if (!db) return;
  try {
    const eventRef = doc(db, 'events', `${sessionId}_${Date.now()}`);
    await setDoc(eventRef, {
      sessionId,
      eventName,
      timestamp: new Date().toISOString(),
      ...metadata
    });
    console.log(`📊 Event Logged: ${eventName}`);
  } catch (error) {
    console.error('❌ Analytics error:', error);
  }
}
