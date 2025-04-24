import styles from '../styles/WhatsAppButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function WhatsAppButton() {
  return (
    <a
    href="https://wa.me/51956498610"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.whatsappButton} // Aquí la corrección
  >
  
      <FontAwesomeIcon icon={faWhatsapp} className={styles.whatsappIcon} /> Contactar
    </a>
  );
}
