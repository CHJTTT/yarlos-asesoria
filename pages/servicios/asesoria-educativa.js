import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/asesoriaEducativa.module.css'; // Verifica la ruta

export default function AsesoriaEducativa() {
  return (
    <div className={styles.container}>
      
      {/* HERO O BANNER SUPERIOR */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Asesoría Educativa en Ingeniería y Arquitectura</h1>
          <p className={styles.breadcrumb}>Servicios &gt; Asesoría Educativa</p>
        </div>
      </section>

      {/* SECCIÓN DE CONTENIDO: TEXTO A LA IZQUIERDA, IMAGEN A LA DERECHA */}
      <section className={styles.serviceSection}>
        {/* Texto a la izquierda */}
        <div className={styles.serviceText}>
          <h2>Formación y acompañamiento para el éxito académico</h2>
          <p>
            Ofrecemos asesoría en temas de ingeniería civil y arquitectura, brindando
            apoyo a estudiantes y profesionales que buscan mejorar su comprensión de
            conceptos técnicos y desarrollar habilidades en el área.
          </p>
          <Link href="/contacto">
            <button className={styles.contactButton}>Contáctanos</button>
          </Link>
        </div>

        {/* Imagen a la derecha */}
        <div className={styles.serviceImage}>
          <Image
            src="/diseño2.jpg"  s
            alt="Asesoría Educativa"
            width={500}
            height={300}
          />
        </div>
      </section>
    </div>
  );
}
