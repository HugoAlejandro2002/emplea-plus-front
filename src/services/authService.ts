import { AuthResponse } from "@/models/user";
import { api } from "./api";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function register(email: string, password: string) {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
}

export async function resetPassword(oldPassword: string, newPassword: string) {
  const res = await api.put("/auth/reset-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
}