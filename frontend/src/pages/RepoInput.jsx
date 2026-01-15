import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* ================= CONFIG ================= */
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

/* ================= HELPERS ================= */

// Extract owner & repo from GitHub URL
function extractOwnerRepo(repoUrl) {
  const cleanUrl = repoUrl.replace(".git", "").trim();
  const parts = cleanUrl.split("github.com/")[1]?.split("/") || [];

  return {
    owner: parts[0],
    repo: parts[1],
    cleanUrl,
  };
}

// Fetch REAL commits count using GitHub pagination headers
async function fetchRealCommitCount(owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch commits");
  }

  const linkHeader = res.headers.get("link");

  // If commits < 30
  if (!linkHeader) {
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  }

  // Extract last page number
  const match = linkHeader.match(/page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1], 10) : 0;
}

/* ================= COMPONENT ================= */

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
        throw new Error("Invalid GitHub repository format");
      }

      /* ===== 1️⃣ Fetch repository info ===== */
      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );

      if (!repoRes.ok) {
        throw new Error("Repository not found or API limit exceeded");
      }

      const repoApiData = await repoRes.json();

      /* ===== 2️⃣ Fetch REAL commits count ===== */
      const commitsCount = await fetchRealCommitCount(owner, repo);

      /* ===== 3️⃣ Prepare dashboard data ===== */
      const repoData = {
        repoInfo: {
          owner,
          name: repoApiData.name,
          url: cleanUrl,
          branch: repoApiData.default_branch,
          visibility: repoApiData.private ? "Private" : "Public",
          language: repoApiData.language || "Unknown",
          lastSynced: new Date(repoApiData.updated_at).toLocaleString(),
        },

        metrics: {
          commits: commitsCount, // ✅ REAL commits
          criticalBugs: Math.floor(Math.random() * 5) + 1,
          majorBugs: Math.floor(Math.random() * 8) + 2,
          testCoverage: Math.floor(Math.random() * 30) + 60,
          buildStatus: Math.random() > 0.3 ? "PASS" : "FAIL",
        },
      };

      /* ===== 4️⃣ Save to localStorage ===== */
      localStorage.setItem("selectedRepo", JSON.stringify(repoData));

      /* ===== 5️⃣ Navigate to dashboard ===== */
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
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "12px",
            border: darkMode ? "1px solid #334155" : "1px solid #cbd5e1",
            backgroundColor: darkMode ? "#020617" : "#ffffff",
            color: darkMode ? "#f8fafc" : "#020617",
          }}
        />

        {error && (
          <div style={{ color: "#ef4444", marginBottom: "10px" }}>
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
            backgroundColor: loading ? "#94a3b8" : "#2563eb",
            color: "white",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Repository"}
        </button>
      </div>
    </div>
  );
}

export default RepoInput;
