import { useState, useEffect } from "react";
import * as authService from "@/services/authService";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    localStorage.setItem("token", res.access_token);
    setToken(res.access_token);
  };

  const register = async (email: string, password: string) => {
    const res = await authService.register(email, password);
    return res.message;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading,
  };
}