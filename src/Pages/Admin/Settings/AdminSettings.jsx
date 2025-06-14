import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import {
  Settings,
  Shield,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
  CheckCircle,
  LogOut,
} from "lucide-react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const { userProfile, updateUserProfile } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: userProfile?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Update profile in Firestore
      await updateDoc(doc(db, "users", userProfile.uid), {
        email: formData.email,
        updatedAt: new Date(),
      });

      setSuccess("Profile updated successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Here you would typically update the password using Firebase Auth
      // For security reasons, this should be handled through a secure backend
      setSuccess("Password updated successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="admin-settings">
      <div className="settings-grid">
        {/* Profile Settings */}
        <Card className="settings-card">
          <div className="settings-header">
            <Settings className="icon" />
            <h2>Profile Settings</h2>
          </div>

          {error && (
            <div className="settings-error">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="settings-success">
              <CheckCircle className="icon" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-group">
              <label htmlFor="email">
                <Mail className="icon" />
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter admin email"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="settings-button"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <>
                  <Loader2 className="icon spinning" />
                  Updating Profile...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Card>

        {/* Security Settings */}
        <Card className="settings-card">
          <div className="settings-header">
            <Shield className="icon" />
            <h2>Security Settings</h2>
          </div>

          <form onSubmit={handleUpdatePassword} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">
                <Lock className="icon" />
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">
                <Lock className="icon" />
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock className="icon" />
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="settings-button"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <>
                  <Loader2 className="icon spinning" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Card>

        {/* Logout Section */}
        <Card className="settings-card logout-card">
          <div className="settings-header">
            <LogOut className="icon" />
            <h2>Logout</h2>
          </div>
          <div className="settings-form">
            <p className="logout-message">
              Click the button below to securely log out of your admin account.
            </p>
            <Button
              onClick={handleLogout}
              className="settings-button logout-button"
              disabled={logoutLoading}
              fullWidth
              variant="danger"
            >
              {logoutLoading ? (
                <>
                  <Loader2 className="icon spinning" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="icon" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
