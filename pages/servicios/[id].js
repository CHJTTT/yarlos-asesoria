// pages/servicios/[id].js

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Importa tus componentes comunes ---
import Navbar from '../../components/Navbar'; // Ajusta la ruta si es necesario
import Footer from '../../components/Footer'; // Ajusta la ruta si es necesario
import WhatsAppButton from '../../components/WhatsAppButton'; // Ajusta la ruta si es necesario

// --- Importa la función para obtener datos ---
import { getServicioById, serviciosPorCategoria } from './serviciosData';

// --- Importa los estilos ---
import styles from '../../styles/servicioDetalle.module.css'; // Ajusta la ruta si es necesario

// --- Importa los iconos ---
import {
  FaBuilding, FaDraftingCompass, FaCalculator, FaRulerCombined,
  FaPencilRuler, FaChalkboardTeacher, FaLaptopCode, FaHardHat
} from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";

// --- Mapeo de nombres de icono ---
const iconComponents = {
  FaCalculator, FaRulerCombined, FaHardHat, GiFamilyHouse,
  FaBuilding, FaPencilRuler, FaChalkboardTeacher, FaLaptopCode,
};

// --- Variantes de Animación ---
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

// --- Componente Principal ---
export default function ServicioDetalle({ servicio }) {
  const router = useRouter();

  // Manejo mientras se genera la página (con fallback: 'blocking') o si falla getStaticProps
  if (!servicio) {
     return (
      <>
        <Navbar />
        <main className={styles.loadingContainer || 'loading-fallback-style'}>
          <p>Cargando detalles del servicio o servicio no encontrado...</p>
          {/* Considera añadir un spinner o un mensaje más elaborado */}
        </main>
        <Footer />
      </>
     )
  }

  // Busca el componente de icono usando el string 'iconoNombre'
  const IconoComponente = servicio.iconoNombre ? iconComponents[servicio.iconoNombre] : null;

  // --- Prepara el estilo del fondo para el hero ---
  const heroStyle = servicio.imagenHero
    ? { backgroundImage: `url(${servicio.imagenHero})` }
    : { backgroundColor: '#333' }; // Un color de fondo por defecto si no hay imagen

  // Renderiza la página
  return (
    <>
      <Head>
        <title>{`${servicio.titulo} - Servicios | YARLOS ASESORÍA`}</title>
        <meta name="description" content={servicio.descripcionLarga || servicio.descripcion} />
        {/* Puedes añadir más meta tags aquí (Open Graph, etc.) */}
      </Head>
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section - Aplicar el estilo dinámico */}
      <motion.section
        className={styles.servicioHero}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        style={heroStyle} // <-- APLICA EL ESTILO DE FONDO AQUÍ
      >
        <div className={styles.overlay}></div> {/* Overlay para legibilidad */}
        <div className={styles.heroContent}>
          <motion.h1 variants={fadeIn}>{servicio.titulo}</motion.h1>
          <motion.p variants={fadeIn} transition={{ delay: 0.2 }}>{servicio.descripcion}</motion.p>
        </div>
      </motion.section>

      {/* Contenido Principal */}
      <main className={styles.mainContent}>
        <motion.div
          className={styles.detalleContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {IconoComponente && (
            <motion.div variants={fadeIn} className={styles.iconoContainer}>
              <IconoComponente className={styles.iconoDetalle} />
            </motion.div>
          )}

          <motion.h2 variants={fadeIn} className={styles.sectionTitle}>Descripción Detallada</motion.h2>
          <motion.div variants={fadeIn} className={styles.descripcionLarga}>
            {servicio.descripcionLarga
              ? <p>{servicio.descripcionLarga}</p>
              : <p>Próximamente disponible la información detallada sobre {servicio.titulo.toLowerCase()}. Contacta con nosotros para más detalles.</p>
            }
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={fadeIn} className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>¿Interesado en {servicio.titulo}?</h3>
            <p>Contáctanos para discutir cómo podemos aplicar este servicio a tu proyecto específico.</p>
            <Link href="/contacto" passHref legacyBehavior>
              <motion.a className={styles.ctaButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Solicitar Asesoría
              </motion.a>
            </Link>
          </motion.div>

          {/* Volver Link */}
          <motion.div variants={fadeIn} className={styles.volverLinkContainer}>
             <Link href="/servicios" legacyBehavior>
               <a className={styles.volverLink}>← Ver Todos los Servicios</a>
             </Link>
          </motion.div>
        </motion.div>
      </main>

     
    </>
  );
}

// --- Funciones SSG ---
export async function getStaticPaths() {
  let paths = [];
  try {
     // serviciosPorCategoria se importa directamente al inicio del archivo
     if (Array.isArray(serviciosPorCategoria) && serviciosPorCategoria.length > 0) {
        const todosLosServicios = serviciosPorCategoria.flatMap(cat => cat.servicios || []);
        paths = todosLosServicios
          .filter(servicio => servicio && servicio.id) // Filtra servicios inválidos o sin ID
          .map(servicio => ({ params: { id: servicio.id } }));
     } else {
       console.warn("[getStaticPaths] No se encontraron datos de servicios para generar paths.");
     }
  } catch (error) {
      console.error("Error al generar paths en getStaticPaths:", error);
      // Podrías devolver paths vacíos para evitar un error de build,
      // pero 'blocking' manejará los intentos de acceder a rutas no generadas.
      paths = [];
  }
  // 'blocking' esperará en el servidor a que la página se genere si no está en caché.
  // Es bueno para SSG con muchas páginas o si el contenido puede añadirse después del build.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const servicioId = params?.id;

  // Validar ID temprano
  if (!servicioId) {
      console.log("getStaticProps: No se proporcionó ID en los parámetros.");
      return { notFound: true }; // Devuelve 404 Not Found
  }

  // getServicioById se importa directamente al inicio del archivo
  const servicioEncontrado = getServicioById(servicioId);

  // Si no se encuentra el servicio para ese ID
  if (!servicioEncontrado) {
    console.log(`getStaticProps: No se encontró servicio para ID: ${servicioId}`);
    return { notFound: true }; // Devuelve 404 Not Found
  }

  // Excluir el componente Icono (no es serializable para JSON)
  // La propiedad 'imagenHero' es un string y sí es serializable.
  const { Icono, ...serializableServicioData } = servicioEncontrado;

  return {
    props: {
      // Pasa los datos del servicio (sin el componente Icono) al componente de la página
      servicio: serializableServicioData,
    },
    // Opcional: revalidate permite Incremental Static Regeneration (ISR)
    // La página se regenerará en segundo plano después de X segundos si hay tráfico.
    // revalidate: 3600, // Regenera cada hora (ejemplo)
  };
}