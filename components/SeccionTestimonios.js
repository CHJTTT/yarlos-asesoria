// components/SeccionTestimonios.js
import Image from 'next/image'; // Para optimización de imágenes
import styles from '../styles/testimonios.module.css'; // Crea este archivo CSS
import { motion } from 'framer-motion'; // Para animaciones

// Datos (pueden venir de props o importarse)
const testimoniosData = [
  { id: 1, nombre: "Ana García", puesto: "CEO, Empresa Creativa", testimonio: "El equipo de YARLOS superó nuestras expectativas...", imagen: "/images/placeholder-avatar.png" },
  { id: 2, nombre: "Carlos Martínez", puesto: "Ing. Civil, Constructora XYZ", testimonio: "Contratamos a YARLOS para el cálculo estructural...", imagen: "/images/placeholder-avatar.png" },
  { id: 3, nombre: "Sofía López", puesto: "Estudiante de Arquitectura", testimonio: "La asesoría académica personalizada me ayudó muchísimo...", imagen: "/images/placeholder-avatar.png" },
];

// Variantes de animación (opcional)
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } } // Anima las tarjetas una tras otra
};

export default function SeccionTestimonios() {
  return (
    <section className={styles.testimoniosSection}>
      <div className={styles.container}> {/* Contenedor para centrar o limitar ancho */}
        <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Anima cuando entra en la vista
          viewport={{ once: true, amount: 0.2 }} // Configuración de la vista
        >
          {testimoniosData.map((testimonio) => (
            <motion.div
              key={testimonio.id}
              className={styles.card}
              variants={cardVariants} // Aplica animación a cada tarjeta
            >
              <div className={styles.cardContent}>
                <p className={styles.quote}>"{testimonio.testimonio}"</p>
              </div>
              <div className={styles.authorInfo}>
                {testimonio.imagen && (
                  <div className={styles.avatarContainer}>
                    <Image
                      src={testimonio.imagen}
                      alt={`Foto de ${testimonio.nombre}`}
                      width={60} // Especifica tamaño
                      height={60}
                      className={styles.avatar}
                      // objectFit="cover" // Descomentar si usas layout="fill"
                    />
                  </div>
                )}
                <div>
                  <p className={styles.authorName}>{testimonio.nombre}</p>
                  {testimonio.puesto && (
                    <p className={styles.authorTitle}>{testimonio.puesto}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}