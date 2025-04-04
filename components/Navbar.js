import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/navbar.module.css";
import logo from "../public/logo1.0.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={50} height={50} />
        <span className={styles.brandName}>YARLOS Asesoría</span>
      </div>

      {/* Icono hamburguesa para móviles */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/servicios">Servicios</Link></li>
        <li><Link href="/novedades">Novedades</Link></li>
       {/*<li><Link href="/testimonios">Testimonios</Link></li>*/}
        <li><Link href="/contacto">Contacto</Link></li>
        <li className={styles.socialIcons}>
          <a href="https://www.facebook.com/profile.php?id=100089800446606" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </a>
          <a href="https://www.instagram.com/yarlosasesoria/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </a>
          <a href="mailto:yarlosasesoria@gmail.com" className={styles.emailLink}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
