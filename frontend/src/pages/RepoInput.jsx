import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateDummyMetrics } from "../utils/dummyMetrics";
import AuthLayout from "../components/common/AuthLayout";

const LOADING_STEPS = [
  "Connecting to GitHub...",
  "Fetching repository details...",
  "Counting commits...",
  "Generating metrics dashboard...",
];

function RepoInput() {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingStep((prev) =>
        prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 900);

    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    setLoadingStep(0);

    try {
      const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

      if (!match) {
        throw new Error("Invalid GitHub repository URL");
      }

      const owner = match[1];
      const repo = match[2];

      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      if (!repoRes.ok) {
        throw new Error("Repository not found or API limit exceeded");
      }

      const repoData = await repoRes.json();
      setLoadingStep(2);

      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
      );

      const linkHeader = commitsRes.headers.get("link");

      let totalCommits = 0;

      if (linkHeader) {
        const pageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (pageMatch) {
          totalCommits = parseInt(pageMatch[1], 10);
        }
      } else {
        const commitsJson = await commitsRes.json();
        totalCommits = commitsJson.length;
      }

      setLoadingStep(3);

      const dummyMetrics = generateDummyMetrics(`${owner}/${repo}`, totalCommits);

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
          criticalBugs: dummyMetrics.criticalBugs,
          majorBugs: dummyMetrics.majorBugs,
          testCoverage: dummyMetrics.testCoverage,
          buildStatus: "N/A",
        },
        chartData: {
          testCoverageHistory: dummyMetrics.testCoverageHistory,
          monthlyCommits: dummyMetrics.monthlyCommits,
          bugSeverity: dummyMetrics.bugSeverity,
        },
      };

      localStorage.setItem("selectedRepo", JSON.stringify(storedData));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleAnalyze();
    }
  };

  return (
    <AuthLayout
      badge="Repository analysis"
      icon="⚡"
      title="Analyze GitHub Repo"
      subtitle="Paste any public GitHub URL to generate bugs, coverage, and commit insights instantly."
      wide
    >
      <div className="auth-features">
        <span className="auth-feature-pill">
          <span>🐛</span> Bug metrics
        </span>
        <span className="auth-feature-pill">
          <span>🧪</span> Test coverage
        </span>
        <span className="auth-feature-pill">
          <span>📦</span> Commit trends
        </span>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <div className={loading ? "auth-scan-line" : ""}>
        <label className="auth-label" htmlFor="repo-url">
          GitHub Repository URL
        </label>
        <input
          id="repo-url"
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="auth-input"
          disabled={loading}
          style={{ marginBottom: loading ? 0 : 20 }}
        />
      </div>

      {loading && (
        <div className="auth-loading-panel">
          {LOADING_STEPS.map((step, index) => (
            <div
              key={step}
              className={`auth-loading-step ${
                index < loadingStep
                  ? "done"
                  : index === loadingStep
                  ? "active"
                  : ""
              }`}
            >
              {index < loadingStep ? (
                <span className="auth-check">✓</span>
              ) : index === loadingStep ? (
                <span className="auth-spinner" />
              ) : (
                <span style={{ width: 16, height: 16, flexShrink: 0 }} />
              )}
              {step}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || !repoUrl.trim()}
        className={`auth-btn ${loading ? "auth-btn-loading" : ""}`}
        style={{ marginTop: loading ? 20 : 0 }}
      >
        {loading ? "Analyzing repository..." : "Analyze Repository"}
      </button>
    </AuthLayout>
  );
}

export default RepoInput;
