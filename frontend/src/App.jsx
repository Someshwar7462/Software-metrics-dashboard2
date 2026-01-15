import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RepoInput from "./pages/RepoInput";
import Dashboard from "./pages/Dashboard";

import { ThemeProvider } from "./context/ThemeContext";

/**
 * App Flow:
 * 1. "/"        → RepoInput (GitHub URL input page)
 * 2. "/dashboard" → Dashboard (opens AFTER repo is saved)
 */

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* STEP 1: Repo Input Page */}
          <Route path="/" element={<RepoInput />} />

          {/* STEP 2: Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireRepo>
                <Dashboard />
              </RequireRepo>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

/**
 * 🔒 Guard Route:
 * If repo not selected → redirect to RepoInput
 */
function RequireRepo({ children }) {
  const repo = localStorage.getItem("selectedRepo");

  if (!repo) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default App;
