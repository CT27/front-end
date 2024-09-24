import React, { useState } from "react";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css";

import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = () => {
    setMessage("Password reset link has been sent to your email address.");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h1>Reset Password</h1>
          <hr className="my-4" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            <HiOutlineUser className="me-2" /> Enter your email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button
            className="btn btn-dark text-white"
            onClick={handleForgotPassword}
          >
            Reset Password
          </button>
        </div>
        {message && (
          <div className="alert mt-3 alert-info" role="alert">
            {message}
          </div>
        )}
        <div className="d-grid mt-3">
          <Link to="/login" className="btn btn-secondary">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
