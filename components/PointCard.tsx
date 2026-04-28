"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { RAFFLE_DERIVED } from "@/lib/constants";

interface PointCardProps {
  number: number;
  status: "available" | "selected" | "reserved";
  onClick: () => void;
}

export function PointCard({ number, status, onClick }: PointCardProps) {
  const isSelected = status === "selected";
  const isReserved = status === "reserved";

  return (
    <button
      onClick={onClick}
      disabled={isReserved}
      className={cn(
        "relative flex aspect-square w-full items-center justify-center rounded-md border text-sm font-semibold transition-all duration-200",
        status === "available" && "bg-white border-slate-200 text-slate-700 hover:border-primary hover:text-primary dark:bg-slate-900 dark:border-slate-800",
        status === "selected" && "bg-primary border-primary text-white shadow-lg scale-105 z-[1]",
        status === "reserved" && "bg-slate-200 border-slate-200 text-slate-400 cursor-not-allowed opacity-60 dark:bg-slate-800 dark:border-slate-800"
      )}
    >
      {isSelected ? (
        <Check className="h-4 w-4 stroke-[3px]" />
      ) : (
        RAFFLE_DERIVED.POINT_LABEL(number)
      )}
    </button>
  );
}
