// pages/servicios/serviciosData.js

// --- Importaciones de Iconos ---
import {
  FaBuilding, FaDraftingCompass, FaCalculator, FaRulerCombined,
  FaPencilRuler, FaChalkboardTeacher, FaLaptopCode, FaHardHat
} from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";

// --- Definición de Datos de Servicios ---
// (Esta es la ÚNICA fuente de datos que usaremos)
export const serviciosPorCategoria = [
{
  nombre: "Ingeniería Civil",
  servicios: [
    {
      id: "calculo-estructural",
      titulo: "Cálculo Estructural",
      descripcion: "Análisis y diseño sismorresistente para edificaciones seguras y eficientes.",
      Icono: FaCalculator, // Se mantiene por si se necesita en otro lugar, pero no se pasa a props
      iconoNombre: "FaCalculator", // Se usa para buscar el componente en el frontend
      descripcionLarga: "Realizamos análisis detallados y diseño estructural conforme a las normativas vigentes (NSR-10 y otras aplicables). Nos especializamos en estructuras de concreto reforzado, acero estructural y mampostería, asegurando la estabilidad y seguridad de tus edificaciones ante cargas sísmicas y de uso. Incluye memoria de cálculo y planos estructurales detallados.",
      imagenHero: '../serviciosImage/calculo-estructural.jpg' // Ruta a la imagen de fondo
    },
    {
      id: "diseno-vial",
      titulo: "Diseño Vial",
      descripcion: "Planificación y diseño geométrico de carreteras, calles y pavimentos.",
      Icono: FaRulerCombined,
      iconoNombre: "FaRulerCombined",
      descripcionLarga: "Desarrollamos diseños geométricos para vías urbanas y rurales, incluyendo alineamientos horizontal y vertical, secciones transversales, diseño de pavimentos (rígidos y flexibles) y señalización vial. Consideramos normativas de diseño vial y optimización de rutas para un tránsito seguro y eficiente.",
      imagenHero: '../serviciosImage/diseño-vial.jpg' // Ruta a la imagen de fondo
    },
    {
      id: "topografia-geodesia",
      titulo: "Topografía y Geodesia",
      descripcion: "Levantamientos topográficos precisos y replanteo de obras.",
      Icono: FaHardHat,
      iconoNombre: "FaHardHat",
      descripcionLarga: "Ofrecemos servicios de levantamiento topográfico con estación total y GPS de precisión para lotes, fincas y proyectos de construcción. Realizamos cálculos de áreas, volúmenes, curvas de nivel y replanteo exacto de puntos y ejes para la ejecución de obras civiles y arquitectónicas.",
      imagenHero: '../serviciosImage/topografia-geodesia.jpg' // Ruta a la imagen de fondo
    },
  ]
},
{
  nombre: "Arquitectura",
  servicios: [
    {
      id: "diseno-arquitectonico",
      titulo: "Diseño Arquitectónico",
      descripcion: "Creación de proyectos residenciales, comerciales e institucionales.",
      Icono: GiFamilyHouse,
      iconoNombre: "GiFamilyHouse",
      descripcionLarga: "Transformamos tus ideas y necesidades en espacios funcionales, estéticos y sostenibles. Desarrollamos planos arquitectónicos completos (plantas, cortes, fachadas), diseño de distribución espacial, selección de materiales y acabados, cumpliendo con normativas urbanísticas y de construcción.",
      imagenHero: '../serviciosImage/diseño-arquitectonico.jpg' // Ruta a la imagen de fondo
    },
    {
      id: "modelado-bim",
      titulo: "Modelado BIM y Visualización",
      descripcion: "Desarrollo de modelos 3D inteligentes, planos y renders fotorrealistas.",
      Icono: FaBuilding,
      iconoNombre: "FaBuilding",
      descripcionLarga: "Creamos modelos 3D inteligentes (BIM) utilizando software como Revit, permitiendo una mejor coordinación interdisciplinaria, detección de interferencias y generación automática de planos y cantidades. Producimos visualizaciones 3D y renders fotorrealistas de alta calidad para la presentación de tus proyectos.",
      imagenHero: '../serviciosImage/modelado-bim.jpg' // Ruta a la imagen de fondo
    },
    {
      id: "diseno-interiores",
      titulo: "Diseño de Interiores",
      descripcion: "Optimización de espacios funcionales y estéticos para todo tipo de ambientes.",
      Icono: FaPencilRuler,
      iconoNombre: "FaPencilRuler",
      descripcionLarga: "Diseñamos y optimizamos espacios interiores para viviendas, oficinas y locales comerciales. Nos enfocamos en la distribución funcional, selección de mobiliario, paleta de colores, iluminación y detalles decorativos para crear ambientes confortables y que reflejen tu estilo.",
      imagenHero: '../serviciosImage/diseno-interiores.jpg' // Ruta a la imagen de fondo
    },
  ]
},
{
  nombre: "Asesoría y Capacitación",
  servicios: [
    {
      id: "asesoria-academica",
      titulo: "Asesoría Académica",
      descripcion: "Tutorías personalizadas para estudiantes en trabajos y proyectos universitarios.",
      Icono: FaChalkboardTeacher,
      iconoNombre: "FaChalkboardTeacher",
      descripcionLarga: "Brindamos apoyo personalizado a estudiantes de arquitectura e ingeniería civil en sus trabajos, proyectos de grado, talleres y materias específicas. Te ayudamos a comprender conceptos, desarrollar tus ideas, mejorar tus presentaciones y utilizar herramientas de software de manera efectiva.",
      imagenHero: '../serviciosImage/asesoria-academica.jpg' // Ruta a la imagen de fondo
    },
    {
      id: "capacitacion-software",
      titulo: "Capacitación en Software",
      descripcion: "Cursos prácticos de AutoCAD, Revit, Civil 3D y más herramientas clave.",
      Icono: FaLaptopCode,
      iconoNombre: "FaLaptopCode",
      descripcionLarga: "Ofrecemos cursos y talleres prácticos enfocados en el manejo eficiente de software esencial para arquitectura e ingeniería: AutoCAD (2D y 3D), Revit (Arquitectura y Estructura), Civil 3D (Diseño Vial y Topografía), SketchUp, y software de renderizado. Cursos adaptados a diferentes niveles.",
      imagenHero: '../serviciosImage/capacitacion-software.jpg' // Ruta a la imagen de fondo
    },
  ]
}
];

// --- Función Auxiliar para buscar servicio por ID ---
// (No necesita cambios)
export const getServicioById = (id) => {
  if (!Array.isArray(serviciosPorCategoria)) return undefined;
  return serviciosPorCategoria
           .flatMap(categoria => categoria.servicios || [])
           .find(servicio => servicio && servicio.id === id);
};

// --- Función Auxiliar para obtener todos los servicios ---
// (No necesita cambios)
export const getAllServicios = () => {
  if (!Array.isArray(serviciosPorCategoria)) return [];
  return serviciosPorCategoria.flatMap(categoria => categoria.servicios || []);
};