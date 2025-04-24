// pages/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
import NovedadCard from '../components/NovedadCard'; // Importa la tarjeta de novedad
import styles from "../styles/Home.module.css";
import WhatsAppButton from "../components/WhatsAppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faCubes,
  faCalculator,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

// Importamos estilos del grid de novedades para reutilizar
import gridStyles from '../styles/novedadesPage.module.css';

// --- Variantes de Animación ---
const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.04 } } };
const letter = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } } };
const itemVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const containerStagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, when: "beforeChildren" } } };

// --- Componente Principal ---
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Datos de Servicios Destacados ---
  const serviciosDestacados = [
    { id: "asesoria-academica", icon: faProjectDiagram, title: "Asesoría en proyectos", text: "Guiamos y desarrollamos proyectos académicos y profesionales..." },
    { id: "modelado-bim", icon: faCubes, title: "Modelado y representación digital", text: "Creación de planos, renders y modelos 3D..." },
    { id: "calculo-estructural", icon: faCalculator, title: "Cálculo estructural", text: "Asesoramiento en diseño estructural y análisis..." },
    { id: "capacitacion-software", icon: faChalkboardTeacher, title: "Capacitaciones y tutorías", text: "Clases especializadas en software..." },
  ];

  // --- DATOS DE EJEMPLO (ÚLTIMAS 3 NOVEDADES - CORREGIDO) ---
  // *** ESTE ES EL CAMBIO CLAVE ***
  // Las rutas imageUrl aquí AHORA coinciden con las de novedades.js
  const latestNovedades = [
    { id: 1, title: 'Inicio de Nuevo Proyecto de Asesoría Estructural', date: '2025-03-01', excerpt: 'Te acompañamos en la elaboración de tu tesis, desarrollo de planos, cálculos estructurales, instalaciones sanitarias y eléctricas.',
      imageUrl: '/novedades/novedadfab.jpg', slug: 'inicio-proyecto-asesoria-1' },
    { id: 2, title: 'Taller de Introducción a Revit para Estudiantes', date: '2025-02-25', excerpt: 'Exitosa jornada de capacitación donde exploramos los fundamentos...',
      imageUrl: '/novedades/novedad2.jpg', slug: 'taller-revit-estudiantes' },
    { id: 3, title: 'Lleva tus proyectos al siguiente nivel', date: '2025-02-15', excerpt: 'te ayudamos con asesoría en estructuras, diseño de planos, modelado 3D y renders para que tus entregas sean impecables. .',
      imageUrl: '/novedades/novedad1.jpg', slug: 'optimizacion-diseno-vial' },
  
  ];
  // --- FIN DATOS DE EJEMPLO ---

  const heroText = "Innovación en Arquitectura e Ingeniería";
  const wordToHighlight = "Innovación";
  const startIndex = heroText.indexOf(wordToHighlight);
  const endIndex = startIndex !== -1 ? startIndex + wordToHighlight.length : -1;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
       {/* ==================== HERO SECTION (Versión sin lógica móvil) ==================== */}
       <header className={styles.hero}>
        <div className={styles.heroContent}>

          {/* --- TÍTULO PRINCIPAL (SIEMPRE ANIMADO LETRA POR LETRA) --- */}
          <motion.h1
            className={styles.heroTitle}
            variants={sentence} // Animación general del contenedor del título
            initial="hidden"
            animate="visible"
          >
            {/* Ahora SIEMPRE divide el texto en letras y las anima individualmente */}
            {heroText.split("").map((char, index) => {
              // La lógica de resaltar se mantiene si es necesaria independientemente del dispositivo
              const shouldHighlight = startIndex !== -1 && index >= startIndex && index < endIndex;
              return (
                <motion.span // Cada letra es un span animado
                  key={`char-${index}`}
                  variants={letter} // Animación específica para cada letra
                  className={shouldHighlight ? styles.highlight : undefined} // Aplica resaltado si corresponde
                >
                  {/* Muestra la letra (o espacio especial) */}
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </motion.h1>

          {/* --- SUBTÍTULO (ANIMADO CON DELAY FIJO) --- */}
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y abajo
            animate={{ opacity: 1, y: 0 }}   // Estado final: visible y en posición
            transition={{
              duration: 0.8,
              delay: 2.3 // Delay FIJO (el valor que antes era para escritorio)
            }}
          >
              Transformamos ideas en proyectos sólidos y sostenibles.
          </motion.p>

          {/* --- BOTÓN (ANIMADO E INTERACTIVO CON DELAY FIJO) --- */}
          <motion.button
            className={styles.button}
            // Animaciones de interacción (hover/tap) se mantienen igual
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--color-acento-hover, #e05a3f)",
              boxShadow: "0 4px 15px rgba(var(--color-acento-rgb, 221, 107, 32), 0.4)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            // Animación de entrada
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 2.5 // Delay FIJO (el valor que antes era para escritorio)
            }}
            onClick={scrollToAbout} // La acción al hacer clic se mantiene
          >
            DESCUBRE MÁS
          </motion.button>

        </div>
      </header>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main>
        {/* ====== INFO SECTION: ACERCA DE NOSOTROS ====== */}
        <motion.section className={styles.infoSection} id="about-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerStagger}>
           <motion.div className={styles.infoContainer} variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}>
             <h2 className={styles.sectionTitleAlt}>¿QUIÉNES SOMOS?</h2>
             <p>Somos una empresa comprometida con la excelencia en la asesoría y el desarrollo de proyectos en arquitectura e ingeniería civil. Nuestro equipo de profesionales trabaja con pasión para ofrecer soluciones integrales y sustentables.</p>
           </motion.div>
           <motion.div className={styles.infoImageContainer} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.1 } } }}>
             <img src="/prueba3.jpg" alt="Equipo de YARLOS Asesoría trabajando" loading="lazy" />
           </motion.div>
         </motion.section>

        {/* ====== MISIÓN Y VISIÓN ====== */}
        <motion.section className={styles.misionVisionSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
            <div className={styles.misionVisionTitleContainer}><h2 className={styles.misionVisionTitle}>Misión & Visión</h2></div>
          </motion.div>
          <motion.div className={styles.misionVisionGrid} variants={containerStagger}>
            <motion.div className={styles.misionItem} variants={itemVariant}><h3>Misión</h3><p>Proporcionar soluciones académicas personalizadas para estudiantes de arquitectura e ingeniería civil, garantizando excelencia y calidad en cada asesoría.</p></motion.div>
            <motion.div className={styles.visionItem} variants={itemVariant}><h3>Visión</h3><p>Ser la empresa líder en asistencia académica para arquitectura e ingeniería civil, destacándonos por nuestra calidad, profesionalismo y compromiso con el éxito de nuestros clientes.</p></motion.div>
          </motion.div>
        </motion.section>

        {/* ====== SERVICIOS DESTACADOS ====== */}
        <motion.section className={styles.servicesSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
           <div className={styles.servicesContainer}>
             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1} } }}>
               <div className={styles.servicesHeader}>
                 <h2 className={styles.sectionTitleAlt}>Nuestros Servicios</h2>
                 <Link href="/servicios" passHref legacyBehavior><motion.a className={`${styles.button} ${styles.servicesButton}`} whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(var(--color-acento-rgb, 221, 107, 32), 0.5)" }} whileTap={{ scale: 0.95 }}>Ver todos los servicios</motion.a></Link>
               </div>
               <p className={styles.sectionSubtitle}>Ofrecemos soluciones integrales en arquitectura e ingeniería civil.</p>
             </motion.div>
             <motion.div className={styles.cardsWrapper} variants={containerStagger}>
               {serviciosDestacados.map((service) => (
                 <Link key={service.id} href={`/servicios/${service.id}`} passHref legacyBehavior>
                   <motion.a style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} variants={itemVariant}>
                     <motion.article className={styles.card} whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.12)", borderColor: "var(--color-acento, #DD6B20)" }} transition={{ type: "spring", stiffness: 300 }}>
                       <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'inline-block' }}>
                         <FontAwesomeIcon icon={service.icon} className={styles.icon} />
                       </motion.div>
                       <h3>{service.title}</h3><p>{service.text}</p>
                     </motion.article>
                   </motion.a>
                 </Link>
               ))}
             </motion.div>
           </div>
         </motion.section>

        {/* ==================== INICIO: PREVIEW NOVEDADES ==================== */}
        <motion.section
          className={styles.novedadesPreviewSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          <div className={styles.container}>
            <motion.h2
              className={styles.sectionTitleAlt}
              variants={itemVariant}
            >
              Últimas Novedades
            </motion.h2>

            <motion.div
              className={gridStyles.novedadesGrid}
            >
              {latestNovedades.map((novedad) => (
                 <motion.div key={novedad.id} variants={itemVariant}>
                   {/* Pasamos los datos CORREGIDOS a NovedadCard */}
                   <NovedadCard novedad={novedad} />
                 </motion.div>
              ))}
            </motion.div>

            <motion.div
              className={styles.viewAllButtonContainer}
              variants={itemVariant}
            >
              <Link href="/novedades" passHref legacyBehavior>
                <motion.a
                  className={`${styles.button} ${styles.viewAllButton}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(var(--color-acento-rgb, 221, 107, 32), 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Todas las Novedades
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </motion.section>
        {/* ==================== FIN PREVIEW NOVEDADES ==================== */}


        {/* ====== CONTACTO / CALL TO ACTION (CTA) ====== */}
        <motion.section
          className={styles.contactSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <div className={styles.contactContainer}>
            <h2>¿Listo para comenzar tu proyecto?</h2>
            <p>Ponte en contacto con nosotros para una asesoría personalizada y descubre cómo podemos ayudarte a llevar tu idea al siguiente nivel.</p>
            <Link href="/contacto" passHref legacyBehavior><motion.a className={`${styles.button} ${styles.contactButton}`} whileHover={{ scale: 1.05, backgroundColor: "var(--color-acento-hover, #e05a3f)", boxShadow: "0 4px 15px rgba(var(--color-acento-rgb, 221, 107, 32), 0.4)" }} whileTap={{ scale: 0.95 }}>Contáctanos</motion.a></Link>
          </div>
        </motion.section>

      </main>
      {/* ==================== FIN MAIN CONTENT AREA ==================== */}

      {/* ====== BOTÓN DE WHATSAPP FLOTANTE ====== */}
      <WhatsAppButton />

    </>
  );
}