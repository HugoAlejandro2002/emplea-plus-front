import { useState } from 'react';

export const useStepForm = (maxSteps: number) => {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, maxSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return { step, next, prev };
};
