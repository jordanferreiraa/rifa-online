"use client";

import { useRouter } from "next/navigation";
import { RAFFLE_CONFIG } from "@/lib/constants";
import { useRaffleStore } from "@/lib/store";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export function StickyCheckoutBar() {
  const router = useRouter();
  const { selectedPoints } = useRaffleStore();
  
  const count = selectedPoints.length;
  const total = count * RAFFLE_CONFIG.PRICE_PER_POINT;

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            {count} {count === 1 ? "ponto selecionado" : "pontos selecionados"}
          </span>
          <span className="text-xl font-bold text-primary">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        
        <Button 
          onClick={() => router.push("/checkout")}
          className="flex-1 max-w-[200px] h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Comprar Agora
        </Button>
      </div>
    </div>
  );
}
