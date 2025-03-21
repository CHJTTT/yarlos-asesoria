import styles from '../styles/footer.module.css';

import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>Yarlos Asesoría</h2>
          <p>Acompañando a los estudiantes y profesionales hacia el éxito.</p>
        </div>

        <div className={styles.contact}>
          <h3>Contacto</h3>
          <p><FaWhatsapp /> <a href="https://wa.me/51956498610" target="_blank" rel="noopener noreferrer">+51 956 498 610</a></p>
          <p><FaEnvelope /> yarlosasesoria@gmail.com</p>
          <p><FaMapMarkerAlt /> Dirección: [Dirección Aquí]</p>
        </div>
      </div>

      <p className={styles.copy}>© 2025 Yarlos Asesoría. Todos los derechos reservados.</p>
    </footer>
  );
}
