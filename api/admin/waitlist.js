// Vercel Serverless Function para ver todos los emails de la waitlist
// IMPORTANTE: Este endpoint debe estar protegido en producción
import { kv } from '@vercel/kv';

const WAITLIST_KEY = 'ponsiv:waitlist:emails';

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Método no permitido',
      message: 'Solo se permiten solicitudes GET'
    });
  }

  try {
    // SEGURIDAD: Verificar token de autenticación
    // En producción, debes configurar un token secreto en las variables de entorno de Vercel
    const authHeader = req.headers.authorization;
    const expectedToken = process.env.ADMIN_TOKEN || 'tu-token-secreto-aqui';

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return res.status(401).json({
        error: 'No autorizado',
        message: 'Se requiere autenticación válida'
      });
    }

    // Obtener la lista de emails
    const emails = await kv.get(WAITLIST_KEY) || [];

    // Obtener detalles de cada email
    const detailedEmails = await Promise.all(
      emails.map(async (email) => {
        const details = await kv.get(`ponsiv:waitlist:detail:${email}`);
        return details || { email, timestamp: 'unknown', ip: 'unknown' };
      })
    );

    // Ordenar por timestamp (más recientes primero)
    detailedEmails.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return res.status(200).json({
      success: true,
      total: emails.length,
      emails: detailedEmails
    });

  } catch (error) {
    console.error('❌ Error al obtener la lista:', error);
    return res.status(500).json({
      error: 'Error del servidor',
      message: 'Hubo un error al obtener la lista de espera'
    });
  }
}
