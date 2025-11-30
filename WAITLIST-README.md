# Sistema de Waitlist - Ponsiv

## 📧 Cómo funciona

La página `/coming-soon` permite a los usuarios registrarse en una lista de espera para ser notificados cuando la app esté disponible.

### Características de Seguridad

1. **Validación de Email**: 
   - Validación con regex para formato correcto
   - Prevención de emails duplicados

2. **Sanitización**:
   - Eliminación de caracteres peligrosos (`<`, `>`)
   - Conversión a minúsculas
   - Trim de espacios

3. **Protección contra Ataques**:
   - Validación en el frontend antes de guardar
   - Sanitización de inputs
   - Rate limiting implícito (un email por vez)

### Almacenamiento Actual

**Desarrollo**: Los emails se guardan en `localStorage` del navegador.

**Producción**: Para producción, deberías:

1. Crear un endpoint API (Node.js/Express, Python/Flask, etc.)
2. Guardar en una base de datos (MongoDB, PostgreSQL, etc.)
3. Implementar rate limiting en el servidor
4. Agregar CAPTCHA para prevenir bots
5. Implementar validación de email real (enviar código de confirmación)

### Ejemplo de Endpoint API (Node.js/Express)

```javascript
// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiting: máximo 3 requests por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Demasiados intentos, por favor intenta más tarde'
});

app.post('/api/waitlist', limiter, async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validación
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Sanitización
    const sanitizedEmail = email.trim().toLowerCase().replace(/[<>]/g, '');

    // Leer archivo actual
    const filePath = path.join(__dirname, 'waitlist-emails.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

    // Verificar duplicados
    if (data.emails.includes(sanitizedEmail)) {
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    // Agregar email
    data.emails.push(sanitizedEmail);
    data.lastUpdated = new Date().toISOString();

    // Guardar
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    res.json({ success: true, message: 'Email registrado correctamente' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.listen(3001, () => {
  console.log('API corriendo en http://localhost:3001');
});
```

### Cómo Integrar el Backend

1. Instala las dependencias:
```bash
npm install express express-rate-limit
```

2. Crea el archivo `server.js` con el código de arriba

3. Actualiza `ComingSoon.jsx` para usar la API:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:3001/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: sanitizeEmail(email) }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al registrar');
    }

    setIsSuccess(true);
    setEmail('');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

4. Ejecuta el servidor:
```bash
node server.js
```

### Ver los Emails Registrados

Los emails se guardan en `waitlist-emails.json`. Puedes verlos con:

```bash
cat waitlist-emails.json
```

O crear un endpoint admin para verlos:

```javascript
app.get('/api/admin/waitlist', async (req, res) => {
  // Agregar autenticación aquí
  const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
  res.json(data);
});
```

## 🚀 Mejoras Futuras

- [ ] Implementar backend con API
- [ ] Base de datos real (MongoDB/PostgreSQL)
- [ ] CAPTCHA (reCAPTCHA)
- [ ] Confirmación de email
- [ ] Panel admin para ver/exportar emails
- [ ] Envío automático de emails cuando la app esté lista
- [ ] Analytics de conversión

## 📝 Notas

- El archivo `waitlist-emails.json` debe estar en `.gitignore` para no subir emails a Git
- En producción, usa variables de entorno para configuración
- Implementa HTTPS para proteger los datos en tránsito
