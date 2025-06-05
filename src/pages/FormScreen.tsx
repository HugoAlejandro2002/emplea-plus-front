import { useState } from "react";
import ResumeFormFlow from "@/components/form/ResumeFormFlow";
import FormIntroMessage from "@/components/form/FormIntroMessage";

export default function FormScreen() {
  const [started, setStarted] = useState(false);

  return (
    <div className="h-full w-full px-6 py-8 bg-white rounded-lg shadow-sm overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {!started ? (
          <FormIntroMessage onStart={() => setStarted(true)} />
        ) : (
          <div className="space-y-6">
            <ResumeFormFlow />
          </div>
        )}
      </div>
    </div>
  );
}
