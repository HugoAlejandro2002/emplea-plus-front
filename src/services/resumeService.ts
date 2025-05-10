import { api } from "@/services/api";
import { ResumeRequest, ResumeResponse } from "@/models/resume";

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