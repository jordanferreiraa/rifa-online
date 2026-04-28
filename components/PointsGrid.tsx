"use client";

import { RAFFLE_CONFIG } from "@/lib/constants";
import { useRaffleStore } from "@/lib/store";
import { PointCard } from "./PointCard";

export function PointsGrid() {
  const { selectedPoints, togglePoint } = useRaffleStore();
  
  const points = Array.from({ length: RAFFLE_CONFIG.TOTAL_POINTS }, (_, i) => i + 1);
  const reserved = new Set(RAFFLE_CONFIG.RESERVED_POINTS);

  return (
    <div 
      className="grid gap-2 mb-8"
      style={{
        gridTemplateColumns: `repeat(var(--grid-cols), minmax(0, 1fr))`
      } as any}
    >
      <style jsx>{`
        div {
          --grid-cols: ${RAFFLE_CONFIG.GRID_COLUMNS.mobile};
        }
        @media (min-width: 768px) {
          div {
            --grid-cols: ${RAFFLE_CONFIG.GRID_COLUMNS.tablet};
          }
        }
        @media (min-width: 1024px) {
          div {
            --grid-cols: ${RAFFLE_CONFIG.GRID_COLUMNS.desktop};
          }
        }
      `}</style>
      
      {points.map((n) => {
        const isReserved = reserved.has(n);
        const isSelected = selectedPoints.includes(n);
        
        let status: "available" | "selected" | "reserved" = "available";
        if (isReserved) status = "reserved";
        else if (isSelected) status = "selected";

        return (
          <PointCard
            key={n}
            number={n}
            status={status}
            onClick={() => !isReserved && togglePoint(n)}
          />
        );
      })}
    </div>
  );
}
