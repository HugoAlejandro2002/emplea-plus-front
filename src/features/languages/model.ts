export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface LanguageEntry {
    language: string;
    level: LanguageLevel;
}

export interface LanguagesFormValues {
    languages: LanguageEntry[];
}
