import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/common/AuthLayout";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

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
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-label" htmlFor="signup-phone">
            Phone Number
          </label>
          <input
            id="signup-phone"
            name="phone"
            placeholder="+1 234 567 8900"
            className="auth-input"
            value={form.phone}
            onChange={handleChange}
            required
          />
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
