import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC10Xnl0tScIfVAlynxJumHYWW0baztWzQ",
  authDomain: "al-alam-pool.firebaseapp.com",
  projectId: "al-alam-pool",
  storageBucket: "al-alam-pool.firebasestorage.app",
  messagingSenderId: "1047252542056",
  appId: "1:1047252542056:web:3658d4eba87038f31551dd",
  measurementId: "G-TGD0S9WE1Q",
};

const app = initializeApp(firebaseConfig);

let _analytics = null;

// Lazily resolve analytics — browser-only, checks SDK support before init.
// Returns null in SSR or environments where Analytics is blocked.
export const getAnalyticsInstance = async () => {
  if (_analytics) return _analytics;
  if (typeof window === "undefined") return null;
  try {
    const supported = await isSupported();
    if (supported) _analytics = getAnalytics(app);
  } catch {
    /* Analytics blocked or unsupported */
  }
  return _analytics;
};

export { app };
