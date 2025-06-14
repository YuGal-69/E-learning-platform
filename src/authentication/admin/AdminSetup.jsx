import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminAccount } from "../../services/adminSetup";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Loader2, Mail, Lock, AlertCircle, Shield } from "lucide-react";
import "./AdminLogin.css"; // We can reuse the admin login styles

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createAdminAccount(email, password);

      if (result.success) {
        setSuccess(
          "Admin account created successfully! Redirecting to admin login..."
        );
        // Redirect to admin login after 2 seconds
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to create admin account. Please try again.");
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
            <h1>Create Admin Account</h1>
            <p className="admin-auth-subtitle">
              Set up your first admin account
            </p>
          </div>

          {error && (
            <div className="admin-auth-error">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="admin-auth-success">
              <Shield className="icon" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSetup} className="admin-auth-form">
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
                placeholder="Enter password (min 6 characters)"
                required
                disabled={isLoading}
                className={error ? "error" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock className="icon" />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
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
                  Creating Admin Account...
                </>
              ) : (
                "Create Admin Account"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminSetup;
