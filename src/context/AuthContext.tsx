import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminData {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: AdminData | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { API_BASE } from "@/config";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("dd_admin_token"));
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("dd_admin_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
          setToken(storedToken);
        } else {
          localStorage.removeItem("dd_admin_token");
          setToken(null);
          setAdmin(null);
        }
      } catch {
        localStorage.removeItem("dd_admin_token");
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("dd_admin_token", data.token);
        setToken(data.token);
        setAdmin(data.admin);
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch {
      return { success: false, message: "Network error. Please check if the server is running." };
    }
  };

  const logout = () => {
    localStorage.removeItem("dd_admin_token");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !!admin,
        admin,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
