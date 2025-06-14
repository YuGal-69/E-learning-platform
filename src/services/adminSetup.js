import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const createAdminAccount = async (email, password) => {
  try {
    // 1. Create the user account with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. Create the admin user document in Firestore
    const adminUserData = {
      uid: user.uid,
      email: user.email,
      username: user.email.split("@")[0],
      role: "admin", // Set role as admin
      createdAt: new Date(),
      lastLogin: new Date(),
      isFirstAdmin: true, // Flag to identify the first admin
      xp: 0,
      level: 1,
      challengesCompleted: 0,
      streak: 0,
      enrolledCourses: [],
      completedChallenges: [],
      progress: {},
    };

    // 3. Save the admin user data to Firestore
    await setDoc(doc(db, "users", user.uid), adminUserData);

    return {
      success: true,
      message: "Admin account created successfully",
      user: adminUserData,
    };
  } catch (error) {
    console.error("Error creating admin account:", error);
    let errorMessage = "Failed to create admin account.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters.";
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error,
    };
  }
};
