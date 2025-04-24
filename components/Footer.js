import React from "react";
import styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} YARLOS ASESORÍA. Todos los derechos reservados a Christian chinchay .</p>
    </footer>
  );
};

export default Footer;
