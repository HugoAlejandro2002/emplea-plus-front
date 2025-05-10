import { ExperienceFormValues } from "./schema";

export const experienceFieldMeta: {
    name: keyof ExperienceFormValues["experience"][0];
    label: string;
    placeholder: string;
}[] = [
        {
            name: "projectName",
            label: "Nombre del proyecto o actividad",
            placeholder: "Feria científica, voluntariado, hackathon, etc."
        },
        {
            name: "role",
            label: "Rol desempeñado",
            placeholder: "Diseñador, Desarrollador, Coordinador..."
        },
        {
            name: "achievements",
            label: "Logros o aprendizajes",
            placeholder: "¿Qué aprendiste? ¿Qué conseguiste?"
        },
        {
            name: "teamwork",
            label: "Trabajo en equipo o liderazgo",
            placeholder: "¿Lideraste o colaboraste con otros?"
        },
        {
            name: "coordination",
            label: "Coordinación con otros",
            placeholder: "¿Con qué área o personas coordinaste?"
        },
        {
            name: "presentation",
            label: "Presentación o entrega del resultado",
            placeholder: "¿A quién se lo presentaste? ¿Hubo una exposición?"
        }
    ];
