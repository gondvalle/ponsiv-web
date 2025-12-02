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
   - Validación en el frontend y backend
   - Sanitización de inputs
   - Rate limiting por IP (3 requests cada 15 minutos)

### Almacenamiento

**Producción (Vercel)**: Los emails se guardan en **Vercel KV** (Redis) - gratuito y automático.

---

## 🚀 Configuración en Vercel (IMPORTANTE)

### Paso 1: Crear la Base de Datos Vercel KV

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto (ponsiv-web o como lo hayas llamado)
3. Ve a la pestaña **Storage**
4. Haz clic en **Create Database**
5. Selecciona **KV (Redis)**
6. Dale un nombre (ej: `ponsiv-waitlist`)
7. Haz clic en **Create**
8. Vercel automáticamente conectará tu base de datos al proyecto

### Paso 2: Configurar Variable de Entorno para Admin

1. En tu proyecto de Vercel, ve a **Settings** → **Environment Variables**
2. Agrega esta variable:
   - **Name**: `ADMIN_TOKEN`
   - **Value**: Genera un token secreto
   - **Environment**: Marca Production, Preview, y Development
3. Haz clic en **Save**

### Paso 3: Desplegar

1. Haz commit y push de los cambios:
   ```bash
   git add .
   git commit -m "Add Vercel KV waitlist system"
   git push
   ```

2. Vercel desplegará automáticamente tu proyecto con la configuración de KV.

### Paso 4: Probar la Waitlist

1. Ve a tu URL de producción: `https://tu-dominio.vercel.app/coming-soon`
2. Ingresa un email de prueba
3. Deberías ver el mensaje de éxito

---

## 📊 Ver los Emails Guardados

Hay dos formas de ver los emails registrados:

### Opción 1: Desde el Dashboard de Vercel KV

1. Ve a tu proyecto en Vercel
2. Storage → Tu base de datos KV
3. Ve a la pestaña **Data**
4. Busca la key: `ponsiv:waitlist:emails`
5. Ahí verás la lista completa

### Opción 2: Usar el API Endpoint (Recomendado)

Haz una petición GET al endpoint admin con tu token:

```bash
curl -H "Authorization: Bearer tu-token-secreto-aqui" \
  https://www.ponsiv.com/api/admin/waitlist
```

Respuesta:
```json
{
  "success": true,
  "total": 5,
  "emails": [
    {
      "email": "usuario1@example.com",
      "timestamp": "2024-12-02T18:30:00.000Z",
      "ip": "123.456.789.0"
    }
  ]
}
```

### Exportar a CSV

Puedes usar este comando para exportar directamente a CSV:

```bash
curl -H "Authorization: Bearer tu-token-secreto-aqui" \
  https://www.ponsiv.com/api/admin/waitlist | \
  jq -r '.emails[] | [.email, .timestamp, .ip] | @csv' > waitlist.csv
```

### Entra por Web

1. Ve a tu URL de producción: `https://www.ponsiv.com/admin-pnv-wl-2024`
2. Ingresa tu token de administrador
3. Verás la lista completa de emails

---

## 📁 Archivos Importantes

### `/api/waitlist.js`
Endpoint POST para registrar emails. Incluye:
- Validación de emails
- Rate limiting (3 requests cada 15 min por IP)
- Sanitización de inputs
- Detección de duplicados

### `/api/admin/waitlist.js`
Endpoint GET protegido para ver todos los emails. Requiere autenticación con token.

### `/src/pages/ComingSoon.jsx`
Página del coming soon que usa la API de Vercel.

---

## 🔒 Seguridad

- ✅ Rate limiting por IP
- ✅ Validación de emails en frontend y backend
- ✅ Sanitización de inputs
- ✅ CORS configurado
- ✅ Endpoint admin protegido con token
- ✅ Almacenamiento seguro en Vercel KV

---

## 🚀 Arquitectura

```
Usuario visita /coming-soon
       ↓
Ingresa email en formulario
       ↓
Frontend valida y sanitiza
       ↓
POST /api/waitlist
       ↓
Vercel Function procesa
       ↓
Guarda en Vercel KV (Redis)
       ↓
Responde al usuario
```

---

## ❓ Preguntas Frecuentes

### ¿Cuántos emails puedo guardar?
Vercel KV tiene un plan gratuito que permite almacenar bastantes datos. Para la mayoría de waitlists, será suficiente.

### ¿Cómo veo los logs?
En Vercel Dashboard → Tu Proyecto → Logs. Verás cada email registrado con emoji ✅.

### ¿Puedo exportar los emails?
Sí, usa el endpoint admin con curl o desde el dashboard de Vercel KV.

### ¿Qué pasa si alguien intenta spam?
El rate limiting bloquea más de 3 intentos cada 15 minutos por IP.

### ¿Puedo usar otra base de datos?
Sí, puedes cambiar `@vercel/kv` por cualquier otra (Postgres, MongoDB, etc.).

---

## 📝 Notas

- Guarda tu `ADMIN_TOKEN` en un lugar seguro
- No subas el token a Git
- Los emails se guardan con timestamp e IP para analytics
- El sistema detecta automáticamente duplicados
