import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RepoInput() {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);

    try {
      // -------------------------------
      // 1️⃣ Parse GitHub URL
      // -------------------------------
      const match = repoUrl.match(
        /github\.com\/([^/]+)\/([^/]+)/
      );

      if (!match) {
        throw new Error("Invalid GitHub repository URL");
      }

      const owner = match[1];
      const repo = match[2];

      // -------------------------------
      // 2️⃣ Fetch repository details
      // -------------------------------
      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      if (!repoRes.ok) {
        throw new Error("Repository not found or API limit exceeded");
      }

      const repoData = await repoRes.json();

      // -------------------------------
      // 3️⃣ Fetch REAL commits count
      //    (Pagination trick)
      // -------------------------------
      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
      );

      const linkHeader = commitsRes.headers.get("link");

      let totalCommits = 0;

      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (match) {
          totalCommits = parseInt(match[1], 10);
        }
      } else {
        // Repo with very few commits
        const commitsJson = await commitsRes.json();
        totalCommits = commitsJson.length;
      }

      // -------------------------------
      // 4️⃣ Store data in localStorage
      // -------------------------------
      const storedData = {
        repoInfo: {
          name: repoData.name,
          url: repoData.html_url,
          branch: repoData.default_branch,
          visibility: repoData.private ? "Private" : "Public",
          language: repoData.language || "N/A",
          lastSynced: "Just now",
        },
        metrics: {
          commits: totalCommits,
          criticalBugs: 0,
          majorBugs: 0,
          testCoverage: 0,
          buildStatus: "N/A",
        },
      };

      localStorage.setItem("selectedRepo", JSON.stringify(storedData));

      // -------------------------------
      // 5️⃣ Navigate to Dashboard
      // -------------------------------
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "28px",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>
          Analyze GitHub Repository
        </h2>

        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            marginBottom: "12px",
          }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
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
