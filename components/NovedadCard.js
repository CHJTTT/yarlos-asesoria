// components/NovedadCard.js
import React from 'react';
import Image from 'next/image';
// import Link from 'next/link'; // Ya no necesitamos Link aquí
import styles from '../styles/novedadCard.module.css';

// Función formatDate (sin cambios)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    if (dateString && !isNaN(new Date(dateString))) {
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    return dateString;
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return dateString;
  }
};

// Acepta la nueva prop onImageClick
const NovedadCard = ({ novedad, onImageClick }) => {
  if (!novedad) {
    console.warn("NovedadCard recibió una novedad indefinida o nula.");
    return null;
  }

  // Ya no necesitamos linkHref
  // const linkHref = novedad.slug ? `/novedades/${novedad.slug}` : '/novedades';

  // Función para manejar el clic en la imagen
  const handleImageContainerClick = (e) => {
    // Prevenir que el clic se propague si hubiera otros elementos clickables
    e.stopPropagation();
    // Llama a la función pasada desde la página principal si existe
    if (onImageClick && novedad.imageUrl) {
      onImageClick(novedad.imageUrl);
    }
  };

  return (
    // Eliminamos el Link y la etiqueta <a> envolvente
    <div className={styles.card}> {/* Ahora el div card es el contenedor principal */}
      {/* Añadimos onClick a este div */}
      <div
        className={styles.imageContainer}
        onClick={handleImageContainerClick} // Llama a nuestra función al hacer clic
        style={{ cursor: 'pointer' }} // Cambia el cursor para indicar que es clickeable
      >
        <Image
          src={novedad.imageUrl || '/images/placeholder-novedad.png'}
          alt={novedad.title || 'Imagen de novedad'}
          layout="fill"
          objectFit="contain" // Mantenemos contain para verla completa
          priority={false}
          onError={(e) => { e.target.src = '/images/placeholder-novedad.png'; console.error(`Error cargando imagen: ${novedad.imageUrl}`);}}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{novedad.title || "Título no disponible"}</h3>
        {novedad.date && (
          <p className={styles.date}>{formatDate(novedad.date)}</p>
        )}
        <p className={styles.excerpt}>{novedad.excerpt || "Descripción no disponible."}</p>
        {/* Podrías añadir un botón/enlace explícito aquí si quieres ir a la página de detalle */}
        {/* {novedad.slug && (
            <Link href={`/novedades/${novedad.slug}`} legacyBehavior>
              <a className={styles.readMoreLink}>Leer más</a>
            </Link>
        )} */}
      </div>
    </div>
  );
};

export default NovedadCard;