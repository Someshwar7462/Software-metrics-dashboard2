import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function RepoInput() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = () => {
    if (!repoUrl.trim()) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    // 🔹 Extract repo name safely
    const parts = repoUrl.replace(".git", "").split("/");
    const repoName = parts[parts.length - 1] || "unknown-repo";

    // 🔹 Dummy repo-based data (Step 1 – local only)
    const repoData = {
      repoInfo: {
        name: repoName,
        url: repoUrl,
        branch: "main",
        visibility: "Public",
        language: "JavaScript",
        lastSynced: "Just now",
      },

      metrics: {
        criticalBugs: Math.floor(Math.random() * 5) + 1,
        majorBugs: Math.floor(Math.random() * 10) + 3,
        testCoverage: Math.floor(Math.random() * 30) + 60,
        buildStatus: Math.random() > 0.3 ? "PASS" : "FAIL",
        commits: Math.floor(Math.random() * 300) + 50,
      },
    };

    // 🔹 Save to localStorage
    localStorage.setItem("selectedRepo", JSON.stringify(repoData));

    // 🔹 Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#020617" : "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "32px",
          borderRadius: "16px",
          backgroundColor: darkMode ? "#020617" : "#ffffff",
          border: darkMode ? "1px solid #1e293b" : "1px solid #e5e7eb",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "12px",
            color: darkMode ? "#f8fafc" : "#020617",
          }}
        >
          Analyze GitHub Repository
        </h2>

        <p
          style={{
            fontSize: "14px",
            marginBottom: "16px",
            color: darkMode ? "#94a3b8" : "#64748b",
          }}
        >
          Paste a public GitHub repository URL to analyze project metrics.
        </p>

        <input
          type="text"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
            backgroundColor: darkMode ? "#020617" : "#ffffff",
            color: darkMode ? "#f8fafc" : "#020617",
            marginBottom: "12px",
          }}
        />

        {error && (
          <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
          }}
        >
          Analyze Repository
        </button>
      </div>
    </div>
  );
}

export default RepoInput;
