// src/authentication/login/login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase"; // Adjust path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-6 col-11 card p-4" style={{ marginTop: "10%" }}>
          <div className="h2 text-center mb-4">Login</div>
          <form className="row g-3" onSubmit={handleLogin}>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">Username or Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="inputPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mb-2 py-3 form-check">
                <input type="checkbox" className="form-check-input" id="check1" />
                <label className="form-check-label" htmlFor="check1">Check me out</label>
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">SIGN IN</button>
            </div>
          </form>

          {message && <div className="alert alert-info mt-3">{message}</div>}

          <div className="col-12 d-flex align-items-center justify-content-center mt-4">
            <div className="divider flex-grow-1 border-top"></div>
            <div className="px-2 text-muted">OR</div>
            <div className="divider flex-grow-1 border-top"></div>
          </div>

          <div className="col-12 fs-6 mt-3 text-center">
            <p>
              Need an account?{" "}
              <a href="/signup" className="text-decoration-none">SIGN UP</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
