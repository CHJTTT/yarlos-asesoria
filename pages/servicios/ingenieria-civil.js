import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/ingenieriaCivil.module.css'; // Asegúrate de que esta ruta es correcta

export default function IngenieriaCivil() {
  return (
    <div className={styles.container}>
      
      {/* HERO O BANNER SUPERIOR */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Ingeniería Civil</h1>
          <p className={styles.breadcrumb}>Servicios &gt; Ingeniería Civil</p>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO: TEXTO A LA IZQUIERDA, IMAGEN A LA DERECHA */}
      <section className={styles.serviceSection}>
        {/* Texto a la izquierda */}
        <div className={styles.serviceText}>
          <h2>Comprendemos la importancia de la precisión</h2>
          <p>
            Ofrecemos asesoría integral en proyectos de ingeniería civil: diseño
            estructural, análisis de viabilidad y cumplimiento normativo. Nuestro
            equipo de expertos está listo para acompañarte en cada etapa del proyecto,
            asegurando calidad y eficacia.
          </p>
          <Link href="/contacto">
            <button className={styles.contactButton}>Contáctanos</button>
          </Link>
        </div>

        {/* Imagen a la derecha */}
        <div className={styles.serviceImage}>
          <Image
            src="/asesoria.jpg"  
            alt="Ingeniería Civil"
            width={500}
            height={300}
          />
        </div>
      </section>
    </div>
  );
}
