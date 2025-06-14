// src/authentication/signup/signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Loader2, Mail, Lock, User, AlertCircle, Github } from "lucide-react";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set username in Auth profile
      await updateProfile(user, { displayName: username });

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
        xp: 0,
        level: 1,
        challengesCompleted: 0,
        streak: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "An error occurred during signup.";

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: user.displayName || user.email.split("@")[0],
        createdAt: new Date(),
        xp: 0,
        level: 1,
        challengesCompleted: 0,
        streak: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <Card className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p className="auth-subtitle">
              Join our community of cybersecurity learners
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">
                <User className="icon" />
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
                disabled={isLoading}
                className={error ? "error" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail className="icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className={error ? "error" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock className="icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                disabled={isLoading}
                className={error ? "error" : ""}
              />
            </div>

            <Button
              type="submit"
              className="auth-button"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <>
                  <Loader2 className="icon spinning" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="social-button"
            >
              <span className="google-icon">G</span>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="social-button"
            >
              <Github className="icon" />
              GitHub
            </Button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
