# CLAUDE.md - Consultoría Integral de Pensiones (Web)

**Última actualización:** Mayo 22, 2026  
**Estado:** Gestión Services MVP implementado y desplegado en vivo ✅

---

## 🌐 DEPLOYMENT & DOMINIO

- **Dominio Principal:** https://asesor-pensiones.mx/
- **Plataforma:** Vercel (con dominio personalizado configurado)
- **Rama:** main
- **Estado:** ✅ VIVO

---

## 🔑 VARIABLES DE ENTORNO (Vercel)

### Stripe (Actual - Cambiar a Mercado Pago próximamente)
```
STRIPE_SECRET_KEY=sk_test_... (o sk_live_... en producción)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (o pk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Mercado Pago (Próximas - A configurar)
```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-... (obtener en https://www.mercadopago.com.mx)
MERCADOPAGO_PUBLIC_KEY=APP_USR-... (o pk_...)
```

### Admin
```
ADMIN_PASSWORD=tu-password-admin (para /admin/service-requests)
```

---

## 📋 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Página de Servicios (/servicios)
- 3 servicios iniciales: Estado de Cuenta ($890), Modalidad 40 ($1,290), Solicitud Pensión ($2,890)
- Modal de solicitud con formulario validado
- Integración Stripe (cargado desde CDN, no npm)
- Flujo: Formulario → Pago Stripe → Confirmación email

### ✅ APIs Backend
- `POST /api/service-request` - Crear solicitudes de servicio
- `GET/PATCH /api/service-request/[requestId]` - Gestionar solicitudes (admin)
- `POST /api/payment` - Crear PaymentIntent Stripe
- `POST /api/webhooks/stripe` - Procesar confirmación de pago

### ✅ Firebase Integration
- Almacenamiento de solicitudes de servicio
- Tracking de estado (pending → in-progress → completed)
- Payment status tracking

### ✅ Email Confirmations
- Resend API para confirmación al cliente
- Notificación a Sergio sobre nueva solicitud

---

## 🚀 PRÓXIMAS FASES

### Fase 2: Cambio a Mercado Pago
1. [ ] Obtener credenciales de Mercado Pago (Access Token + Public Key)
2. [ ] Reemplazar StripePaymentForm → MercadoPagoPaymentForm
3. [ ] Actualizar APIs (/api/payment, webhooks)
4. [ ] Actualizar ServiceRequestModal
5. [ ] Test con dinero real (pequeño monto)
6. [ ] Deploy

### Fase 3: Dashboards
1. [ ] `/mi-gestion` - Dashboard cliente (ver sus solicitudes)
2. [ ] `/admin/service-requests` - Dashboard Sergio (gestionar todas solicitudes)

### Fase 4: Enhancements
1. [ ] Agregar link "Servicios" en Header
2. [ ] SMS/WhatsApp notifications (no solo email)
3. [ ] Sistema de comentarios cliente-Sergio
4. [ ] Más servicios (acreditación, portabilidad, etc.)

---

## 🛠️ STACK TÉCNICO

- **Framework:** Next.js 16.2.6 (App Router)
- **Lenguaje:** TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Firebase Realtime Database
- **Payments:** Stripe (próx: Mercado Pago)
- **Email:** Resend API
- **Deployment:** Vercel

---

## 📁 ESTRUCTURA CLAVE

```
app/
├── servicios/page.tsx ✅ (Catálogo de servicios)
├── components/
│   ├── ServiceRequestForm.tsx ✅
│   ├── ServiceRequestModal.tsx ✅
│   ├── StripePaymentForm.tsx ✅
│   └── Header.tsx ⏳ (Agregar link servicios)
├── mi-gestion/ ⏳ (Cliente dashboard)
├── admin/service-requests/ ⏳ (Admin dashboard)
└── api/
    ├── payment/route.ts ✅
    ├── service-request/ ✅
    └── webhooks/stripe/ ✅

lib/
├── firebase-service.ts ✅ (Firebase functions)
```

---

## 🧪 TESTING

### Stripe Test Cards (Pruebas Actuales)
```
Éxito:        4242 4242 4242 4242
Rechazado:    4000 0000 0000 0002
3D Secure:    4000 0025 0000 3155
Exp: MM/YY cualquiera (futura)
CVC: 3 dígitos cualquiera
```

### Flujo End-to-End
1. Ve a https://asesor-pensiones.mx/servicios
2. Haz click "Solicitar Servicio"
3. Completa formulario
4. Ingresa tarjeta test Stripe
5. Verifica email de confirmación en Firebase

---

## 🔗 REFERENCIAS

- **Repo:** https://github.com/smunozsader/consulta_pensiones
- **Branch:** main
- **Vercel Project:** https://vercel.com/sergios-projects-a17d689e/consulta-pensiones
- **Mercado Pago Credenciales:** https://www.mercadopago.com.mx (Settings → Credenciales)
- **Stripe Dashboard:** https://dashboard.stripe.com

---

## ⚙️ NOTAS IMPORTANTES

### Build Issues Resueltos (Mayo 22, 2026)
- ❌ `@stripe/js` no existe en npm → ✅ Cargado desde CDN
- ❌ TypeScript params Promise issue → ✅ Actualizado a `params: Promise<>`
- ❌ Stripe initialization en build → ✅ Lazy loading

### Decisiones de Diseño
- **Stripe desde CDN:** Evita dependencia npm que no existe
- **Lazy loading Stripe:** Solo inicializa cuando se usa (no en build)
- **Metadata en PaymentIntent:** Todo el contexto del cliente pasa por Stripe

---

## 📞 CONTACTO

- **Consultor:** Sergio Muñoz de Alba Medrano
- **WhatsApp:** https://wa.me/529992005550
- **Dominio:** https://asesor-pensiones.mx/

---

**Próximo paso:** Obtener credenciales de Mercado Pago y proceder con migración de pagos.
