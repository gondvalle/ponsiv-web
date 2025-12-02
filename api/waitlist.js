// Vercel Serverless Function para guardar emails de la waitlist
// Usa Vercel KV (Redis) para almacenar los emails
import { kv } from '@vercel/kv';

const WAITLIST_KEY = 'ponsiv:waitlist:emails';
const RATE_LIMIT_PREFIX = 'ponsiv:ratelimit:';

// Función para implementar rate limiting simple
async function checkRateLimit(ip) {
  const key = `${RATE_LIMIT_PREFIX}${ip}`;
  const requests = await kv.get(key);

  if (requests && requests >= 3) {
    return false; // Ya hizo 3 requests
  }

  // Incrementar contador y establecer expiración de 15 minutos
  await kv.incr(key);
  await kv.expire(key, 900); // 900 segundos = 15 minutos

  return true;
}

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Método no permitido',
      message: 'Solo se permiten solicitudes POST'
    });
  }

  try {
    // Rate limiting por IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const canProceed = await checkRateLimit(ip);

    if (!canProceed) {
      return res.status(429).json({
        error: 'Demasiados intentos',
        message: 'Por favor, espera unos minutos antes de intentar de nuevo'
      });
    }

    const { email } = req.body;

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email inválido',
        message: 'Por favor, proporciona un email válido'
      });
    }

    // Sanitizar el email
    const sanitizedEmail = email.trim().toLowerCase().replace(/[<>]/g, '');

    // Obtener la lista actual de emails
    const existingEmails = await kv.get(WAITLIST_KEY) || [];

    // Verificar si el email ya existe
    if (existingEmails.includes(sanitizedEmail)) {
      return res.status(409).json({
        error: 'Email duplicado',
        message: 'Este email ya está registrado en la lista de espera'
      });
    }

    // Agregar el nuevo email con timestamp
    const newEntry = {
      email: sanitizedEmail,
      timestamp: new Date().toISOString(),
      ip: ip
    };

    existingEmails.push(sanitizedEmail);

    // Guardar la lista actualizada en KV
    await kv.set(WAITLIST_KEY, existingEmails);

    // También guardar detalles completos en una key separada
    await kv.set(`ponsiv:waitlist:detail:${sanitizedEmail}`, newEntry);

    console.log(`✅ Nuevo email registrado: ${sanitizedEmail}`);

    // Responder con éxito
    return res.status(200).json({
      success: true,
      message: 'Email registrado correctamente',
      data: {
        email: sanitizedEmail,
        timestamp: newEntry.timestamp
      }
    });

  } catch (error) {
    console.error('❌ Error al procesar la solicitud:', error);
    return res.status(500).json({
      error: 'Error del servidor',
      message: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'
    });
  }
}
