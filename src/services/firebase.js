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

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Lazy service variables
let _auth = null;
let _db = null;
let _storage = null;

const initializeServices = async () => {
  try {
    if (!_auth) {
      _auth = getAuth(app);
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true") {
        connectAuthEmulator(_auth, "http://localhost:9099");
      }
    }

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

// Default exports (to be initialized inside async IIFE)
export let auth, db, storage;

// Async IIFE for top-level await workaround
(async () => {
  const services = await initializeServices();
  auth = services.auth;
  db = services.db;
  storage = services.storage;
})();

// Fallback accessors
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
