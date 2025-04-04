// components/NovedadCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/novedadCard.module.css';

// Función para formatear fechas (opcional, puedes mostrarla como string)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // Añadimos una comprobación por si dateString es inválido o nulo
  try {
    // Asegurarse que la fecha es válida antes de formatear
    if (dateString && !isNaN(new Date(dateString))) {
       return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    return dateString; // Devuelve original si no es fecha válida
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return dateString; // Devuelve el original si hay error
  }
};

const NovedadCard = ({ novedad }) => {
  // Asumiendo que 'novedad' tiene: id, title, date, excerpt, imageUrl, slug
  // slug es para el enlace, ej: "mi-primera-novedad"

  // Verificación básica de que 'novedad' no es undefined o null
  if (!novedad) {
    console.warn("NovedadCard recibió una novedad indefinida o nula.");
    return null; // O mostrar un componente placeholder
  }

  // Placeholder si no hay slug (enlazará a la página general por ahora)
  const linkHref = novedad.slug ? `/novedades/${novedad.slug}` : '/novedades';

  return (
    // Link con legacyBehavior para permitir la <a> hija directa
    <Link href={linkHref} passHref legacyBehavior>
      <a className={styles.cardLink}> {/* Esta <a> ahora es manejada correctamente por Link */}
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              // Usar una imagen placeholder si imageUrl es nulo o vacío
              src={novedad.imageUrl || '/images/placeholder-novedad.png'}
              alt={novedad.title || 'Imagen de novedad'}
              layout="fill"
              objectFit="cover" // Asegura que la imagen cubra el espacio
              priority={false} // Cambiar a true para imágenes "Above the fold"
              // Añadir unoptimized si las imágenes vienen de URLs externas que no puedes configurar en next.config.js
              // unoptimized={novedad.imageUrl?.startsWith('http')}
              // Manejo de errores de carga de imagen (opcional pero recomendado)
              onError={(e) => { e.target.src = '/images/placeholder-novedad.png'; console.error(`Error cargando imagen: ${novedad.imageUrl}`);}}
            />
          </div>
          <div className={styles.content}>
            {/* Asegurarse que el título exista */}
            <h3 className={styles.title}>{novedad.title || "Título no disponible"}</h3>
            {/* Mostrar fecha solo si existe y es válida */}
            {novedad.date && (
              <p className={styles.date}>{formatDate(novedad.date)}</p>
            )}
            {/* Asegurarse que el extracto exista */}
            <p className={styles.excerpt}>{novedad.excerpt || "Descripción no disponible."}</p>
            {/* <span className={styles.readMore}>Leer más →</span> */}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default NovedadCard;