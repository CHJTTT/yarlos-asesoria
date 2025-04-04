import Head from 'next/head';
import Navbar from '../components/Navbar'; // Ajusta la ruta si es necesario
import Footer from '../components/Footer'; // Ajusta la ruta si es necesario
import FormularioContacto from '../components/FormularioContacto';
import styles from '../styles/contacto.module.css';

// --- Opcional: Importa iconos si decides usar la sección de Info Directa ---
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
// Si los usas, instala: npm install react-icons

export default function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto - YARLOS ASESORÍA</title>
        <meta
          name="description"
          content="Ponte en contacto con YARLOS ASESORÍA. Envíanos tu consulta a través de nuestro formulario y te responderemos pronto."
        />
        {/* Puedes añadir más meta tags aquí */}
      </Head>

      <Navbar />

      {/* --- Sección Principal con Fondo --- */}
      {/* Usamos directamente contactBackground ya que el CSS lo posiciona todo */}
      <div className={styles.contactBackground}>

        {/* --- Contenedor del Formulario (Según tu CSS) --- */}
        <div className={styles.formContainer}>
          <h2>Contáctanos</h2>
          <p>
            Envíanos tus dudas o requerimientos a través del formulario y
            te responderemos a la brevedad posible.
          </p>
          {/* Renderiza el componente del formulario */}
          <FormularioContacto />
        </div>


        {/* --- EJEMPLO: Sección de Información Adicional (Descomenta y adapta si la quieres) --- */}
        {/*
        Para que esto funcione visualmente junto al formulario, necesitarás ajustar el CSS:
        - Probablemente añadir un div contenedor alrededor de formContainer y infoContainer.
        - Usar Flexbox o Grid en ese contenedor para ponerlos lado a lado en desktop.
        - Añadir los estilos .infoContainer, .infoItem, etc. al CSS.
        */}
        {/*
        <div className={styles.infoContainer}> // Necesitarías crear esta clase en tu CSS
           <h3>Información Directa</h3>
           <p className={styles.infoItem}> // Necesitarías crear esta clase
             {/* <FaEnvelope className={styles.infoIcon} /> *} {/* Necesitarías .infoIcon *}
             <span>info@yarlosasesoria.com</span> {/* REEMPLAZA CON TU EMAIL *}
           </p>
           <p className={styles.infoItem}>
             {/* <FaPhoneAlt className={styles.infoIcon} /> *}
             <span>+XX XXX XXX XXXX</span> {/* REEMPLAZA CON TU TELÉFONO *}
           </p>
           {/*
           <p className={styles.infoItem}>
             {/* <FaMapMarkerAlt className={styles.infoIcon} /> *}
             <span>Tu Dirección, Ciudad</span> {/* REEMPLAZA SI APLICA *}
           </p>
           *}
           <p className={styles.horarioAtencion}> {/* Necesitarías .horarioAtencion *}
              <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 5:00 PM
           </p>
        </div>
        */}

      </div> {/* Fin de .contactBackground */}


      {/* --- EJEMPLO: Sección FAQ (Si decides usarla, puedes ponerla aquí o donde prefieras) --- */}
      {/*
      <div className={styles.faqContainer}>
        <h2>Preguntas Frecuentes</h2>
        <div className={styles.faqItem}>
          <h3>¿Pregunta número 1?</h3>
          <p>Respuesta a la pregunta frecuente número 1.</p>
        </div>
        <div className={styles.faqItem}>
          <h3>¿Pregunta número 2?</h3>
          <p>Respuesta a la pregunta frecuente número 2.</p>
        </div>
        {/* Añade más items si es necesario *}
      </div>
      */}

      <Footer />
    </>
  );
}