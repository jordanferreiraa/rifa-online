"use client";

import { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";
import { RAFFLE_CONFIG } from "@/lib/constants";

interface StepLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function StepLayout({ children, title, description }: StepLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <header className="bg-white dark:bg-slate-900 border-b py-6 px-4 mb-8 text-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-primary mb-1">
          {RAFFLE_CONFIG.RAFFLE_NAME}
        </h1>
        <p className="text-muted-foreground text-sm">
          {RAFFLE_CONFIG.RAFFLE_PRIZE}
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <ProgressBar />
        
        {(title || description) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
