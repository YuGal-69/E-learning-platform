// src/authentication/signup/signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebase"; // ✅ make sure firebase exports both `auth` and `db`

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set username in Auth profile
      await updateProfile(user, { displayName: username });

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date()
      });

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center card1">
        <div className="col-md-6 col-11 card p-4" >
          <div className="h2 text-center mb-4">Signup</div>
          <form className="row g-3" onSubmit={handleSignup}>
            <div className="col-12">
              <label htmlFor="inputUsername" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-text">We'll never share your email with anyone else.</div>
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
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">SIGN UP</button>
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
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">SIGN IN</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
