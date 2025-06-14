import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Loader2, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import "./forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      let errorMessage = "An error occurred while sending the reset email.";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
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
    <div className="auth-container">
      <div className="auth-content">
        <Card className="auth-card">
          <div className="auth-header">
            <h1>Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle className="icon" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="auth-success">
              <div className="success-message">
                <h3>Check Your Email</h3>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-muted">
                  Please check your inbox and follow the instructions to reset
                  your password.
                </p>
              </div>
              <div className="auth-footer">
                <p>
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setSuccess(false)}
                    className="auth-link"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form">
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

              <Button
                type="submit"
                className="auth-button"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? (
                  <>
                    <Loader2 className="icon spinning" />
                    Sending reset link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}

          <div className="auth-footer">
            <Link to="/login" className="back-to-login">
              <ArrowLeft className="icon" />
              Back to Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Forgot;
