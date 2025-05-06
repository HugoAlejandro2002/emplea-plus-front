import { formBlueprint } from "../constants/formBlueprint";

export const formatFormDataForBackend = (formData: Record<string, any>) => {
  const result: Record<string, any> = {};

  for (const section of formBlueprint) {
    const value = formData[section.section];

    if (!value) continue;

    if (section.repeatable) {
      // Si ya es un array lo dejamos así
      result[section.section] = Array.isArray(value) ? value : [value];
    } else {
      result[section.section] = value;
    }
  }

  return result;
};