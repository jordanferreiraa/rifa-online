"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRaffleStore } from "@/lib/store";
import { StepLayout } from "@/components/StepLayout";
import { RAFFLE_CONFIG, RAFFLE_DERIVED } from "@/lib/constants";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, RefreshCw, Ticket } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();
  const { 
    userData, 
    selectedPoints, 
    paymentConfirmed, 
    setCurrentStep, 
    clearSelectedPoints 
  } = useRaffleStore();

  useEffect(() => {
    if (!paymentConfirmed) {
      router.push("/");
    }
    setCurrentStep(4);
  }, [paymentConfirmed, router, setCurrentStep]);

  if (!paymentConfirmed || !userData) return null;

  const handleBuyMore = () => {
    clearSelectedPoints();
    router.push("/pontos");
  };

  const handleViewPoints = () => {
    clearSelectedPoints();
    router.push(`/busca?whatsapp=${encodeURIComponent(userData.whatsapp)}`);
  };

  return (
    <StepLayout>
      <div className="max-w-md mx-auto text-center">
        <SuccessAnimation />
        
        <h2 className="text-3xl font-bold mb-2">Sucesso!</h2>
        <p className="text-muted-foreground mb-8">
          Seu pagamento foi confirmado e seus pontos estão garantidos.
        </p>

        <Card className="mb-8 border-2 border-green-100 dark:border-green-900/30">
          <CardContent className="pt-6 space-y-4">
            <div className="text-sm text-muted-foreground uppercase font-bold tracking-widest">
              Números Comprados Agora
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedPoints.map((n) => (
                <div 
                  key={n} 
                  className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-lg font-bold px-3 py-1 rounded-md border border-green-200 dark:border-green-800"
                >
                  {RAFFLE_DERIVED.POINT_LABEL(n)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Participante: </span>
              <span className="font-bold">{userData.name}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button 
            className="w-full h-16 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg gap-2"
            onClick={() => window.open(RAFFLE_CONFIG.WHATSAPP_GROUP_LINK, "_blank")}
          >
            <MessageCircle className="h-6 w-6" />
            Entrar no Grupo de WhatsApp
          </Button>

          <Button 
            variant="secondary"
            className="w-full h-14 font-bold gap-2"
            onClick={handleViewPoints}
          >
            <Ticket className="h-5 w-5" />
            Ver todos os meus pontos
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-14 font-bold gap-2"
            onClick={handleBuyMore}
          >
            <RefreshCw className="h-5 w-5" />
            Comprar mais pontos
          </Button>
        </div>
      </div>
    </StepLayout>
  );
}
