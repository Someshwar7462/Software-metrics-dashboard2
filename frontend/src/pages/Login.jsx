import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/* ================= PAGE STYLE (FIXED ERROR) ================= */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f5f9",
};

const cardStyle = {
  width: "380px",
  padding: "28px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
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

/* ============================================================ */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* ================= LOGIN HANDLER ================= */

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (
      storedUser.email !== email ||
      storedUser.password !== password
    ) {
      setError("Invalid email or password");
      return;
    }

    // Login success
    localStorage.setItem("isLoggedIn", "true");
    navigate("/repo-input");
  };

  /* ================================================= */

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Login
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Link to="/forgot-password">Forgot password?</Link>
          <br />
          <span>
            Don’t have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
