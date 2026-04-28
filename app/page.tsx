"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PatternFormat } from "react-number-format";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRaffleStore } from "@/lib/store";
import { StepLayout } from "@/components/StepLayout";

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

  return (
    <StepLayout
      title="Faça seu cadastro"
      description="Preencha seus dados para participar da rifa."
    >
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Dados do Participante</CardTitle>
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
    </StepLayout>
  );
}
