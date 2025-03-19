import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/portafolio.module.css';

// Datos de proyectos (puedes agregar más)
const proyectos = [
  {
    id: 1,
    titulo: "Diseño de Casa Moderna",
    descripcion: "Proyecto de vivienda con espacios amplios e iluminación natural.",
    imagen: "/casamoderna.jpg",
  },
  {
    id: 2,
    titulo: "Edificio Corporativo",
    descripcion: "Diseño de oficinas funcionales con certificación LEED.",
    imagen: "/edificio.jpg",
  },
  {
    id: 3,
    titulo: "Centro Comercial",
    descripcion: "Espacios comerciales con diseño innovador y ecológico.",
    imagen: "/centrocomercial.jpg",
  },
];

export default function Portafolio() {
  return (
    <div className={styles.container}>
      {/* HERO O BANNER */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Nuestro Portafolio</h1>
          <p className={styles.breadcrumb}>Inicio &gt; Portafolio</p>
        </div>
      </section>

      {/* SECCIÓN DE PROYECTOS */}
      <section className={styles.projectsSection}>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className={styles.projectCard}>
            <Image src={proyecto.imagen} alt={proyecto.titulo} width={400} height={250} />
            <h3>{proyecto.titulo}</h3>
            <p>{proyecto.descripcion}</p>
            <Link href={`/portafolio/${proyecto.id}`}>
              <button className={styles.projectButton}>Ver más</button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
