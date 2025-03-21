import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/servicios.module.css";
import WhatsAppButton from "../components/WhatsAppButton";
import FlippableCard from "../components/FlippableCard";

/* Íconos */
import { FaBuilding, FaDraftingCompass, FaChalkboardTeacher } from "react-icons/fa";

export default function Servicios() {
  const serviciosData = [
    {
      titulo: "Asesoría y Consultoría en Ingeniería Civil",
      descripcion:
        "Ofrecemos asesoría integral en proyectos de ingeniería civil: diseño estructural, análisis de viabilidad y cumplimiento normativo.",
      Icono: FaBuilding,
      link: "/servicios/ingenieria-civil",
    },
    {
      titulo: "Diseño y Consultoría en Arquitectura",
      descripcion:
        "Brindamos servicios de diseño arquitectónico, modelado 3D y renders para optimizar tus proyectos y presentaciones.",
      Icono: FaDraftingCompass,
      link: "/servicios/arquitectura",
    },
    {
      titulo: "Asesoría Educativa en Ingeniería y Arquitectura",
      descripcion:
        "Ofrecemos tutorías personalizadas y acompañamiento en trabajos académicos y proyectos universitarios.",
      Icono: FaChalkboardTeacher,
      link: "/servicios/asesoria-educativa",
    },
  ];

  return (
    <>
      <Head>
        <title>Servicios - YARLOS ASESORÍA</title>
        <meta
          name="description"
          content="Descubre los servicios que ofrece YARLOS ASESORÍA: asesoría, diseño y gestión integral en ingeniería civil y arquitectura."
        />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <motion.section
        className={styles.heroServicios}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.overlay}></div>
        <motion.div
          className={styles.heroContent}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1>SERVICIOS</h1>
          <p>Soluciones integrales adaptadas a tu realidad</p>
          <a href="#servicios" className={styles.heroButton}>
            Contáctanos
          </a>
        </motion.div>
        <WhatsAppButton />
      </motion.section>

      {/* Sección Principal de Servicios */}
      <motion.section
        id="servicios"
        className={styles.servicesSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className={styles.sectionTitle}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>Nuestros Servicios</h2>
          <p>
            En YARLOS ASESORÍA brindamos acompañamiento y diseño en proyectos
            de ingeniería civil y arquitectura.
          </p>
        </motion.div>

        {/* Tarjetas de Servicios con Animaciones */}
        <div className={styles.servicesGrid}>
          {serviciosData.map(({ titulo, descripcion, Icono, link }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <FlippableCard
                frontContent={
                  <div style={{ textAlign: "center", color: "#000" }}>
                    <Icono size={40} style={{ marginBottom: "10px", color: "#ff6a3d" }} />
                    <h3>{titulo}</h3>
                  </div>
                }
                backContent={
                  <div style={{ textAlign: "center", color: "#000" }}>
                    <p>{descripcion}</p>
                    <Link href={link} className={styles.verMasBtn}>Ver más detalles</Link>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

     
    </>
  );
}
