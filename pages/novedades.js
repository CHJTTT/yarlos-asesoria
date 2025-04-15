// pages/novedades.js
import React, { useState } from 'react'; // Importa useState
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NovedadCard from '../components/NovedadCard';
import ImageModal from '../components/ImageModal'; // Importa el nuevo modal
import styles from '../styles/novedadesPage.module.css';
import { motion } from 'framer-motion';

// --- DATOS DE EJEMPLO ---
const novedadesData = [
    { id: 1, title: 'Inicio de Nuevo Proyecto de Asesoría Estructural', date: '2025-03-01', excerpt: 'Te acompañamos en la elaboración de tu tesis, desarrollo de planos, cálculos estructurales, instalaciones sanitarias y eléctricas.',
    imageUrl: '/novedades/novedadfab.jpg', slug: 'inicio-proyecto-asesoria-1' },
  { id: 2, title: 'Taller de Introducción a Revit para Estudiantes', date: '2025-02-25', excerpt: 'Exitosa jornada de capacitación donde exploramos los fundamentos...',
    imageUrl: '/novedades/novedad2.jpg', slug: 'taller-revit-estudiantes' },
  { id: 3, title: 'Lleva tus proyectos al siguiente nivel', date: '2025-02-15', excerpt: 'te ayudamos con asesoría en estructuras, diseño de planos, modelado 3D y renders para que tus entregas sean impecables. .',
    imageUrl: '/novedades/novedad1.jpg', slug: 'optimizacion-diseno-vial' },
];
// --- FIN DATOS DE EJEMPLO ---

// --- ANIMACIONES (sin cambios) ---
const heroVariant = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const titleVariant = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } };
const subtitleVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } } };
// --- FIN ANIMACIONES ---

export default function NovedadesPage() {
  // --- ESTADO PARA EL MODAL ---
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // --- FUNCIONES PARA MANEJAR EL MODAL ---
  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const closeModal = () => {
    setSelectedImageUrl(null);
  };
  // --- FIN MANEJO MODAL ---

  return (
    <>
      <Head>
        <title>Novedades - YARLOS Asesoría</title>
        <meta name="description" content="Mantente al día con las últimas noticias, proyectos y actividades de YARLOS Asesoría en arquitectura e ingeniería civil." />
      </Head>

      <Navbar />

      <main className={styles.mainContent}>
        {/* --- HERO SECTION (sin cambios) --- */}
        <motion.section
          className={styles.novedadesHero}
          initial="hidden"
          animate="visible"
          variants={heroVariant}
        >
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <motion.h1 className={styles.pageTitle} variants={titleVariant}>Novedades</motion.h1>
            <motion.p className={styles.pageSubtitle} variants={subtitleVariant}>
              Descubre nuestros últimos proyectos, talleres y noticias relevantes del sector.
            </motion.p>
          </div>
        </motion.section>
        {/* --- FIN HERO SECTION --- */}

        {/* Contenedor principal para el grid */}
        <div className={styles.container}>
          <div className={styles.novedadesGrid}>
            {novedadesData.map((novedad) => (
               <motion.div
                 key={novedad.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.5 }}
               >
                 {/* PASAMOS LA FUNCIÓN openModal COMO PROP */}
                 <NovedadCard novedad={novedad} onImageClick={openModal} />
               </motion.div>
            ))}
          </div>
        </div>
      </main>



      {/* RENDERIZADO CONDICIONAL DEL MODAL */}
      <ImageModal imageUrl={selectedImageUrl} onClose={closeModal} />
    </>
  );
}