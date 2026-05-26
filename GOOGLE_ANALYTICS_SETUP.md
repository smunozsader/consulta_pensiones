# Configuración de Google Analytics

## Estado Actual
✅ Google Analytics está configurado en `app/layout.tsx`  
⏳ Pendiente: Reemplazar ID de prueba con tu ID real

## Pasos para Obtener tu ID Real

### 1. Accede a Google Analytics
```
https://analytics.google.com
```

### 2. Selecciona tu Propiedad
- Si no tienes una propiedad creada:
  - Click en "Crear una propiedad"
  - Nombre: "Consultoría Pensiones"
  - Zona horaria: América/Ciudad de México
  - Moneda: MXN

### 3. Obtén tu Measurement ID
- En el navegador izquierdo: Admin (⚙️)
- Sección "Propiedad": Data Streams
- Click en tu sitio web
- **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 4. Reemplaza en el Código

**Archivo:** `web/app/layout.tsx`

Busca estas dos líneas (aprox. línea 53 y 61):

```typescript
// ANTES:
src="https://www.googletagmanager.com/gtag/js?id=G-PENSIONES2026"
gtag('config', 'G-PENSIONES2026');

// DESPUÉS (ejemplo):
src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF45"
gtag('config', 'G-ABC123DEF45');
```

### 5. Verifica la Configuración

Después de desplegar:

1. Espera 24-48 horas para que Google Analytics comience a registrar datos
2. En Google Analytics → Tiempo real → Verás visitantes activos en tu sitio
3. En Google Analytics → Reportes → Verás tráfico y conversiones

## Checklist

- [ ] Creé propiedad en Google Analytics
- [ ] Obtuve mi Measurement ID (G-XXXXXXXXXX)
- [ ] Reemplacé el ID en `web/app/layout.tsx` (líneas 53 y 61)
- [ ] Deploy a Vercel (o servidor)
- [ ] Espero 24-48 horas
- [ ] Verifico datos en Google Analytics

## Alternativa: Variables de Entorno (Avanzado)

Si quieres mantener el ID fuera del código:

1. Crea archivo `.env.local` en la raíz de `web/`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Actualiza `layout.tsx`:
```typescript
const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-PENSIONES2026';

<Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
<Script id="google-analytics">{`gtag('config', '${gaId}');`}</Script>
```

## Preguntas Frecuentes

**P: ¿Necesito estar verificado en Google Search Console?**  
R: No. Analytics funciona independientemente. Pero sí recomendamos verificar en Search Console para ver SEO.

**P: ¿Cuánto tarda en aparecer el tráfico?**  
R: 24-48 horas. No te alarmes si "Usuarios activos" muestra 0 inicialmente.

**P: ¿Es gratis?**  
R: Sí, 100% gratis. Google Analytics 4 es gratuito para pequeños/medianos sitios.

**P: ¿Qué trackea?**  
R: Visitantes, páginas visitadas, tiempo en sitio, conversiones (email capture), ubicación, dispositivo, etc.

---

**Completado:** Cuando reemplaces el ID y despliegues, Google Analytics comenzará a registrar datos automáticamente.
