import { describe, it, expect, vi, beforeEach } from "vitest";
import * as resumeService from "../../src/services/resumeService";
import { api } from "../../src/services/api";
import { ResumeRequest, ResumeResponse } from "../../src/models/resume";

vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}));

const dummyResume: ResumeResponse = {
  fullName: "Juan Pérez",
  summary: "Desarrollador fullstack",
  contact: { email: "juan@test.com", phone: "123456", linkedin: "juan" },
  education: [],
  experience: [],
  skills: [],
  languages: [],
  certifications: [],
};

describe("resumeService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should generate a resume", async () => {
    (api.post as any).mockResolvedValue({ data: dummyResume });

    const result = await resumeService.generateResume({} as ResumeRequest);
    expect(api.post).toHaveBeenCalledWith("/resume/generate", {});
    expect(result).toEqual(dummyResume);
  });

  it("should download resume PDF", async () => {
    const fakeBlob = new Blob(["PDF content"]);
    (api.post as any).mockResolvedValue({ data: fakeBlob });

    const result = await resumeService.downloadResumePdf(dummyResume);
    expect(api.post).toHaveBeenCalledWith("/resume/download-pdf", dummyResume, { responseType: "blob" });
    expect(result).toBe(fakeBlob);
  });

  it("should get user resumes", async () => {
    const resumeList = [{ id: "123", filename: "cv.pdf", created_at: "2024-01-01" }];
    (api.get as any).mockResolvedValue({ data: resumeList });

    const result = await resumeService.getUserResumes();
    expect(api.get).toHaveBeenCalledWith("/resume");
    expect(result).toEqual(resumeList);
  });

  it("should get resume by id", async () => {
    (api.get as any).mockResolvedValue({ data: dummyResume });

    const result = await resumeService.getResumeById("abc123");
    expect(api.get).toHaveBeenCalledWith("/resume/abc123");
    expect(result).toEqual(dummyResume);
  });

  it("should delete resume", async () => {
    (api.delete as any).mockResolvedValue({ data: "ok" });

    const result = await resumeService.deleteResume("abc123");
    expect(api.delete).toHaveBeenCalledWith("/resume/abc123");
    expect(result).toBe("ok");
  });

  it("should rename resume", async () => {
    (api.put as any).mockResolvedValue({ data: "renamed" });

    const result = await resumeService.renameResume("abc123", "nuevo_nombre.pdf");
    expect(api.put).toHaveBeenCalledWith("/resume/abc123/rename", {
      filename: "nuevo_nombre.pdf",
    });
    expect(result).toBe("renamed");
  });
});
