import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import Carousel from "../components/carousel";
import WhatsAppButton from "../components/WhatsAppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faCubes,
  faCalculator,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <motion.header
        className={styles.hero}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Capa oscura superpuesta */}
        <div className={styles.overlay}></div>
        
        {/* Contenido del hero */}
        <div className={styles.heroContent}>
          <h1>
            Asesoría y Desarrollo en <br /> Arquitectura e Ingeniería Civil
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Brindamos apoyo académico y profesional en proyectos arquitectónicos e ingenieriles.
          </motion.p>
          <motion.button
            className={styles.button}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            LEER MÁS
          </motion.button>
        </div>
      </motion.header>

      <Carousel />
      <WhatsAppButton />

      {/* SECCIÓN DE SERVICIOS */}
      <section className={styles.services}>
        {[
          {
            icon: faProjectDiagram,
            title: "Asesoría en proyectos",
            text: "Guiamos y desarrollamos proyectos académicos y profesionales en arquitectura e ingeniería.",
          },
          {
            icon: faCubes,
            title: "Modelado y representación digital",
            text: "Creación de planos, renders y modelos 3D para proyectos académicos y profesionales.",
          },
          {
            icon: faCalculator,
            title: "Cálculo estructural",
            text: "Asesoramiento en diseño estructural y análisis de resistencia de materiales.",
          },
          {
            icon: faChalkboardTeacher,
            title: "Capacitaciones y tutorías",
            text: "Clases especializadas en software de arquitectura, ingeniería y construcción.",
          },
        ].map((service, index) => (
          <motion.article
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <FontAwesomeIcon icon={service.icon} className={styles.icon} />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </motion.article>
        ))}
      </section>

      {/* SECCIÓN "ACERCA DE NOSOTROS" */}
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <h2>¿Quiénes Somos?</h2>
          <p>
            Somos una empresa comprometida con la excelencia en la asesoría y el desarrollo 
            de proyectos en arquitectura e ingeniería civil. Nuestro equipo de profesionales 
            trabaja con pasión para ofrecer soluciones integrales y sustentables.
          </p>
          <p>
            Con más de [X] años de experiencia, impulsamos la innovación y calidad en cada 
            proyecto, garantizando resultados excepcionales.
          </p>
        </div>
        <div className={styles.infoImage}>
          <img src="/contacto2.jpg" alt="Acerca de Nosotros" />
        </div>
      </section>
    </div>
  );
}
