"use client";

import { Banknote, Info } from "lucide-react";

export function CashSection() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
          <Banknote className="h-5 w-5 text-primary" />
          Pagamento em Dinheiro
        </h3>
        <p className="text-sm text-muted-foreground">
          Realize o pagamento pessoalmente com o organizador
        </p>
      </div>

      <div className="w-full space-y-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-primary/20 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm space-y-2">
            <p>
              Ao escolher esta opção, seus números ficarão reservados. 
            </p>
            <p className="font-semibold text-primary">
              Entre em contato com o organizador via{" "}
              <a 
                href="https://wa.me/5588998633123" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary/80"
              >
                WhatsApp
              </a>{" "}
              para combinar a entrega do valor.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-center text-muted-foreground bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
        ⚠️ Seus números só serão validados após o recebimento do dinheiro pelo organizador.
      </div>
    </div>
  );
}
