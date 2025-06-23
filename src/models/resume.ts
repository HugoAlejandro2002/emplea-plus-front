export interface PersonalData {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
}

export interface Education {
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    notes?: string;
}

export interface ExperienceInput {
    projectName: string;
    role: string;
    achievements: string;
    teamwork: string;
    coordination: string;
    presentation: string;
}

export interface Skill {
    skill: string;
    level: string;
}

export interface Language {
    language: string;
    level: string;
}

export interface Certification {
    course: string;
    provider: string;
    year: string;
    certificate?: string;
}

export interface ProfessionalSummary {
    summary: string;
}

export interface ResumeRequest {
    personalData: PersonalData;
    education: Education[];
    experience: ExperienceInput[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
    professionalSummary: ProfessionalSummary;
}

export interface ResumeResponse {
  fullName: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
  education: {
    institution: string;
    degree: string;
    startYear: number;
    endYear: number;
    description: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    responsibilities: string[];
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  languages: {
    name: string;
    proficiency: string;
  }[];
  certifications: {
    name: string;
    institution: string;
    year: number;
  }[];
}


export interface ResumeReference {
  id: string;
  filename: string;
  created_at: string;
}
