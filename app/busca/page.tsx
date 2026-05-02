"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Ticket, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StepLayout } from "@/components/StepLayout";
import { getPointsByWhatsapp } from "@/app/actions/raffle";
import { RAFFLE_DERIVED } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { useRaffleStore } from "@/lib/store";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const whatsapp = searchParams.get("whatsapp");
  const { setUserData } = useRaffleStore();
  
  const [isSearching, setIsSearching] = useState(true);
  const [searchResults, setSearchResults] = useState<{
    points: number[];
    userName: string;
  } | null>(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    async function performSearch() {
      if (!whatsapp) {
        setSearchError("Número de WhatsApp não fornecido.");
        setIsSearching(false);
        return;
      }

      try {
        const result = await getPointsByWhatsapp(whatsapp);
        if (result.success) {
          setSearchResults({
            points: result.points || [],
            userName: result.userName || "",
          });
        } else {
          setSearchError(result.error || "Usuário não encontrado.");
        }
      } catch (error) {
        setSearchError("Erro ao conectar com o servidor.");
      } finally {
        setIsSearching(false);
      }
    }

    performSearch();
  }, [whatsapp]);

  const handleBuyMore = () => {
    if (searchResults && whatsapp) {
      setUserData({
        name: searchResults.userName,
        whatsapp: whatsapp
      });
      router.push("/pontos");
    }
  };

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Buscando seus números...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.push("/")}
        className="mb-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para o Início
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Resultado da Consulta
          </CardTitle>
          <CardDescription>
            Números vinculados ao WhatsApp: {whatsapp}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {searchError ? (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-4 rounded-md">
              <AlertCircle className="h-4 w-4" />
              {searchError}
            </div>
          ) : searchResults ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium mb-1">Participante:</p>
                <p className="text-lg font-bold">{searchResults.userName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  {searchResults.points.length > 0 
                    ? `Você possui ${searchResults.points.length} ponto(s) adquirido(s):`
                    : "Você ainda não possui pontos comprados."
                  }
                </p>
                
                {searchResults.points.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {searchResults.points.map((n) => (
                      <Badge key={n} variant="secondary" className="px-4 py-2 text-base font-mono flex gap-2 items-center">
                        <Ticket className="h-4 w-4" />
                        {RAFFLE_DERIVED.POINT_LABEL(n)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg" 
                onClick={handleBuyMore}
              >
                Comprar mais pontos
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full mt-4" 
              onClick={() => router.push("/")}
            >
              Ir para cadastro
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SearchPage() {
  return (
    <StepLayout
      title="Meus Números"
      description="Veja abaixo os números que você já garantiu."
    >
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <SearchResults />
      </Suspense>
    </StepLayout>
  );
}
