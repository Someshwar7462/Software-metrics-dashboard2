import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ================= PAGE STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f5f9",
};

const cardStyle = {
  width: "420px",
  padding: "28px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
};

/* ================================================= */

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save user in localStorage (NO BACKEND)
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
    );

    navigate("/login");
  };

  /* ============================================== */

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Create Account
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSignup}>
          <input
            name="fullName"
            placeholder="Full Name"
            style={inputStyle}
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            style={inputStyle}
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            style={inputStyle}
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            style={inputStyle}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
