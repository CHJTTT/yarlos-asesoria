import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Carousel.module.css"; // Importamos los estilos

const images = [
  "/images/teodolito.jpg",
  "/images/diseñamosContigo.jpg",
  "/images/NosotrosTeAyudamos.jpg"
];

// Componente para la flecha izquierda
function CustomPrevArrow({ onClick }) {
  return <div className={`${styles.customArrow} ${styles.customPrevArrow}`} onClick={onClick}>‹</div>;
}

// Componente para la flecha derecha
function CustomNextArrow({ onClick }) {
  return <div className={`${styles.customArrow} ${styles.customNextArrow}`} onClick={onClick}>›</div>;
}

// Configuración del carrusel
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />
};

export default function Carousel() {
  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className={styles.slide}>
            <img src={src} alt={`Slide ${index + 1}`} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
