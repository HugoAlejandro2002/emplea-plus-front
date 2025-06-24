import { describe, it, expect, vi, beforeEach } from "vitest";
import * as authService from "../../src/services/authService";
import { api } from "../../src/services/api";
import { AuthResponse } from "../../src/models/user";

vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn(),
    put: vi.fn(),
  },
}));

const dummyResponse: AuthResponse = {
  access_token: "fake-jwt-token",
  token_type: "bearer",
};

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login user", async () => {
    (api.post as any).mockResolvedValue({ data: dummyResponse });

    const result = await authService.login("test@mail.com", "123456");
    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@mail.com",
      password: "123456",
    });
    expect(result).toEqual(dummyResponse);
  });

  it("should register user", async () => {
    (api.post as any).mockResolvedValue({ data: { message: "ok" } });

    const result = await authService.register("new@mail.com", "abcdef");
    expect(api.post).toHaveBeenCalledWith("/auth/register", {
      email: "new@mail.com",
      password: "abcdef",
    });
    expect(result).toEqual({ message: "ok" });
  });

  it("should reset password", async () => {
    (api.put as any).mockResolvedValue({ data: { message: "Password updated" } });

    const result = await authService.resetPassword("oldpass", "newpass");
    expect(api.put).toHaveBeenCalledWith("/auth/reset-password", {
      oldPassword: "oldpass",
      newPassword: "newpass",
    });
    expect(result).toEqual({ message: "Password updated" });
  });
});
