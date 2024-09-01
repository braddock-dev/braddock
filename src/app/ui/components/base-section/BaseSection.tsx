import styles from "./BaseSection.module.scss";

interface IBaseSectionProps {
  containerClassName?: string;
  children: React.ReactNode;
}
export default function BaseSection(props: IBaseSectionProps) {
  return (
    <div className={`${styles.container} ${props.containerClassName}`}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
