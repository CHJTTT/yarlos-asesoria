import { useState } from 'react';
import styles from '../styles/contacto.module.css';

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Datos enviados:\nNombre: ${formData.nombre}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nMensaje: ${formData.mensaje}`);
    setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="correo"
          placeholder="Ingresa tu correo"
          value={formData.correo}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Teléfono</label>
        <input
          type="tel"
          name="telefono"
          placeholder="Ingresa tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Mensaje</label>
        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className={styles.textarea}
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.submitBtn}>Enviar</button>
    </form>
  );
}
