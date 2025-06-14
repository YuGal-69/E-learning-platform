import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Loader2, Mail, Lock, AlertCircle, Shield } from "lucide-react";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // First, try to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Then check if the user is an admin
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        // If not admin, sign out and show error
        await auth.signOut();
        throw new Error("Access denied. Admin privileges required.");
      }

      // If admin, redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      let errorMessage = "An error occurred during login.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No admin account found with this email.";
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-content">
        <Card className="admin-auth-card">
          <div className="admin-auth-header">
            <Shield size={48} className="admin-icon" />
            <h1>Admin Login</h1>
            <p className="admin-auth-subtitle">
              Sign in to access the admin panel
            </p>
          </div>

          {error && (
            <div className="admin-auth-error">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="admin-auth-form">
            <div className="form-group">
              <label htmlFor="email">
                <Mail className="icon" />
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
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
                placeholder="Enter admin password"
                required
                disabled={isLoading}
                className={error ? "error" : ""}
              />
            </div>

            <Button
              type="submit"
              className="admin-auth-button"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <>
                  <Loader2 className="icon spinning" />
                  Signing in...
                </>
              ) : (
                "Sign In as Admin"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
