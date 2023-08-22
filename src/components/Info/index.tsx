import styles from './info.module.css';

interface IProps {
  label: string;
  children: React.ReactElement | string;
}

function Info({ label, children }: IProps) {
  return (
    <div className={styles.main}>
      <span>{label}</span>: <span className={styles.value}>{children}</span>
    </div>
  );
}

export { Info };
