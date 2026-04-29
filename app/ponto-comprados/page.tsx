"use client";

import { useEffect, useState } from "react";
import { getPurchasedPointsWithUsers } from "@/app/actions/raffle";
import { RAFFLE_CONFIG, RAFFLE_DERIVED } from "@/lib/constants";
import { StepLayout } from "@/components/StepLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Phone } from "lucide-react";

interface PointWithUser {
  number: number;
  user: {
    name: string;
    whatsapp: string;
  };
}

export default function PurchasedPointsPage() {
  const [purchasedPoints, setPurchasedPoints] = useState<PointWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getPurchasedPointsWithUsers();
      // Transform Prisma response to match our interface if needed
      setPurchasedPoints(data as any);
      setLoading(false);
    }
    loadData();
  }, []);

  const pointsMap = new Map(purchasedPoints.map(p => [p.number, p.user]));
  const allPoints = Array.from({ length: RAFFLE_CONFIG.TOTAL_POINTS }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <StepLayout 
      title="Administração de Pontos" 
      description="Visualize todos os números e quem os adquiriu."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allPoints.map((n) => {
          const buyer = pointsMap.get(n);
          const isSold = !!buyer;

          return (
            <Card key={n} className={`${isSold ? "border-primary bg-primary/5" : "opacity-50"}`}>
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  #{RAFFLE_DERIVED.POINT_LABEL(n)}
                </CardTitle>
                <Badge variant={isSold ? "default" : "secondary"}>
                  {isSold ? "Vendido" : "Disponível"}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {isSold ? (
                  <div className="space-y-2 text-sm mt-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{buyer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{buyer.whatsapp}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">Aguardando comprador</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </StepLayout>
  );
}
