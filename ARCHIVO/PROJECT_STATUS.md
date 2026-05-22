# 📊 Estado del Proyecto - Consultoría Integral de Pensiones

**Última actualización:** Mayo 20, 2026  
**Fase Actual:** Fase 2 COMPLETADA → Fase 3 (VALIDACIÓN LEGAL PENDIENTE)  
**GitHub:** https://github.com/smunozsader/consulta_pensiones.git

---

## 🎯 RESUMEN EJECUTIVO

Tenemos una plataforma web **completamente funcional** con:
- ✅ Landing page profesional
- ✅ Blog con 6 artículos (documentos markdown)
- ✅ Calculadora interactiva Modalidad 40 (TypeScript)
- ✅ 3 casos prácticos precargados
- ✅ SEO y meta tags
- ✅ Legal pages (Terms, Privacy)

**Bloqueante para lanzar:** Validación legal de casos y fórmulas

---

## 📈 PROGRESO POR FASE

### FASE 1: Repositorio Normativo ✅ COMPLETADA
- [x] 6 documentos creados (Elegibilidad, Modalidades, Casos)
- [x] Estructura pedagógica validada
- [x] Tono profesional aprobado
- [x] Convertidos a PDF

### FASE 2: Construcción Web ✅ COMPLETADA
- [x] Landing page con hero + CTA
- [x] Blog grid con carga dinámica de markdown
- [x] Calculadora Modalidad 40 (TypeScript engine)
- [x] Página Casos de Éxito
- [x] Página About con tiers
- [x] Email capture + storage API
- [x] SEO completo (meta tags, sitemap, robots.txt)
- [x] Legal pages (Terms, Privacy)
- [x] Structured data (Schema.org)

### FASE 3: Lanzamiento MVP ⏳ BLOQUEADO
**Bloqueante:** Validación legal de:
- Casos prácticos vs normativa vigente
- Fórmulas actuarialesvs tablas IMSS
- Términos legales y disclaimers

**Dependencias:**
- [ ] Actuario especializado IMSS
- [ ] Abogado seguridad social
- [ ] Consultor AFORES (CONSAR)

**Línea de tiempo:** 2026-06-15 (objetivo)

### FASE 4: Expansión (Post-MVP)
- [ ] Capturar primeros 50 emails
- [ ] Refinar copy según feedback
- [ ] Email sequence automation (4 emails)
- [ ] Publicar docs pendientes (02, módulo AFORES)
- [ ] Google Ads setup

### FASE 5: Escalado (Trimestre 2)
- [ ] Calculadora avanzada (more scenarios)
- [ ] Webinars educativos en vivo
- [ ] Integración WhatsApp Business
- [ ] Podcast/testimonios video
- [ ] Referral program

---

## 📁 ESTRUCTURA DEL PROYECTO

```
CONSULTORIA_PENSIONES/
├── web/                          # Aplicación Next.js
│   ├── app/
│   │   ├── page.tsx             # Landing page
│   │   ├── blog/                # Blog pages
│   │   ├── calculadora/         # Interactive calculator
│   │   ├── casos/               # Success cases
│   │   ├── about/               # About Sergio
│   │   ├── terminos/            # Terms & Conditions
│   │   ├── privacidad/          # Privacy Policy
│   │   ├── api/subscribe        # Email capture API
│   │   ├── robots.ts            # SEO robots.txt
│   │   ├── sitemap.ts           # SEO sitemap
│   │   └── layout.tsx           # Meta tags + GA
│   ├── lib/
│   │   ├── calculadora.ts       # TypeScript calculator engine
│   │   ├── markdown.ts          # MD file loader
│   │   └── emailjs-config.ts    # Email service config
│   ├── content/                 # Markdown articles (6 docs)
│   └── package.json
│
├── 01_ELEGIBILIDAD_LEY73.md      # Documentos normativos
├── 03_MODALIDAD_10.md
├── 04_MODALIDAD_40.md
├── 05_MODALIDAD_13.md
├── 06_CASOS_PRACTICOS_LEY73.md
├── 07_CASOS_PRACTICOS_LEY97_AFORES.md
│
├── VALIDACION_LEGAL_PENDIENTE.md # Legal review checklist
├── CLAUDE.md                     # Project memory
└── PROJECT_STATUS.md             # This file
```

---

## 🔧 STACK TÉCNICO

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + TypeScript + Next.js 16 |
| **Styling** | Tailwind CSS 3 |
| **Calculator** | TypeScript (ported from Python) |
| **Content** | Markdown + Markdown-it parser |
| **SEO** | Next.js Meta + Schema.org |
| **Analytics** | Google Analytics (placeholder) |
| **Hosting** | Vercel (ready to deploy) |
| **Email** | File-based JSON (ready for Mailchimp/SendGrid) |

---

## 🚀 DEPLOY STATUS

| Item | Status | Notes |
|------|--------|-------|
| Local Dev | ✅ Running | http://localhost:3000 |
| Code Quality | ✅ ESLint passes | TypeScript strict mode |
| Responsive | ✅ Mobile-friendly | Tested Tailwind breakpoints |
| Performance | ✅ Fast | Turbopack < 400ms |
| SEO | ✅ Setup | Meta tags added, noindex active |
| Analytics | ⏳ Pending | GA ID needs configuration |
| Domain | ⏳ Pending | pensiones-consulting.mx or custom |
| **Vercel Deploy** | 🔒 Ready | Blocked by legal validation |

---

## ⚠️ CRÍTICO: VALIDACIÓN LEGAL PENDIENTE

### Checklist de Validación (VALIDACION_LEGAL_PENDIENTE.md)

#### Casos Prácticos (6 casos a validar)
- [ ] **Carlos:** ¿Modalidad 40 realista? ¿Increment 36% es válido?
- [ ] **Laura:** ¿Acreditación de 20 años sin registro es posible?
- [ ] **Javier:** ¿Combinación Mod13 + formal es legal?
- [ ] **Diego:** ¿Pensión Ley 97 es acurada?
- [ ] **Sofía:** ¿Análisis AFORE es preciso?
- [ ] **Roberto:** ¿Proyección salario mínimo es realista?

#### Normativa (QUÉ VALIDAR)
- [ ] Tasas Modalidad 40 2025-2030 (¿vigentes?)
- [ ] UMA proyecciones (¿son oficiales?)
- [ ] Tablas de porcentajes variables (¿de IMSS?)
- [ ] Fórmula GAFES (¿correcta?)
- [ ] Mínimo garantizado ($248.93, ¿vigente?)

#### Legal
- [ ] Disclaimers son suficientes
- [ ] LGPD compliance verificado
- [ ] Términos y Condiciones son vinculantes
- [ ] Responsabilidades del consultor están claras

### Contactos Sugeridos

**Actuario IMSS:**
- Instituto Mexicano del Seguro Social
- Colegio Nacional de Actuarios

**Abogado Seguridad Social:**
- Especialista en derecho laboral/pensiones
- Con experiencia asesoría IMSS

**CONSAR (para Ley 97):**
- Consultor AFORES certificado
- Validar comisiones y proyecciones

---

## 📋 TODO LIST - PRÓXIMOS PASOS

### CRÍTICO (Bloqueadores)
- [ ] Contactar actuario para validar casos
- [ ] Contactar abogado para revisar disclaimers
- [ ] Completar VALIDACION_LEGAL_PENDIENTE.md checklist

### IMPORTANTE (Antes de MVP)
- [ ] Configurar Google Analytics ID real
- [ ] Cambiar meta robots noindex → index
- [ ] Configurar dominio de producción
- [ ] Setup Vercel deployment
- [ ] Pruebas finales en staging

### NICE-TO-HAVE (Post-MVP)
- [ ] Integración Mailchimp/email automation
- [ ] WhatsApp Business API
- [ ] Documentos pendientes (02_SEMANAS_COTIZADAS, AFORES_MODULO)
- [ ] Webinars educativos
- [ ] Video testimonios

---

## 📊 MÉTRICAS DE ÉXITO

| KPI | Target | Status |
|-----|--------|--------|
| Landing page load | < 2s | ✅ ~0.35s |
| Mobile responsive | 100% | ✅ Tested |
| Blog posts loadable | 6/6 | ✅ All live |
| Calculator functional | All scenarios | ✅ Working |
| Legal pages complete | Terms + Privacy | ✅ Done |
| SEO setup | Meta + sitemap | ✅ Done |
| Validation legal | 100% | ⏳ 0% (pending) |

---

## 🎓 APRENDIZAJES Y DECISIONES

### Decisiones Tomadas
1. **TypeScript Calculator** (vs. Flask API) → Permite integración total, mejor UX
2. **Markdown Content** (vs. CMS) → Versionable en Git, simple
3. **Tailwind CSS** → Desarrollo rápido, responsive automático
4. **No Auth** (por ahora) → Focus en contenido + conversion, no complejidad

### Restricciones Identificadas
1. Casos prácticos necesitan validación legal antes de publicar
2. Fórmulas deben coincidir exactamente con tablas IMSS oficiales
3. LGPD requiere política de datos clara
4. Disclaimers deben ser prominentes (no escondidos)

---

## 📞 CONTACTO Y PRÓXIMOS PASOS

**Sergio (Dueño):**
- Email: smunozam@gmail.com
- WhatsApp: +52 1 55 1234 5678

**Próxima reunión recomendada:**
- Decidir contactos para validación legal
- Confirmar timeline para MVP (target: 2026-06-15)
- Aprobar contenido final

---

## 📅 TIMELINE PROPUESTO

| Fecha | Hito |
|-------|------|
| 2026-05-20 | ✅ Fase 2 completada (HOY) |
| 2026-05-25 | Contactar actuario y abogado |
| 2026-06-10 | Validación legal completada |
| 2026-06-15 | Deploy a Vercel |
| 2026-06-20 | MVP privado (primeros 50 emails) |
| 2026-07-01 | Evaluación y refinamiento |

---

**Estado:** 🟢 En Marcha | **Bloqueador:** Validación Legal | **Prioridad:** CRÍTICA

Versión 1.0 - Mayo 20, 2026
