import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faCubes,
  faCalculator,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "../components/carousel";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <div>
    

      <header className={styles.hero}>
      <Navbar/>
        <h1>Asesoría y Desarrollo en Arquitectura e Ingeniería Civil</h1>
        <p>Brindamos apoyo académico y profesional en proyectos arquitectónicos e ingenieriles</p>
        <button className={styles.button}>LEER MÁS</button>
      </header>

      <Carousel />
      <WhatsAppButton />

      <section className={styles.services}>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faProjectDiagram} className={styles.icon} />
          <h3>Asesoría en proyectos</h3>
          <p>Guiamos y desarrollamos proyectos académicos y profesionales en arquitectura e ingeniería.</p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faCubes} className={styles.icon} />
          <h3>Modelado y representación digital</h3>
          <p>Creación de planos, renders y modelos 3D para proyectos académicos y profesionales.</p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faCalculator} className={styles.icon} />
          <h3>Cálculo estructural</h3>
          <p>Asesoramiento en diseño estructural y análisis de resistencia de materiales.</p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon icon={faChalkboardTeacher} className={styles.icon} />
          <h3>Capacitaciones y tutorías</h3>
          <p>Clases especializadas en software de arquitectura, ingeniería y construcción.</p>
        </div>
      </section>
    </div>
  );
}
