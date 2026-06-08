import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import { authApi } from "../utils/api";
import { getEmailError } from "../utils/validateEmail";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setEmailError(value.trim() ? getEmailError(value) : "");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailValidationError = getEmailError(form.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.forgotPassword({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setSuccess(data.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Account recovery"
      icon="🔐"
      title="Reset password"
      subtitle="Enter your registered email and choose a new password."
      footer={
        <>
          Remember your password? <Link to="/login">Sign in</Link>
        </>
      }
    >
      {error && <div className="auth-error">{error}</div>}
      {success && (
        <div
          style={{
            padding: "10px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            fontSize: "13px",
            color: "#166534",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleReset}>
        <div className="auth-input-group">
          <label className="auth-label" htmlFor="forgot-email">
            Email
          </label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`auth-input ${emailError ? "auth-input-error" : ""}`}
            value={form.email}
            onChange={handleChange}
            onBlur={() => setEmailError(getEmailError(form.email))}
            autoComplete="email"
            required
          />
          {emailError && <p className="auth-field-error">{emailError}</p>}
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="forgot-password">
            New Password
          </label>
          <input
            id="forgot-password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="forgot-confirm">
            Confirm New Password
          </label>
          <input
            id="forgot-confirm"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your new password"
            className="auth-input"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          className={`auth-btn ${loading ? "auth-btn-loading" : ""}`}
          disabled={loading || Boolean(success)}
        >
          {loading ? "Updating password..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
