import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db = null;
try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
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
