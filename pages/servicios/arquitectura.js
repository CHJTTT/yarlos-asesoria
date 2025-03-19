import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/arquitectura.module.css'; // Asegúrate de que la ruta sea correcta

export default function Arquitectura() {
  return (
    <div className={styles.container}>
      
      {/* HERO O BANNER SUPERIOR */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Diseño y Consultoría en Arquitectura</h1>
          <p className={styles.breadcrumb}>Servicios &gt; Arquitectura</p>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO: TEXTO A LA IZQUIERDA, IMAGEN A LA DERECHA */}
      <section className={styles.serviceSection}>
        {/* Texto a la izquierda */}
        <div className={styles.serviceText}>
          <h2>Transformamos ideas en espacios funcionales</h2>
          <p>
            Brindamos servicios de diseño arquitectónico, planificación y asesoría
            para proyectos residenciales, comerciales e institucionales. Nos aseguramos
            de crear espacios innovadores, estéticos y funcionales.
          </p>
          <Link href="/contacto">
            <button className={styles.contactButton}>Contáctanos</button>
          </Link>
        </div>

        {/* Imagen a la derecha */}
        <div className={styles.serviceImage}>
          <Image
            src="/diseñoimage.jpg"  
            alt="Arquitectura"
            width={500}
            height={300}
          />
        </div>
      </section>
    </div>
  );
}
