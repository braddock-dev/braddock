"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo deu errado!</h2>
        <p className="text-gray-600 mb-6">Ocorreu um erro ao carregar as estatísticas. Tente novamente.</p>

        <div className="space-y-3">
          <Button onClick={reset} variant="primary">
            Tentar Novamente
          </Button>

          <div className="text-sm text-gray-500">
            <p>Erro: {error.message}</p>
            {error.digest && <p className="mt-1">ID do erro: {error.digest}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
