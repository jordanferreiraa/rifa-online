"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRaffleStore } from "@/lib/store";
import { StepLayout } from "@/components/StepLayout";
import { RAFFLE_CONFIG, RAFFLE_DERIVED } from "@/lib/constants";
import { PixSection } from "@/components/PixSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

import { purchasePoints } from "@/app/actions/raffle";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const { userData, selectedPoints, setCurrentStep, confirmPayment } = useRaffleStore();

  useEffect(() => {
    if (!userData) {
      router.push("/");
    } else if (selectedPoints.length === 0 && !isConfirming) {
      router.push("/pontos");
    }
    setCurrentStep(3);
  }, [userData, selectedPoints, router, setCurrentStep, isConfirming]);

  if (!userData || (selectedPoints.length === 0 && !isConfirming)) return null;

  const total = selectedPoints.length * RAFFLE_CONFIG.PRICE_PER_POINT;

  const handleConfirm = async () => {
    setIsConfirming(true);
    
    try {
      const result = await purchasePoints(userData, selectedPoints);
      
      if (result.success) {
        // Redireciona primeiro, depois limpa o estado
        router.push("/confirmacao");
        confirmPayment();
      } else {
        toast.error("Erro ao processar compra: " + (result.error || "Tente novamente."));
        setIsConfirming(false);
      }
    } catch (error) {
      toast.error("Erro de conexão. Verifique se o banco de dados está configurado.");
      setIsConfirming(false);
    }
  };

  return (
    <StepLayout
      title="Resumo e Pagamento"
      description="Confira os detalhes e realize o pagamento via PIX."
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Comprador</span>
              <span className="font-semibold">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">WhatsApp</span>
              <span className="font-semibold">{userData.whatsapp}</span>
            </div>
            
            <Separator />
            
            <div>
              <span className="text-muted-foreground block mb-2">Números selecionados</span>
              <div className="flex flex-wrap gap-2">
                {selectedPoints.map((n) => (
                  <div 
                    key={n} 
                    className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded border border-primary/20"
                  >
                    {RAFFLE_DERIVED.POINT_LABEL(n)}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <PixSection />

          <Button           
            onClick={handleConfirm} 
            disabled={isConfirming}
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg"
          >
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar Pagamento"
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => router.push("/pontos")}
            disabled={isConfirming}
          >
            Voltar e escolher mais números
          </Button>
        </div>
      </div>
    </StepLayout>
  );
}
