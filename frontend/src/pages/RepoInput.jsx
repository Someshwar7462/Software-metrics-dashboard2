import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* 🔹 Helper: GitHub URL se repo info nikalna */
function extractRepoInfo(repoUrl) {
  const cleanUrl = repoUrl.replace(".git", "");
  const parts = cleanUrl.split("github.com/")[1]?.split("/") || [];

  return {
    owner: parts[0] || "unknown",
    name: parts[1] || "unknown-repo",
    branch: "main",
    visibility: "Public",
    language: parts[1]?.toLowerCase().includes("java")
      ? "Java"
      : "JavaScript",
    lastSynced: "Just now",
    url: cleanUrl,
  };
}

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

    // 🔹 Step 1: Repo info GitHub URL se
    const repoInfo = extractRepoInfo(repoUrl);

    // 🔹 Step 1: Dummy metrics (abhi zero, next steps me fill honge)
    const repoData = {
      repoInfo,
      metrics: {
        criticalBugs: 0,
        majorBugs: 0,
        testCoverage: 0,
        buildStatus: "N/A",
        commits: 0,
      },
    };

    // 🔹 Save to localStorage
    localStorage.setItem("selectedRepo", JSON.stringify(repoData));

    // 🔹 Go to dashboard
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
          <div
            style={{
              color: "#ef4444",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
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
