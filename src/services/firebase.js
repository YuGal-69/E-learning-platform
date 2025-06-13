import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  // Add database URL for Realtime Database
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Validate Firebase config
const validateConfig = (config) => {
  const requiredFields = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
    "databaseURL", // Added databaseURL to required fields
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

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  if (!validateConfig(firebaseConfig)) {
    throw new Error("Invalid Firebase configuration");
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app); // Initialize Realtime Database
  storage = getStorage(app);

  // Log successful initialization
  console.log("Firebase initialized successfully");
  console.log("Realtime Database initialized");

  // Test database connection
  const connectedRef = ref(db, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      console.log("Database connection test successful");
    } else {
      console.log("Database connection test failed");
    }
  });
} catch (error) {
  console.error("Error initializing Firebase:", error);
  if (error.code === "app/duplicate-app") {
    console.error(
      "Firebase app already exists. This might indicate multiple initialization attempts."
    );
  } else if (error.code === "app/invalid-app-argument") {
    console.error(
      "Invalid Firebase configuration. Please check your environment variables."
    );
  }
  throw error;
}

export { auth, db, storage };
export default app;
