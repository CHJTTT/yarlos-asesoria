// pages/servicios.js
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
// --- Importa componentes comunes ---
// (Asumiendo que están en /components en la raíz)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
// --- Importa los datos desde la fuente única ---
// Sube un nivel desde /pages y entra a /pages/servicios/
import { serviciosPorCategoria } from './servicios/serviciosData';
// --- Importa los estilos ---
// (Asumiendo que están en /styles en la raíz)
import styles from "../styles/servicios.module.css";

// --- Variantes de Animación ---
const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delay: 0.3, staggerChildren: 0.06 } } };
const letter = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const containerStagger = { visible: { transition: { staggerChildren: 0.1 } }, hidden: {} };
const itemVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// --- YA NO SE REDEFINEN LOS DATOS LOCALMENTE ---
// Se utiliza la variable 'serviciosPorCategoria' importada arriba

export default function ServiciosHub() {
  return (
    <>
      <Head>
        <title>Nuestros Servicios - YARLOS ASESORÍA</title>
        <meta
          name="description"
          content="Explora la gama completa de servicios de YARLOS ASESORÍA en ingeniería civil, arquitectura y capacitación especializada."
        />
      </Head>
      <Navbar />
      {/* HERO SECTION */}
      <motion.section className={styles.heroServicios}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
           <motion.h1 variants={sentence} initial="hidden" animate="visible">
             { "SERVICIOS".split("").map((char, index) => (
               <motion.span key={`char-${index}`} variants={letter}>
                 {char === " " ? "\u00A0" : char}
               </motion.span>
             )) }
          </motion.h1>
        </div>
        <WhatsAppButton />
      </motion.section>
      {/* LISTA COMPLETA DE SERVICIOS POR CATEGORÍA */}
      <section className={styles.servicesListSection}>
        <div className={styles.introText}>
           <h2 className={styles.introTitle}>Explora Nuestra Oferta Completa</h2>
           <p className={styles.introSubtitle}>
               Ofrecemos un abanico de soluciones diseñadas para cubrir todas las fases de tus proyectos, desde la concepción hasta la ejecución y el soporte académico.
           </p>
        </div>
        {/* Mapea sobre los datos IMPORTADOS */}
        {Array.isArray(serviciosPorCategoria) && serviciosPorCategoria.map((categoria) => (
          <motion.div
            key={categoria.nombre} // Usar nombre como key (asegúrate que sea único)
            className={styles.categorySection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariant}
          >
            <h3 className={styles.categoryTitle}>{categoria.nombre}</h3>
            <motion.div
              className={styles.servicesGrid}
              variants={containerStagger}
            >
              {Array.isArray(categoria.servicios) && categoria.servicios.map((servicio) => (
                <motion.div
                  key={servicio.id} // El ID del servicio es una key confiable
                  className={styles.serviceCardWrapper}
                  variants={itemVariant}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <div className={styles.serviceCard}>
                    {/* Renderiza el componente Icono definido en serviciosData.js */}
                    {servicio.Icono && <servicio.Icono className={styles.serviceIcon} />}
                    <h4 className={styles.serviceTitle}>{servicio.titulo}</h4>
                    <p className={styles.serviceDescription}>{servicio.descripcion}</p>
                    {/* El Link usa el ID correcto */}
                    <Link href={`/servicios/${servicio.id}`} passHref legacyBehavior>
                      <motion.a
                        className={styles.serviceLink}
                        whileHover={{ scale: 1.05, backgroundColor: "var(--color-primario-darker, #1f4d8a)"}}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver Detalles
                      </motion.a>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </section>
     
    </>
  );
}