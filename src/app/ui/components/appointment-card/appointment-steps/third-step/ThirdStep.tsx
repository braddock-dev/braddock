import styles from "./ThirdStep.module.scss";
import Input from "@/app/ui/components/input/Input";
import React from "react";

export default function ThirdStep() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.title}>INFORMAÇÃO PESSOAL:</p>
        <div className={styles.formInputs}>
          <Input
            type={"text"}
            inputMode={"text"}
            name={"name"}
            placeholder={"Seu Nome"}
            floatingMode
            autoComplete={"name"}
          />

          <Input
            type={"tel"}
            inputMode={"tel"}
            name={"phone"}
            autoComplete={"tel"}
            placeholder={"Seu Contacto"}
            floatingMode
          />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.title}>MEU AGENDAMENTO:</p>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <p className={styles.itemName}>Serviço:</p>
            <p className={styles.itemValue}>Corte de Cabelo</p>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.itemName}>Data:</p>
            <p className={styles.itemValue}>10 de Agosto às 10PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
