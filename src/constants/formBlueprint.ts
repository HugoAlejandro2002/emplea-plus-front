export const formBlueprint = [
    {
        section: "Datos personales",
        fields: [
            {
                name: "fullName",
                label: "¿Cuál es tu nombre completo?",
                type: "text",
                placeholder: "Ana María Gutiérrez"
            },
            {
                name: "email",
                label: "¿Cuál es tu correo electrónico?",
                type: "email",
                placeholder: "ana@example.com"
            },
            {
                name: "phone",
                label: "¿Cuál es tu número de teléfono?",
                type: "text",
                placeholder: "+591 71234567"
            },
            {
                name: "country",
                label: "¿En qué país vives?",
                type: "text",
                placeholder: "Bolivia"
            },
            {
                name: "city",
                label: "¿En qué ciudad vives?",
                type: "text",
                placeholder: "La Paz"
            },
            {
                name: "birthDate",
                label: "¿Cuál es tu fecha de nacimiento?",
                type: "date",
                placeholder: ""
            }
        ]
    },
    {
        section: "Formación académica",
        repeatable: true,
        fields: [
            {
                name: "institution",
                label: "¿Dónde estudiaste?",
                type: "text",
                placeholder: "Universidad Privada Boliviana"
            },
            {
                name: "degree",
                label: "¿Qué título o carrera cursaste?",
                type: "text",
                placeholder: "Ingeniería de Sistemas"
            },
            {
                name: "startYear",
                label: "¿En qué año empezaste?",
                type: "number",
                placeholder: "2018"
            },
            {
                name: "endYear",
                label: "¿En qué año terminaste?",
                type: "number",
                placeholder: "2023"
            },
            {
                name: "notes",
                label: "¿Algo importante que quieras destacar?",
                type: "textarea",
                placeholder: "Graduado con honores"
            }
        ]
    },
    {
        section: "Experiencia en proyectos o actividades",
        repeatable: true,
        fields: [
            {
                name: "projectName",
                label: "¿En qué proyecto, voluntariado o actividad participaste?",
                type: "text",
                placeholder: "Feria de ciencia del colegio"
            },
            {
                name: "role",
                label: "¿Qué hiciste exactamente?",
                type: "textarea",
                placeholder: "Diseñé e instalé el panel solar"
            },
            {
                name: "achievements",
                label: "¿Qué lograste o aprendiste con eso?",
                type: "textarea",
                placeholder: "Aprendí sobre energía renovable y liderazgo"
            },
            {
                name: "teamwork",
                label: "¿Trabajaste en equipo o lideraste a alguien?",
                type: "text",
                placeholder: "Sí, lideré un grupo de 3 personas"
            },
            {
                name: "coordination",
                label: "¿Con quién coordinaste?",
                type: "text",
                placeholder: "Con el área de logística"
            },
            {
                name: "presentation",
                label: "¿A quién presentaste o entregaste el resultado?",
                type: "text",
                placeholder: "A docentes y jurado en la feria"
            }
        ]
    },
    {
        section: "Habilidades",
        repeatable: true,
        fields: [
            {
                name: "skill",
                label: "¿Qué herramienta, lenguaje o habilidad tienes?",
                type: "text",
                placeholder: "Excel"
            },
            {
                name: "level",
                label: "¿Qué nivel tienes?",
                type: "select",
                options: ["Básico", "Intermedio", "Avanzado"],
                placeholder: ""
            }
        ]
    },
    {
        section: "Idiomas",
        repeatable: true,
        fields: [
            {
                name: "language",
                label: "¿Qué idioma hablas?",
                type: "text",
                placeholder: "Inglés"
            },
            {
                name: "level",
                label: "¿Qué nivel tienes?",
                type: "select",
                options: ["Básico", "Intermedio", "Avanzado"],
                placeholder: ""
            }
        ]
    },
    {
        section: "Cursos o certificaciones",
        repeatable: true,
        fields: [
            {
                name: "course",
                label: "¿Qué curso hiciste?",
                type: "text",
                placeholder: "Curso de Git"
            },
            {
                name: "provider",
                label: "¿Dónde lo hiciste?",
                type: "text",
                placeholder: "Coursera"
            },
            {
                name: "year",
                label: "¿En qué año lo terminaste?",
                type: "number",
                placeholder: "2022"
            },
            {
                name: "certificate",
                label: "¿Tienes un enlace al certificado? (opcional)",
                type: "text",
                placeholder: "https://..."
            }
        ]
    },
    {
        section: "Extracto profesional",
        fields: [
            {
                name: "summary",
                label: "¿Cómo te describirías como profesional o estudiante?",
                type: "textarea",
                placeholder: "Soy una persona curiosa, con ganas de aprender y aportar..."
            }
        ]
    }
];
