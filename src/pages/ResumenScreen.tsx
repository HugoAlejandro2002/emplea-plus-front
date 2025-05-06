import { useState } from "react";

const mockData = {
  fullName: "Hugo Alejandro Apaza Huaycho",
  contact: {
    email: "apazahuaychohugoalejandro@gmail.com",
    phone: "+591 71576500",
    linkedin: "https://linkedin.com/in/alejandro-apaza2002"
  },
  summary: "Desarrollador de software apasionado por la automatización, la IA y la mejora continua...",
  education: [
    {
      institution: "Universidad Privada Boliviana",
      degree: "Ingeniería de Sistemas",
      startDate: "2021-01-01",
      endDate: "2025-12-31",
      description: "Promedio 96.63. Becario Talento con sólida base en ciencias computacionales."
    }
  ],
  experience: [
    {
      company: "AcceptGO",
      role: "Software Developer",
      startDate: "2022-03-01",
      endDate: null,
      achievements: [
        "Desarrollé un sistema web con Next.js para una red profesional con IA.",
        "Automatización de recordatorios con WhatsApp usando AWS Lambda y FastAPI.",
        "Evaluador de CV con AWS y Python, reduciendo el tiempo de revisión en un 95%."
      ]
    }
  ],
  skills: [
    { name: "Python", level: "Avanzado" },
    { name: "AWS", level: "Intermedio" }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B2" }
  ]
};

const ResumenScreen = () => {
  const [cvData, setCvData] = useState(mockData);

  const updateField = (section: string, key: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateArrayItem = (
    section: string,
    index: number,
    key: string,
    value: string
  ) => {
    const updatedArray = [...(cvData as any)[section]];
    updatedArray[index][key] = value;
    setCvData((prev) => ({ ...prev, [section]: updatedArray }));
  };

  const updateAchievement = (
    expIndex: number,
    achIndex: number,
    value: string
  ) => {
    const updatedExperience = [...cvData.experience];
    updatedExperience[expIndex].achievements[achIndex] = value;
    setCvData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleSubmit = () => {
    console.log("✅ JSON final para generar el CV:", cvData);
    // axios.post("/api/generar-cv", cvData)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-primary">Resumen Generado</h1>

      <section>
        <label className="font-medium">Nombre completo</label>
        <input
          type="text"
          value={cvData.fullName}
          onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6 mb-2">Resumen profesional</h2>
        <textarea
          value={cvData.summary}
          onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
          className="w-full border p-2 rounded"
          rows={4}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6 mb-2">Educación</h2>
        {cvData.education.map((edu, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input
              className="w-full border p-2 rounded"
              value={edu.institution}
              onChange={(e) => updateArrayItem("education", i, "institution", e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              value={edu.degree}
              onChange={(e) => updateArrayItem("education", i, "degree", e.target.value)}
            />
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) => updateArrayItem("education", i, "startDate", e.target.value)}
            />
            <input
              type="date"
              value={edu.endDate}
              onChange={(e) => updateArrayItem("education", i, "endDate", e.target.value)}
            />
            <textarea
              value={edu.description}
              onChange={(e) => updateArrayItem("education", i, "description", e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mt-6 mb-2">Experiencia</h2>
        {cvData.experience.map((exp, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input
              className="w-full border p-2 rounded"
              value={exp.company}
              onChange={(e) => updateArrayItem("experience", i, "company", e.target.value)}
            />
            <input
              className="w-full border p-2 rounded"
              value={exp.role}
              onChange={(e) => updateArrayItem("experience", i, "role", e.target.value)}
            />
            <input
              type="date"
              value={exp.startDate}
              onChange={(e) => updateArrayItem("experience", i, "startDate", e.target.value)}
            />
            <input
              type="date"
              value={exp.endDate ?? ""}
              onChange={(e) => updateArrayItem("experience", i, "endDate", e.target.value)}
            />
            <p className="font-medium">Logros</p>
            {exp.achievements.map((ach: string, j: number) => (
              <textarea
                key={j}
                value={ach}
                onChange={(e) => updateAchievement(i, j, e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />
            ))}
          </div>
        ))}
      </section>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
      >
        Generar CV Final
      </button>
    </div>
  );
};

export default ResumenScreen;
