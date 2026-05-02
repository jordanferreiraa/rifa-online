"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PatternFormat } from "react-number-format";
import { Search, Ticket, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRaffleStore } from "@/lib/store";
import { StepLayout } from "@/components/StepLayout";
import { getPointsByWhatsapp } from "@/app/actions/raffle";
import { RAFFLE_DERIVED } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  whatsapp: z.string().min(14, {
    message: "Informe um WhatsApp válido: (XX) XXXXX-XXXX",
  }),
});

export default function RegistrationPage() {
  const router = useRouter();
  const { userData, setUserData, setCurrentStep } = useRaffleStore();
  const [showSearch, setShowSearch] = useState(false);
  const [searchWhatsapp, setSearchWhatsapp] = useState("");
  const [searchError, setSearchError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      whatsapp: userData?.whatsapp || "",
    },
  });

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUserData(values);
    router.push("/pontos");
  }

  function handleSearch() {
    if (searchWhatsapp.length < 14) {
      setSearchError("Informe um WhatsApp válido.");
      return;
    }

    setSearchError("");
    // Redireciona para a nova rota de busca
    router.push(`/busca?whatsapp=${encodeURIComponent(searchWhatsapp)}`);
  }

  return (
    <StepLayout
      title="Participe da Nossa Rifa"
      description="Escolha seus números e boa sorte!"
    >
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Dados do Participante</CardTitle>
            <CardDescription className="text-center">
              Preencha seus dados para começar a escolher seus pontos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome aqui" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="(##) #####-####"
                          mask="_"
                          customInput={Input}
                          placeholder="(00) 00000-0000"
                          onValueChange={(values) => {
                            field.onChange(values.formattedValue);
                          }}
                          value={field.value}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg">
                  Continuar para os Pontos
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            onClick={() => setShowSearch(!showSearch)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {showSearch ? "Ocultar consulta" : "Já comprou? Consulte seus números aqui"}
          </Button>
        </div>

        {showSearch && (
          <Card className="border-dashed border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5" />
                Consultar Meus Pontos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>WhatsApp Cadastrado</Label>
                <div className="flex gap-2">
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    customInput={Input}
                    placeholder="(00) 00000-0000"
                    onValueChange={(values) => {
                      setSearchWhatsapp(values.formattedValue);
                    }}
                    value={searchWhatsapp}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch} 
                    className="min-w-[100px]"
                  >
                    Buscar
                  </Button>
                </div>
              </div>

              {searchError && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  {searchError}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StepLayout>
  );
}
