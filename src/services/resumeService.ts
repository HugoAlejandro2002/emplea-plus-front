import { api } from "@/services/api";
import { ResumeReference, ResumeRequest, ResumeResponse } from "@/models/resume";

export const generateResume = async (data: ResumeRequest): Promise<ResumeResponse> => {
    const response = await api.post("/resume/generate", data);
    return response.data;
};

export const downloadResumePdf = async (data: ResumeResponse): Promise<string> => {
    const response = await api.post("/resume/download-pdf", data, {
        responseType: "blob",
    });
    return response.data;
};

export const getUserResumes = async (): Promise<ResumeReference[]> => {
  const res = await api.get("/resume");
  return res.data;
};

export const getResumeById = async (resumeId: string): Promise<ResumeResponse> => {
  const res = await api.get(`/resume/${resumeId}`);
  return res.data;
};

export const deleteResume = async (resumeId: string): Promise<string> => {
  const res = await api.delete(`/resume/${resumeId}`);
  return res.data;
};

export const renameResume = async (resumeId: string, newFilename: string): Promise<string> => {
  const res = await api.put(`/resume/${resumeId}/rename`, {
    filename: newFilename,
  });
  return res.data;
};