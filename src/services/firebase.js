import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Debug logging for Firebase config
console.log("Firebase Config:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  // Don't log sensitive values like apiKey
});

// Validate Firebase config
const validateConfig = (config) => {
  const requiredFields = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(
      "Missing required Firebase configuration fields:",
      missingFields
    );
    return false;
  }

  return true;
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services with proper error handling
let _auth = null;
let _db = null;
let _storage = null;

const initializeServices = async () => {
  try {
    // Initialize Auth
    if (!_auth) {
      _auth = getAuth(app);
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
        connectAuthEmulator(_auth, "http://localhost:9099");
      }
    }

    // Initialize Firestore
    if (!_db) {
      _db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
        connectFirestoreEmulator(_db, "localhost", 8080);
      }
    }

    // Initialize Storage
    if (!_storage) {
      _storage = getStorage(app);
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
        connectStorageEmulator(_storage, "localhost", 9199);
      }
    }

    return { auth: _auth, db: _db, storage: _storage };
  } catch (error) {
    console.error("Error initializing Firebase services:", error);
    throw error;
  }
};

// Initialize services immediately
const services = await initializeServices();

// Export initialized services
export const { auth, db, storage } = services;

// Export getter functions for lazy initialization if needed
export const getFirebaseAuth = () => _auth || getAuth(app);
export const getFirebaseDb = () =>
  _db ||
  initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
export const getFirebaseStorage = () => _storage || getStorage(app);

export default app;
