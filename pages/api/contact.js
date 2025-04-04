
import { Resend } from 'resend'; // Importa Resend

// Configuración básica de validación 
function validateData(data) {
  const { nombre, correo, mensaje } = data;
  if (!nombre || !nombre.trim()) return { valid: false, message: 'El nombre es obligatorio.' };
  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return { valid: false, message: 'El formato del correo electrónico no es válido.' };
  if (!mensaje || !mensaje.trim()) return { valid: false, message: 'El mensaje es obligatorio.' };
  return { valid: true };
}

// Inicializa Resend con tu clave API desde las variables de entorno
// ¡¡ASEGÚRATE DE TENER LA NUEVA CLAVE API EN .env.local!!
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Solo aceptar método POST (igual que antes)
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Método ${req.method} no permitido` });
  }

  // 2. Extraer y validar datos (igual que antes)
  const { nombre, correo, telefono, mensaje } = req.body;

  const validation = validateData({ nombre, correo, mensaje });
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  // 3. Intentar enviar el correo usando Resend
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM, // El remitente configurado en .env.local (ej: 'Tu Web <onboarding@resend.dev>')
      to: [process.env.EMAIL_TO],   // El destinatario (ej: ['tu_correo@gmail.com']) ¡ARRAY!
      subject: `Nuevo mensaje de contacto de: ${nombre}`,
      reply_to: correo, // Para que al hacer 'Responder' en tu email, le responda al usuario
      html: `<p>Has recibido un nuevo mensaje desde tu formulario de contacto:</p>` +
            `<ul>` +
            `<li><strong>Nombre:</strong> ${nombre}</li>` +
            `<li><strong>Correo:</strong> ${correo}</li>` +
            `<li><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</li>` +
            `</ul>` +
            `<h2>Mensaje:</h2>` +
            `<div style="white-space: pre-wrap; font-family: sans-serif;">${mensaje}</div>`,
    });

    // 4. Manejar la respuesta de Resend
    if (error) {
      console.error('Error de Resend al enviar correo:', error);
      return res.status(400).json({ message: 'Error al procesar el envío del mensaje.', details: error.message });
    }

    // 5. Éxito
    console.log('Correo enviado con éxito vía Resend:', data);
    return res.status(200).json({ message: '¡Mensaje enviado con éxito!' }); // Mensaje para el frontend

  } catch (error) {
    // 6. Manejar errores inesperados
    console.error('Error inesperado en la API de contacto:', error);
    return res.status(500).json({ message: 'Error interno del servidor al enviar el mensaje.' });
  }
}