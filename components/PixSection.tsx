"use client";

import { useState } from "react";
import { Copy, Check, User, Wallet } from "lucide-react";
import { RAFFLE_CONFIG } from "@/lib/constants";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function PixSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RAFFLE_CONFIG.PIX_KEY);
    setCopied(true);
    toast.success("Chave PIX copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Pagamento via PIX
        </h3>
        <p className="text-sm text-muted-foreground">
          Copie a chave abaixo para realizar o pagamento
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-primary font-bold">
            <User className="h-4 w-4" />
            <span>Titular da Conta</span>
          </div>
          <div className="text-sm font-semibold text-center">
            {RAFFLE_CONFIG.PIX_HOLDER_NAME}
          </div>
          <div className="text-xs text-muted-foreground">
            {RAFFLE_CONFIG.PIX_HOLDER_INFO}
          </div>
        </div>

        <div className="text-center">
          <span className="text-xs font-bold text-muted-foreground uppercase">
            Chave PIX ({RAFFLE_CONFIG.PIX_KEY_TYPE})
          </span>
          <div className="mt-1 p-3 bg-white dark:bg-slate-800 rounded border font-mono text-sm break-all">
            {RAFFLE_CONFIG.PIX_KEY}
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full h-12 gap-2" 
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar Chave PIX
            </>
          )}
        </Button>
      </div>
      
      <div className="text-xs text-center text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
        ⚠️ Após realizar o pagamento, clique no botão <strong>Confirmar Pagamento</strong> abaixo para garantir seus números.
      </div>
    </div>
  );
}
