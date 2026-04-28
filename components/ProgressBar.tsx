"use client";

import { useRaffleStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: 1, label: "Cadastro" },
  { id: 2, label: "Pontos" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Sucesso" },
];

export function ProgressBar() {
  const currentStep = useRaffleStore((state) => state.currentStep);
  
  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8 px-4">
      <div className="flex justify-between mb-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`text-xs font-medium transition-colors ${
              currentStep >= step.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  );
}
