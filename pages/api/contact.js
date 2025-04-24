// pages/api/contact.js
import { Resend } from 'resend';

// --- Configuración Inicial y Logs de Variables ---
// LOG: Verifica si la API Key de Resend se está cargando desde el entorno
const resendApiKey = process.env.RESEND_API_KEY;
console.log(`RESEND_API_KEY loaded: ${!!resendApiKey}`); // true si existe, false si no

// LOG: Verifica la dirección de destino
const emailTo = process.env.EMAIL_TO;
console.log(`EMAIL_TO loaded: ${emailTo}`);

// LOG: Verifica la dirección de remitente (DEBE ser de un dominio verificado en Resend para producción)
const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'; // Usa un default si no está configurado
console.log(`EMAIL_FROM loaded (or default): ${emailFrom}`);

// Inicializa Resend SOLAMENTE si la API Key existe
let resend;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
  console.log('Resend SDK initialized.');
} else {
  console.error('FATAL: RESEND_API_KEY environment variable is not set!');
  // Puedes decidir si quieres que la función falle aquí o intente continuar (pero fallará al enviar)
}
// --- Fin Configuración ---


export default async function handler(req, res) {
  // LOG: Indica que la ruta fue alcanzada y qué método se usó
  console.log(`API route /api/contact hit. Method: ${req.method}`);

  // 1. Asegurarse que sea un método POST
  if (req.method !== 'POST') {
    console.log('Request method is not POST. Returning 405.');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // --- Verificación de Configuración Crítica ---
  if (!resend) {
      console.error('Resend SDK not initialized because RESEND_API_KEY is missing.');
      return res.status(500).json({ success: false, message: 'Error de configuración del servidor (API Key faltante).' });
  }
  if (!emailTo) {
      console.error('EMAIL_TO environment variable is not set.');
      return res.status(500).json({ success: false, message: 'Error de configuración del servidor (Email de destino faltante).' });
  }
  // --- Fin Verificación ---


  // 2. Extraer los datos del cuerpo de la solicitud
  const { name, email, phone, message } = req.body;
  // LOG: Muestra los datos recibidos del formulario
  console.log('Received data from form:', { name, email, phone, message });


  // 3. Validación básica
  if (!name || !email || !message) {
    console.error('Validation failed: Missing name, email, or message.');
    return res.status(400).json({ message: 'Nombre, Email y Mensaje son requeridos.' });
  }


  // 4. Enviar el Email usando Resend
  try {
    // LOG: Indica que se va a intentar el envío
    console.log(`Attempting to send email via Resend from <${emailFrom}> to <${emailTo}>`);

    const { data, error } = await resend.emails.send({
      from: `Formulario Web - Yarlos <${emailFrom}>`, // Personaliza el nombre del remitente
      to: [emailTo],
      reply_to: email,
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      html: `<p>Has recibido un nuevo mensaje de tu formulario de contacto:</p>
             <ul>
               <li><strong>Nombre:</strong> ${name}</li>
               <li><strong>Email:</strong> ${email}</li>
               <li><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</li>
             </ul>
             <p><strong>Mensaje:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
      // text: `... versión texto plano ...` // Opcional
    });

    // 5. Manejo de la respuesta de Resend
    if (error) {
      // LOG: ¡Este es el log MÁS IMPORTANTE si Resend devuelve un error!
      console.error('Error response from Resend API:', JSON.stringify(error, null, 2));
      return res.status(400).json({ success: false, message: error.message || 'Error al enviar desde Resend.' });
    }

    // LOG: Muestra la respuesta de Resend si el envío fue exitoso
    console.log('Email sent successfully via Resend! Response data:', data);
    // Éxito
    return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });

  } catch (error) { // Captura errores inesperados (ej. de red, SDK)
    // LOG: Captura cualquier otro error no manejado directamente por Resend
    console.error('Unexpected error in API handler while trying to send email:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
}