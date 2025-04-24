import { useState } from 'react';
import styles from '../styles/contacto.module.css'; // Tu archivo CSS

export default function FormularioContacto() {
  // --- MODIFICADO: Estado inicial con claves en inglés ---
  const [formData, setFormData] = useState({
    name: '',     // Cambiado de 'nombre'
    email: '',    // Cambiado de 'correo'
    phone: '',    // Cambiado de 'telefono'
    message: '',  // Cambiado de 'mensaje'
  });
  // --- FIN MODIFICACIÓN ---

  const [status, setStatus] = useState(''); // '', 'enviando', 'exito', 'error'
  const [mensajeStatus, setMensajeStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    setMensajeStatus('');

    // --- MODIFICADO: Validación usando claves en inglés ---
    if (!formData.name || !formData.email || !formData.message) {
        setStatus('error');
        setMensajeStatus('Por favor, completa todos los campos obligatorios (*).');
        return;
    }
    // --- FIN MODIFICACIÓN ---

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // formData ahora tiene las claves correctas (name, email, etc.)
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMsg = `Error en el servidor: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonError) { /* Ignorar error de parseo JSON */ }
        throw new Error(errorMsg);
      }

      setStatus('exito');
      setMensajeStatus('¡Mensaje enviado con éxito! Gracias por contactarnos.');
      // --- MODIFICADO: Limpiar formulario usando claves en inglés ---
      setFormData({ name: '', email: '', phone: '', message: '' });
      // --- FIN MODIFICACIÓN ---

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus('error');
      setMensajeStatus(error.message || 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos por otro medio.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* --- Campo Nombre (name y value modificados) --- */}
      <div className={styles.formGroup}>
        <label htmlFor="nombre"> {/* htmlFor e id pueden quedar en español */}
          Nombre <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="nombre"
          type="text"
          name="name" // <-- MODIFICADO
          placeholder="Ingresa tu nombre"
          value={formData.name} // <-- MODIFICADO
          onChange={handleChange}
          required
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Correo Electrónico (name y value modificados) --- */}
      <div className={styles.formGroup}>
        <label htmlFor="correo">
          Correo Electrónico <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="correo"
          type="email"
          name="email" // <-- MODIFICADO
          placeholder="Ingresa tu correo"
          value={formData.email} // <-- MODIFICADO
          onChange={handleChange}
          required
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Teléfono (name y value modificados) --- */}
      <div className={styles.formGroup}>
        <label htmlFor="telefono">Teléfono (Opcional)</label>
        <input
          id="telefono"
          type="tel"
          name="phone" // <-- MODIFICADO
          placeholder="Ingresa tu teléfono"
          value={formData.phone} // <-- MODIFICADO
          onChange={handleChange}
          disabled={status === 'enviando'}
        />
      </div>

      {/* --- Campo Mensaje (name y value modificados) --- */}
      <div className={styles.formGroup}>
        <label htmlFor="mensaje">
          Mensaje <span className={styles.requiredIndicator}>*</span>
        </label>
        <textarea
          id="mensaje"
          name="message" // <-- MODIFICADO
          placeholder="Escribe tu consulta o requerimiento"
          value={formData.message} // <-- MODIFICADO
          onChange={handleChange}
          required
          rows={5}
          disabled={status === 'enviando'}
        ></textarea>
      </div>

      {/* --- MENSAJES DE ESTADO (sin cambios) --- */}
      {mensajeStatus && (
        <div className={status === 'exito' ? styles.successMessage : styles.errorMessage}>
          {mensajeStatus}
        </div>
      )}

      {/* --- Botón de Envío (sin cambios) --- */}
      <button
        type="submit"
        disabled={status === 'enviando'}
      >
        {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}