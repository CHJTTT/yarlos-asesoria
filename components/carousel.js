import Slider from "react-slick";
import Link from 'next/link'; // Importar Link si los CTAs van a páginas internas
import { motion } from "framer-motion"; // Para animaciones hover
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"; // Quitar si personalizas todo
import styles from "../styles/Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Ejemplo si usas iconos
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"; // Iconos para flechas

// --- NUEVA ESTRUCTURA DE DATOS ---
// Reemplaza esto con el contenido REAL de tus flyers/imágenes
const slideData = [
  {
    id: 1,
    title: "Diseño Arquitectónico",
    description: "Transformamos tus ideas en planos detallados y visualizaciones 3D impactantes.",
    // imageSrc: "/images/ilustracion-diseno.svg", // Opcional: imagen ilustrativa o de fondo
    link: "/servicios#diseno", // Enlace a sección o página
    ctaText: "Saber Más"
  },
  {
    id: 2,
    title: "Asesoría Estructural",
    description: "Análisis y cálculo para garantizar la seguridad y eficiencia de tu construcción.",
    // imageSrc: "/images/ilustracion-estructura.svg",
    link: "/servicios#calculo",
    ctaText: "Ver Detalles"
  },
  {
    id: 3,
    title: "Modelado BIM",
    description: "Implementamos Building Information Modeling para optimizar tus proyectos.",
    // imageSrc: "/images/ilustracion-bim.svg",
    link: "/servicios#modelado",
    ctaText: "Explorar"
  },
   {
    id: 4,
    title: "Topografía y Teodolito",
    description: "Mediciones precisas del terreno utilizando equipos como el teodolito para bases sólidas.",
    // imageSrc: "/images/teodolito-icono.svg", // Usar el teodolito como icono/ilustración
    link: "/servicios#topografia",
    ctaText: "Consultar"
  },
  // Agrega más objetos según necesites
];

// --- Flechas Personalizadas con FontAwesome ---
function CustomPrevArrow({ onClick }) {
  return (
    <button className={`${styles.customArrow} ${styles.customPrevArrow}`} onClick={onClick} aria-label="Anterior">
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}

function CustomNextArrow({ onClick }) {
  return (
    <button className={`${styles.customArrow} ${styles.customNextArrow}`} onClick={onClick} aria-label="Siguiente">
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
}

export default function Carousel() {
  const settings = {
    dots: true, // Mostrar puntos para navegación
    infinite: true,
    speed: 600,
    slidesToShow: 3, // Mostrar 3 tarjetas en escritorio
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Un poco más lento
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: true, // Activar modo centrado para ver tarjetas adyacentes
    centerPadding: "40px", // Espacio para mostrar parte de las tarjetas laterales
    responsive: [
      {
        breakpoint: 1200, // Ajustar breakpoints
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true, // Mantener centrado en móvil puede ser bueno
          centerPadding: "20px", // Menos padding en móvil
          dots: true, // Asegurar puntos en móvil
          arrows: false, // Ocultar flechas en pantallas muy pequeñas
        },
      },
       {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15px",
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    // Quitar el contenedor con fondo de aquí si la sección padre ya lo tiene
    // <div className={styles.carouselOuterContainer}>
      <div className={styles.carouselSliderWrapper}> {/* Nuevo wrapper para el slider */}
        <Slider {...settings}>
          {slideData.map((slide) => (
            <div key={slide.id} className={styles.slidePadding}> {/* Padding para evitar corte de sombra */}
              <motion.div
                className={styles.slide}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                 // Estilo opcional para fondo de tarjeta con imagen
                 // style={slide.imageSrc ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {/* Contenido de la tarjeta */}
                {/* {slide.imageSrc && !estiloDeFondo && <img src={slide.imageSrc} alt="" className={styles.slideImageTop} />} */}
                <h3 className={styles.slideTitle}>{slide.title}</h3>
                <p className={styles.slideDescription}>{slide.description}</p>
                <Link href={slide.link} passHref legacyBehavior>
                  <motion.a
                    className={styles.slideButton}
                    whileHover={{ scale: 1.05, backgroundColor: "var(--color-primario)"}} // Ejemplo hover botón
                    whileTap={{ scale: 0.95 }}
                  >
                    {slide.ctaText}
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    // </div>
  );
}