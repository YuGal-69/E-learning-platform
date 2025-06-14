import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { auth, db } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Auth state listener with cleanup
  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeProfile;

    const setupAuth = async () => {
      try {
        unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          setUser(user);
          setIsLoading(true);
          setError(null);

          if (user) {
            try {
              const userDocRef = doc(db, "users", user.uid);

              // Use real-time listener for user profile
              unsubscribeProfile = onSnapshot(
                userDocRef,
                (doc) => {
                  if (doc.exists()) {
                    const profileData = doc.data();
                    setUserProfile(profileData);
                    setIsAdmin(profileData.role === "admin");
                  } else if (isOnline) {
                    // Create new profile if it doesn't exist
                    const newProfile = {
                      uid: user.uid,
                      email: user.email,
                      username: user.displayName || user.email.split("@")[0],
                      role: "student",
                      createdAt: new Date(),
                      lastLogin: new Date(),
                      xp: 0,
                      level: 1,
                      challengesCompleted: 0,
                      streak: 0,
                      enrolledCourses: [],
                      completedChallenges: [],
                      progress: {},
                    };

                    setDoc(userDocRef, newProfile).catch((error) => {
                      console.error("Error creating user profile:", error);
                      setError(
                        "Failed to create user profile. Please try again when online."
                      );
                    });
                  } else {
                    setError(
                      "Cannot create new profile while offline. Please connect to the internet."
                    );
                  }
                  setIsLoading(false);
                },
                (error) => {
                  console.error("Error in profile listener:", error);
                  setError("Error loading profile. Please try again.");
                  setIsLoading(false);
                }
              );
            } catch (error) {
              console.error("Error setting up profile listener:", error);
              setError("Error connecting to database. Please try again.");
              setIsLoading(false);
            }
          } else {
            setUserProfile(null);
            setIsAdmin(false);
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("Error setting up auth:", error);
        setError("Error initializing authentication. Please refresh the page.");
        setIsLoading(false);
      }
    };

    setupAuth();

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [isOnline]);

  // Memoized login function
  const login = useCallback(async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "An error occurred during login.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw error;
    }
  }, []);

  // Memoized register function
  const register = useCallback(async (email, password, username) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      // Create user document in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        username: username,
        role: "student",
        createdAt: new Date(),
        xp: 0,
        level: 1,
        challengesCompleted: 0,
        streak: 0,
        enrolledCourses: [],
        completedChallenges: [],
        progress: {},
      });

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "An error occurred during registration.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        default:
          errorMessage = error.message;
      }

      setError(errorMessage);
      throw error;
    }
  }, []);

  // Memoized logout function
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to log out. Please try again.");
    }
  }, []);

  // Memoized update profile function
  const updateUserProfile = useCallback(
    async (updates) => {
      if (!user || !db) return false;

      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          ...updates,
          updatedAt: new Date(),
        });

        if (updates.role) {
          setIsAdmin(updates.role === "admin");
        }

        return true;
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile. Please try again.");
        return false;
      }
    },
    [user, db]
  );

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      userProfile,
      isLoading,
      isAdmin,
      error,
      isOnline,
      login,
      register,
      logout,
      updateUserProfile,
    }),
    [
      user,
      userProfile,
      isLoading,
      isAdmin,
      error,
      isOnline,
      login,
      register,
      logout,
      updateUserProfile,
    ]
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
