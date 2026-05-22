# Estado de Implementación - Servicios de Gestión (Opción C)

**Fecha de inicio:** Mayo 22, 2026  
**Última actualización:** Mayo 22, 2026  
**Estado General:** 40% completado

---

## ✅ COMPLETADO (Hoy)

### Backend - 100% ✅
- [x] Firebase schema con `ServiceRequest` interface
- [x] `POST /api/service-request/route.ts` - Crear solicitudes de servicio
- [x] `PATCH /api/service-request/[requestId]/route.ts` - Actualizar estado (admin)
- [x] `POST /api/payment/route.ts` - Crear Stripe PaymentIntent
- [x] `POST /api/webhooks/stripe/route.ts` - Manejar pagos confirmados
- [x] Firebase functions actualizadas:
  - `saveServiceRequest()`
  - `updateServiceRequest()`
  - `getServiceRequest()`
  - `getClientServiceRequests()`

### Frontend - 30% ✅
- [x] `/app/servicios/page.tsx` - Página catálogo con 3 servicios
  - 3 tarjetas de servicios (estado-cuenta $890, modalidad-40 $1,290, solicitud-pension $2,890)
  - Botones "Solicitar Servicio" (aún no funcionales - esperan modal)
  - Sección "Cómo funciona" + CTA WhatsApp
- [x] `/app/components/ServiceRequestForm.tsx` - Formulario de datos
  - Campos: nombre, email, telefono, CURP, NSS (condicional), edad (condicional), salario (condicional)
  - Validación client-side completa
  - Autorización de representación

---

## ⏳ POR HACER (Próxima Sesión)

### Frontend - Fase 2 & 3 (70% restante)

#### Componentes Faltantes:
1. [ ] `ServiceRequestModal.tsx` - Modal que envuelve form + payment
   - Abre al hacer click en "Solicitar Servicio"
   - Contiene: ServiceRequestForm + StripePaymentForm
   - Estados: form → pago → éxito

2. [ ] `StripePaymentForm.tsx` - Formulario de pago Stripe
   - Integración con Stripe.js
   - Muestra client secret
   - Maneja PaymentElement
   - Envía datos metadata al crear PaymentIntent

3. [ ] `/app/mi-gestion/page.tsx` - Dashboard de cliente (sin login aún)
   - Lista todas sus solicitudes de servicio
   - Status badge (pending/in-progress/completed)
   - Timeline estimado
   - Link a detalle

4. [ ] `/app/mi-gestion/[requestId]/page.tsx` - Detalle de solicitud
   - Muestra estado actual
   - Próximos pasos
   - CTA WhatsApp si hay preguntas

5. [ ] `/app/admin/service-requests/page.tsx` - Dashboard admin para Sergio
   - Auth básico (password o email check)
   - Lista TODAS las solicitudes
   - Filtro por status/service-type
   - Click en solicitud → editar status, agregar notas
   - Tabla o cards con info clave

#### Actualizaciones:
- [ ] `/app/components/Header.tsx` - Agregar link "Servicios de Gestión" → `/servicios`
- [ ] Email template mejorado en `/api/service-request/route.ts`

### Configuration & Deployment
- [ ] `.env.local` - Agregar claves:
  ```
  STRIPE_SECRET_KEY=sk_test_...
  STRIPE_PUBLISHABLE_KEY=pk_test_...
  STRIPE_WEBHOOK_SECRET=whsec_...
  ADMIN_PASSWORD=tu-password-aquí
  ```

- [ ] Stripe Dashboard:
  - [ ] Crear 3 productos (estado-cuenta, modalidad-40, solicitud-pension)
  - [ ] Obtener claves de test
  - [ ] Configurar webhook URL: `https://asesor-pensiones.mx/api/webhooks/stripe`

- [ ] Vercel - Deploy con env vars

---

## 📋 Orden de Implementación (Recomendado)

1. **Primero:** `ServiceRequestModal.tsx` + `StripePaymentForm.tsx`
   - Estas 2 hacen que la página `/servicios` sea funcional end-to-end
   - Una vez hechas, puedes probar el flujo completo

2. **Segundo:** Dashboards de cliente y admin
   - `/app/mi-gestion/page.tsx` + `/app/mi-gestion/[requestId]/page.tsx`
   - `/app/admin/service-requests/page.tsx`

3. **Tercero:** Detalles (nav link, env vars, deploy)

---

## 🔧 Testing Checklist

Antes de deployer, probar:
- [ ] Click "Solicitar" en /servicios abre modal
- [ ] Llenar form → validaciones funcionan
- [ ] Stripe form aparece
- [ ] Pago test en Stripe funciona
- [ ] Webhook recibe confirmación y crea solicitud en Firebase
- [ ] Email de confirmación se envía
- [ ] Admin puede ver solicitud en /admin/service-requests
- [ ] Cliente puede ver solicitud en /mi-gestion (si tiene token)

---

## 📝 Notas

- **Stripe Test Keys:** Usa `sk_test_` y `pk_test_` para development local
- **Webhook Testing:** Usa Stripe CLI en local para simular webhooks
- **Auth Simple:** Para MVP, admin dashboard usa password simple (env var)
- **No Email Seguimiento:** Cliente no recibe updates automáticas (solo WhatsApp por ahora)

---

## 🔗 Enlaces Útiles

- Plan completo: `/Users/smunozam/.claude/plans/unified-booping-melody.md`
- Repo: https://github.com/smunozsader/consulta_pensiones.git
- Branch: `main`
- Commits hoy:
  - `d0ed769` - Firebase schema
  - `2da5063` - API endpoints service-request
  - `00a06cc` - Stripe payment endpoints
  - `1013ec0` - Services page + form

---

**Próxima sesión:** Retomar con `ServiceRequestModal.tsx` + `StripePaymentForm.tsx`
