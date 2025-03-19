import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormularioContacto from '../components/FormularioContacto';
import styles from '../styles/contacto.module.css';
import { useRouter } from 'next/router';

const preguntasPorCategoria = {
  arquitectura: [
    { pregunta: "¿Cuánto tiempo tarda un diseño arquitectónico?", respuesta: "Depende de la complejidad del proyecto, pero en general toma entre 2 a 4 semanas." },
    { pregunta: "¿Puedo solicitar planos en 3D?", respuesta: "Sí, ofrecemos modelado 3D como parte del servicio." },
  ],
  ingenieria: [
    { pregunta: "¿Qué servicios de ingeniería ofrecen?", respuesta: "Realizamos cálculos estructurales, estudios de suelos y supervisión de obra." },
    { pregunta: "¿Pueden firmar planos para trámites municipales?", respuesta: "Sí, nuestros ingenieros están certificados para ello." },
  ],
  asesorias: [
    { pregunta: "¿Las asesorías son presenciales o virtuales?", respuesta: "Ofrecemos ambas modalidades según la disponibilidad." },
    { pregunta: "¿Cuáles son los costos de una asesoría?", respuesta: "Depende de la duración y el tema a tratar. Contáctanos para más detalles." },
  ],
};

export default function Contacto() {
  const router = useRouter();
  const { categoria } = router.query;
  const preguntas = preguntasPorCategoria[categoria] || [];

  return (
    <>
      <Head>
        <title>Contacto - YARLOS ASESORÍA</title>
        <meta name="description" content="Contáctanos para más información sobre nuestros servicios." />
      </Head>

      <Navbar />

      <div className={styles.contactBackground}>
        <div className={styles.contactContainer}>
          {/* Formulario */}
          <div className={styles.formContainer}>
            <h2>Contáctanos</h2>
            <p>Déjanos tu mensaje y nos pondremos en contacto contigo.</p>
            <FormularioContacto />
          </div>

          {/* Preguntas Frecuentes */}
          <div className={styles.faqContainer}>
            <h2>Consultas Frecuentes</h2>
            {preguntas.length > 0 ? (
              preguntas.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{item.pregunta}</h3>
                  <p>{item.respuesta}</p>
                </div>
              ))
            ) : (
              <p>No hay preguntas frecuentes para esta categoría.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
