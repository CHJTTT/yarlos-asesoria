import { useState } from 'react';
import styles from '../styles/contacto.module.css'; // Tu archivo CSS

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState(''); // '', 'enviando', 'exito', 'error'
  const [mensajeStatus, setMensajeStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ***** INICIO MODIFICACIÓN PARA FORMSPREE *****
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    setMensajeStatus('Enviando tu mensaje...'); // Mensaje mientras se envía

    // Validación (igual que antes)
    if (!formData.name || !formData.email || !formData.message) {
        setStatus('error');
        setMensajeStatus('Por favor, completa todos los campos obligatorios (*).');
        return;
    }

    // ---- ¡CAMBIO IMPORTANTE! ----
    // Reemplaza esta URL con la URL de tu endpoint de Formspree
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkgroraq'; // <-- ¡¡PON TU URL AQUÍ!!
    // ---------------------------

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { // <-- Usa la URL de Formspree
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // <-- Recomendado por Formspree para AJAX
        },
        body: JSON.stringify(formData), // Envía los datos del estado
      });

      // Formspree responde con ok: true si fue exitoso
      if (!response.ok) {
        let errorMsg = `Error desde Formspree: ${response.statusText}`;
        try {
          // Intenta obtener más detalles del error si Formspree envía JSON
          const errorData = await response.json();
          errorMsg = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : errorMsg;
        } catch (jsonError) { /* Ignorar error de parseo JSON */ }
        throw new Error(errorMsg);
      }

      // Éxito
      setStatus('exito');
      setMensajeStatus('¡Mensaje enviado con éxito! Gracias por contactarnos.');
      // Limpiar formulario (igual que antes)
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (error) {
      console.error("Error al enviar el formulario a Formspree:", error);
      setStatus('error');
      setMensajeStatus(error.message || 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
    }
  };
  // ***** FIN MODIFICACIÓN PARA FORMSPREE *****


  return (
    // El action y method en <form> no son estrictamente necesarios si usas fetch,
    // pero no hace daño dejarlos si quisieras un fallback sin JS (aunque Formspree necesita JS para el success/error inline)
    <form onSubmit={handleSubmit} /* action={FORMSPREE_ENDPOINT} method="POST" */ >

      {/* --- Campo Nombre --- */}
      <div className={styles.formGroup}>
        <label htmlFor="nombre">
          Nombre <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="nombre" // id puede quedar en español
          type="text"
          name="name" // name debe coincidir con las claves del estado formData
          placeholder="Ingresa tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Correo Electrónico --- */}
      <div className={styles.formGroup}>
        <label htmlFor="correo">
          Correo Electrónico <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="correo"
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Teléfono --- */}
      <div className={styles.formGroup}>
        <label htmlFor="telefono">Teléfono (Opcional)</label>
        <input
          id="telefono"
          type="tel"
          name="phone"
          placeholder="Ingresa tu teléfono"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Mensaje --- */}
      <div className={styles.formGroup}>
        <label htmlFor="mensaje">
          Mensaje <span className={styles.requiredIndicator}>*</span>
        </label>
        <textarea
          id="mensaje"
          name="message"
          placeholder="Escribe tu consulta o requerimiento"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          disabled={status === 'enviando'}
        ></textarea>
      </div>

      {/* --- MENSAJES DE ESTADO (igual que antes) --- */}
      {mensajeStatus && (
        <div className={status === 'exito' ? styles.successMessage : styles.errorMessage}>
          {mensajeStatus}
        </div>
      )}

      {/* --- Botón de Envío (igual que antes) --- */}
      <button
        type="submit"
        disabled={status === 'enviando'}
      >
        {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}