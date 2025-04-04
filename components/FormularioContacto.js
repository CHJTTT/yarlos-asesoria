import { useState } from 'react';
import styles from '../styles/contacto.module.css'; // Tu archivo CSS

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });
  const [status, setStatus] = useState(''); // '', 'enviando', 'exito', 'error'
  const [mensajeStatus, setMensajeStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    setMensajeStatus(''); // Limpiar mensaje previo

    // Validación básica simple (puedes añadir más)
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
        setStatus('error');
        setMensajeStatus('Por favor, completa todos los campos obligatorios (*).');
        return; // Detiene el envío si faltan campos requeridos
    }

    try {
      // --- LÓGICA DE ENVÍO ---
      const response = await fetch('/api/contact', { // ¡¡ASEGÚRATE QUE ESTA RUTA API EXISTA Y FUNCIONE!!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Intenta obtener más detalles del error si el backend los envía
        let errorMsg = `Error en el servidor: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg; // Usa el mensaje del backend si existe
        } catch (jsonError) {
          // Si la respuesta de error no es JSON, usa el statusText
        }
        throw new Error(errorMsg);
      }

      // Si todo fue bien
      // const result = await response.json(); // Descomenta si tu API devuelve datos útiles
      setStatus('exito');
      setMensajeStatus('¡Mensaje enviado con éxito! Gracias por contactarnos.');
      setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' }); // Limpiar formulario

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setStatus('error');
      // Muestra el mensaje de error (puede ser el genérico o el del backend si se pudo obtener)
      setMensajeStatus(error.message || 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos por otro medio.');
    }
  };

  return (
    // NOTA: El CSS que pasaste aplica estilos a los hijos de .formContainer (form, input, etc.)
    // por lo que no necesitamos añadir clases específicas a form, input, etc. aquí,
    // excepto para los mensajes de estado y el indicador de requerido.
    <form onSubmit={handleSubmit}>
      {/* Campo Nombre */}
      <div className={styles.formGroup}> {/* Agregado para agrupar label+input */}
        <label htmlFor="nombre">
          Nombre <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required // Mantenemos validación del navegador
          disabled={status === 'enviando'}
        />
      </div>

      {/* Campo Correo Electrónico */}
      <div className={styles.formGroup}> {/* Agregado para agrupar label+input */}
        <label htmlFor="correo">
          Correo Electrónico <span className={styles.requiredIndicator}>*</span>
        </label>
        <input
          id="correo"
          type="email"
          name="correo"
          placeholder="Ingresa tu correo"
          value={formData.correo}
          onChange={handleChange}
          required
          disabled={status === 'enviando'}
        />
      </div>

      {/* Campo Teléfono */}
      <div className={styles.formGroup}> {/* Agregado para agrupar label+input */}
        <label htmlFor="telefono">Teléfono (Opcional)</label>
        <input
          id="telefono"
          type="tel"
          name="telefono"
          placeholder="Ingresa tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
          disabled={status === 'enviando'}
        />
      </div>

      {/* Campo Mensaje */}
      <div className={styles.formGroup}> {/* Agregado para agrupar label+input */}
        <label htmlFor="mensaje">
          Mensaje <span className={styles.requiredIndicator}>*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Escribe tu consulta o requerimiento"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows={5} // Altura inicial sugerida
          disabled={status === 'enviando'}
        ></textarea>
      </div>

      {/* --- MENSAJES DE ESTADO --- */}
      {mensajeStatus && (
        <div className={status === 'exito' ? styles.successMessage : styles.errorMessage}>
          {mensajeStatus}
        </div>
      )}

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={status === 'enviando'}
      >
        {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}