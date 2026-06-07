const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const authApi = {
  signup: (payload) =>
    apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getProfile: () => apiRequest("/api/auth/me"),

  updateProfile: (payload) =>
    apiRequest("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
