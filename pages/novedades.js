// pages/novedades.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NovedadCard from '../components/NovedadCard'; // Importa la tarjeta
import styles from '../styles/novedadesPage.module.css'; // Estilos para la página
import { motion } from 'framer-motion'; // Importa motion si quieres animarlo

// --- DATOS DE EJEMPLO (CON imageUrl CORREGIDO) ---
const novedadesData = [
  { id: 1, title: 'Inicio de Nuevo Proyecto de Asesoría Estructural', date: '2025-03-01', excerpt: 'Comenzamos la colaboración en un emocionante proyecto residencial...',
    imageUrl: '/novedades/novedad1.jpg', slug: 'inicio-proyecto-asesoria-1' },
  { id: 2, title: 'Taller de Introducción a Revit para Estudiantes', date: '2025-02-25', excerpt: 'Exitosa jornada de capacitación donde exploramos los fundamentos...',
    imageUrl: '/novedades/novedad2.jpg', slug: 'taller-revit-estudiantes' },
  { id: 3, title: 'Optimización de Diseño Vial Urbano', date: '2025-02-15', excerpt: 'Finalizamos la fase de diseño geométrico para una nueva intersección...',
    imageUrl: '/novedades/novedad3.jpg', slug: 'optimizacion-diseno-vial' },
 // { id: 4, title: 'Avances en Modelado 3D para Concurso Académico', date: '2025-02-10', excerpt: 'Apoyando a futuros arquitectos en la creación de modelos detallados...',
 // imageUrl: '/images/novedad-4.jpg', slug: 'modelado-3d-concurso' },
 // { id: 5, title: 'Nueva Normativa de Construcción Sostenible', date: '2025-02-05', excerpt: 'Analizamos las implicaciones de la reciente actualización normativa...',
  //  imageUrl: '/images/novedad-5.jpg', slug: 'normativa-construccion-sostenible' },
  //{ id: 6, title: 'Asesoría Exitosa en Tesis de Grado', date: '2025-01-30', excerpt: 'Felicitamos a un nuevo ingeniero civil por la sustentación de su tesis...',
   // imageUrl: '/images/novedad-6.jpg', slug: 'asesoria-tesis-exitosa' },
  // ... añade más novedades con rutas correctas
];
// --- FIN DATOS DE EJEMPLO ---

// Opcional: Variantes de animación para el Hero
const heroVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};
const titleVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
};
const subtitleVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
};

export default function NovedadesPage() {
  return (
    <>
      <Head>
        <title>Novedades - YARLOS Asesoría</title>
        <meta name="description" content="Mantente al día con las últimas noticias, proyectos y actividades de YARLOS Asesoría en arquitectura e ingeniería civil." />
      </Head>

      <Navbar />

      {/* Main ya NO tiene padding horizontal */}
      <main className={styles.mainContent}>

        {/* --- INICIO HERO SECTION NOVEDADES --- */}
        <motion.section
          className={styles.novedadesHero}
          initial="hidden"
          animate="visible"
          variants={heroVariant} // Anima la aparición del fondo/sección
        >
          <div className={styles.heroContent}> {/* Contenedor para el texto del hero */}
            <motion.h1
              className={styles.pageTitle} // Reutilizamos la clase, pero ajustamos CSS
              variants={titleVariant}
            >
              Novedades
            </motion.h1>
            <motion.p
              className={styles.pageSubtitle} // Reutilizamos la clase, pero ajustamos CSS
              variants={subtitleVariant}
            >
              Descubre nuestros últimos proyectos, talleres y noticias relevantes del sector.
            </motion.p>
          </div>
        </motion.section>
        {/* --- FIN HERO SECTION NOVEDADES --- */}

        {/* Contenedor principal para el grid (AHORA tiene padding horizontal) */}
        <div className={styles.container}>
          {/* El grid de novedades ahora está aquí abajo */}
          <div className={styles.novedadesGrid}>
            {novedadesData.map((novedad) => (
              // Puedes añadir animación a cada tarjeta si quieres que aparezcan escalonadas
               <motion.div
                 key={novedad.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }} // Amount ajusta cuándo empieza la animación
                 transition={{ duration: 0.5 }}
               >
                 <NovedadCard novedad={novedad} />
               </motion.div>
            ))}
          </div>
        </div>
      </main>

     
    </>
  );
}