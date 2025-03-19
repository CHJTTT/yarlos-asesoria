import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/servicios.module.css';
import WhatsAppButton from "../components/WhatsAppButton";

/* Importa tu componente FlippableCard */
import FlippableCard from '../components/FlippableCard';

/* Íconos */
import { 
  FaBuilding, 
  FaDraftingCompass, 
  FaChalkboardTeacher
} from "react-icons/fa";

export default function Servicios() {
  const serviciosData = [
    {
      titulo: 'Asesoría y Consultoría en Ingeniería Civil',
      descripcion: 'Ofrecemos asesoría integral en proyectos de ingeniería civil: diseño estructural, análisis de viabilidad y cumplimiento normativo.',
      Icono: FaBuilding,
      link: '/servicios/ingenieria-civil',
    },
    {
      titulo: 'Diseño y Consultoría en Arquitectura',
      descripcion: 'Brindamos servicios de diseño arquitectónico, modelado 3D y renders para optimizar tus proyectos y presentaciones.',
      Icono: FaDraftingCompass,
      link: '/servicios/arquitectura',
    },
    {
      titulo: 'Asesoría Educativa en Ingeniería y Arquitectura',
      descripcion: 'Ofrecemos tutorías personalizadas y acompañamiento en trabajos académicos y proyectos universitarios.',
      Icono: FaChalkboardTeacher,
      link: '/servicios/asesoria-educativa',
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
      <section className={styles.heroServicios}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>SERVICIOS</h1>
          <p>Soluciones integrales adaptadas a tu realidad</p>
          <a href="#servicios" className={styles.heroButton}>Contáctanos</a>
        </div>
        <WhatsAppButton />
      </section>

      {/* Sección principal de Servicios */}
      <section id="servicios" className={styles.servicesSection}>
        <div className={styles.sectionTitle}>
          <h2>Nuestros Servicios</h2>
          <p>
            En YARLOS ASESORÍA brindamos acompañamiento y diseño en proyectos
            de ingeniería civil y arquitectura.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {serviciosData.map(({ titulo, descripcion, Icono, link }, index) => (
            <FlippableCard
              key={index}
              /* Cara frontal: se muestra el ícono y el título */
              frontContent={
                <div style={{ textAlign: 'center', color: '#000' }}>
                  <Icono 
                    size={40} 
                    style={{ marginBottom: '10px', color: '#ff6a3d' }} 
                  />
                  <h3>{titulo}</h3>
                </div>
              }
              /* Cara trasera: descripción y "Ver más detalles" */
              backContent={
                <div style={{ textAlign: 'center', color: '#000' }}>
                  <p>{descripcion}</p>
                  {/* Aquí se usa Link sin etiqueta <a> anidada */}
                  <Link
                    href={link}
                    style={{ color: '#0070f3', textDecoration: 'underline' }}
                  >
                    Ver más detalles
                  </Link>
                </div>
              }
            />
          ))}
        </div>
      </section>


    </>
  );
}
