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

  // Función para manejar el clic en la imagen
  const handleImageContainerClick = (e) => {
    e.stopPropagation();
    if (onImageClick && novedad.imageUrl) {
      onImageClick(novedad.imageUrl);
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imageContainer} // ASUME que este div tiene position: relative o similar en el CSS
        onClick={handleImageContainerClick}
        style={{ cursor: 'pointer' }}
      >
        {/* --- MODIFICACIÓN AQUÍ --- */}
        <Image
          src={novedad.imageUrl || '/images/placeholder-novedad.png'}
          alt={novedad.title || 'Imagen de novedad'}
          fill // Mantenemos 'fill' porque antes usaba layout="fill"
          style={{ objectFit: 'contain' }} // Usamos 'style' para objectFit
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opcional: Ajusta estos tamaños según tu diseño
          onError={(e) => { e.target.src = '/images/placeholder-novedad.png'; console.error(`Error cargando imagen: ${novedad.imageUrl}`);}}
        />
        {/* --- FIN MODIFICACIÓN --- */}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{novedad.title || "Título no disponible"}</h3>
        {novedad.date && (
          <p className={styles.date}>{formatDate(novedad.date)}</p>
        )}
        <p className={styles.excerpt}>{novedad.excerpt || "Descripción no disponible."}</p>
        {/* ... resto del contenido ... */}
      </div>
    </div>
  );
};

export default NovedadCard;