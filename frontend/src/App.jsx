import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import RepoInput from "./pages/RepoInput";
import Dashboard from "./pages/Dashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";

/* 🔒 Protected Route */
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth pages */}
          <Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/repo-input" element={<RepoInput />} />
<Route path="/dashboard" element={<Dashboard />} />


          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* After login */}
          <Route
            path="/repo"
            element={
              <PrivateRoute>
                <RepoInput />
              </PrivateRoute>
            }
          />

          {/* After repo analysis */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
