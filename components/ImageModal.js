// components/ImageModal.js
import React from 'react';
import Image from 'next/image';
import styles from '../styles/modal.module.css'; // Crearemos este archivo CSS

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null; // No mostrar nada si no hay URL

  // Evitar que el clic en la imagen cierre el modal (si está dentro del backdrop)
  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    // El fondo oscuro que cierra al hacer clic
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleImageClick}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {/* Usamos una etiqueta img normal para simplicidad aquí,
            o podrías usar next/image si necesitas optimización específica */}
        <img src={imageUrl} alt="Imagen ampliada" className={styles.modalImage} />
        {/* Si usaras next/image:
        <div style={{ position: 'relative', width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '85vh' }}>
             <Image
               src={imageUrl}
               alt="Imagen ampliada"
               layout="intrinsic" // O 'responsive' dependiendo del tamaño que quieras
               width={800} // Ancho máximo deseado (ajusta)
               height={600} // Alto máximo deseado (ajusta)
               objectFit="contain" // Para asegurar que se vea completa
               priority // Dar prioridad para carga rápida
             />
           </div>
         */}
      </div>
    </div>
  );
};

export default ImageModal;