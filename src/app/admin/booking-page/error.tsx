"use client";

import { useEffect } from "react";
import Button from "@/app/ui/components/button/Button";
import { ButtonColors, ButtonSizes } from "@/app/ui/components/button/Button";
import styles from "./error.module.scss";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Booking page error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <h1 className={styles.errorTitle}>Algo correu mal</h1>
        <p className={styles.errorMessage}>Ocorreu um erro ao carregar a página de configuração da página de marcações.</p>
        <div className={styles.errorActions}>
          <Button color={ButtonColors.BROWN} size={ButtonSizes.LG} onClick={reset}>
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
