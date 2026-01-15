import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* 🔹 Helper: owner & repo extract */
function extractOwnerRepo(repoUrl) {
  const cleanUrl = repoUrl.replace(".git", "");
  const parts = cleanUrl.split("github.com/")[1]?.split("/") || [];
  return {
    owner: parts[0],
    repo: parts[1],
    cleanUrl,
  };
}

function RepoInput() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { owner, repo, cleanUrl } = extractOwnerRepo(repoUrl);

      if (!owner || !repo) {
        setError("Invalid GitHub repository format");
        setLoading(false);
        return;
      }

      /* 🔹 GitHub Public API call (NO BACKEND) */
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      if (!res.ok) {
        throw new Error("Repository not found or API limit reached");
      }

      const data = await res.json();

      /* 🔹 Repo info (NOW REAL & DYNAMIC) */
      const repoInfo = {
        owner,
        name: data.name,
        url: cleanUrl,
        branch: data.default_branch,
        visibility: data.private ? "Private" : "Public",
        language: data.language || "Unknown",
        lastSynced: new Date(data.updated_at).toLocaleString(),
      };

      /* 🔹 Dummy metrics (next steps me improve karenge) */
      const repoData = {
        repoInfo,
        metrics: {
          criticalBugs: Math.floor(Math.random() * 5) + 1,
          majorBugs: Math.floor(Math.random() * 8) + 2,
          testCoverage: Math.floor(Math.random() * 30) + 60,
          buildStatus: Math.random() > 0.3 ? "PASS" : "FAIL",
          commits: data.size ? Math.floor(data.size / 10) : 120,
        },
      };

      localStorage.setItem("selectedRepo", JSON.stringify(repoData));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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

        <input
          type="text"
          placeholder="https://github.com/owner/repo"
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
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: loading ? "#94a3b8" : "#2563eb",
            color: "white",
            fontWeight: "600",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Repository"}
        </button>
      </div>
    </div>
  );
}

export default RepoInput;
