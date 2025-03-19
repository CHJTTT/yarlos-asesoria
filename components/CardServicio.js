import Link from 'next/link';
import styles from '../styles/servicios.module.css';

export default function CardServicio({ titulo, descripcion, Icono, link }) {
  return (
    <div className={styles.cardServicio}>
      <div className={styles.iconContainer}>
        <Icono className={styles.iconStyle} />
      </div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      {link && (
        <Link href={link} className={styles.verMasBtn}>
          Ver más
        </Link>
      )}
    </div>
  );
}
