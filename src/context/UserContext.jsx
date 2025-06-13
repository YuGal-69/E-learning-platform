import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set, get, onValue, update } from "firebase/database";

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
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(true);

      if (user) {
        // Get user profile from Realtime Database
        const userRef = ref(db, `users/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const profileData = snapshot.val();
            // Ensure badges field exists
            setUserProfile({
              ...profileData,
              badges: profileData.badges || [],
              preferences: {
                theme: "light",
                notifications: true,
                emailUpdates: true,
                ...profileData.preferences,
              },
            });
          } else {
            // Create initial user profile if it doesn't exist
            const initialProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
              bio: "",
              level: 1,
              xp: 0,
              challengesCompleted: 0,
              streak: 0,
              badges: [],
              preferences: {
                theme: "light",
                notifications: true,
                emailUpdates: true,
              },
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };

            await set(userRef, initialProfile);
            setUserProfile(initialProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = async (updates) => {
    if (!user) return;

    try {
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, {
        ...updates,
        lastUpdated: new Date().toISOString(),
      });

      // Update local state
      setUserProfile((prev) => ({
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString(),
      }));

      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContext;
