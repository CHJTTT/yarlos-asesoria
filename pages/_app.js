import '../styles/global.css'; 
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '700'],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YARLOS ASESORÍA - Arquitectura e Ingeniería</title>
        <meta name="description" content="Brindamos apoyo académico y profesional en proyectos arquitectónicos e ingenieriles." />
        <meta name="keywords" content="Arquitectura, Ingeniería Civil, Asesoría, Proyectos, Modelado 3D" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="author" content="YARLOS ASESORÍA" />
      </Head>

      <main className={raleway.className}>
        {/* Navbar y Footer para TODAS las páginas */}
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
}

export default MyApp;
