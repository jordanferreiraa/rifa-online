"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRaffleStore } from "@/lib/store";
import { StepLayout } from "@/components/StepLayout";
import { PointsGrid } from "@/components/PointsGrid";
import { StickyCheckoutBar } from "@/components/StickyCheckoutBar";
import { getPurchasedPoints } from "@/app/actions/raffle";

export default function PointsSelectionPage() {
  const router = useRouter();
  const { userData, setCurrentStep, setPurchasedPoints } = useRaffleStore();

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
    setCurrentStep(2);

    // Fetch purchased points from database
    const fetchPoints = async () => {
      const points = await getPurchasedPoints();
      setPurchasedPoints(points);
    };
    fetchPoints();
  }, [userData, router, setCurrentStep, setPurchasedPoints]);

  if (!userData) return null;

  return (
    <StepLayout
      title="Escolha seus números"
      description="Clique nos números desejados para selecionar."
    >
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800" />
          <span className="text-sm">Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-sm">Selecionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <span className="text-sm">Indisponível</span>
        </div>
      </div>

      <PointsGrid />
      
      <div className="h-20" /> {/* Spacer for sticky bar */}
      <StickyCheckoutBar />
    </StepLayout>
  );
}
