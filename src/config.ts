export const BACKEND_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://drizzledropj-2.onrender.com";

export const API_BASE = `${BACKEND_BASE}/api`;
