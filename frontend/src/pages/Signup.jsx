import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/common/AuthLayout";
import { getEmailError } from "../utils/validateEmail";
import { getPhoneError, sanitizePhoneInput } from "../utils/validatePhone";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = sanitizePhoneInput(value);
      setForm({ ...form, phone: digitsOnly });
      setPhoneError(digitsOnly ? getPhoneError(digitsOnly) : "");
      return;
    }

    setForm({ ...form, [name]: value });

    if (name === "email") {
      setEmailError(value.trim() ? getEmailError(value) : "");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const emailValidationError = getEmailError(form.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    const phoneValidationError = getPhoneError(form.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Get started"
      icon="🚀"
      title="Create account"
      subtitle="Join the dashboard to analyze repos, track bugs, and monitor test coverage."
      wide
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSignup}>
        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-name">
            Full Name
          </label>
          <input
            id="signup-name"
            name="fullName"
            placeholder="John Doe"
            className="auth-input"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
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
          {emailError && (
            <p className="auth-field-error">{emailError}</p>
          )}
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-phone">
            Phone Number
          </label>
          <input
            id="signup-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            className={`auth-input ${phoneError ? "auth-input-error" : ""}`}
            value={form.phone}
            onChange={handleChange}
            onBlur={() => setPhoneError(getPhoneError(form.phone))}
            autoComplete="tel"
            required
          />
          {phoneError && (
            <p className="auth-field-error">{phoneError}</p>
          )}
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-confirm">
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            className="auth-input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`auth-btn ${loading ? "auth-btn-loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
