import styles from "./BasePricesTable.module.scss";

const prices = [
  {
    name: "Corte de cabelo",
    price: "10€",
  },
  {
    name: "Barba",
    price: "5€",
  },
  {
    name: "Corte de cabelo + Barba",
    price: "15€",
  },
  {
    name: "Corte de cabelo + Barba + Cera",
    price: "20€",
  },
  {
    name: "Corte de cabelo + Barba + Cera + Máscara",
    price: "25€",
  },
];

export default function BasePricesTable() {
  return (
    <div className={styles.container}>
      {prices.map((price, index) => (
        <div className={styles.row} key={index}>
          <div className={styles.name}>{price.name}</div>
          <div className={styles.price}>{price.price}</div>
        </div>
      ))}
    </div>
  );
}
