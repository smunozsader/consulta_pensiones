# 🚀 DEPLOY A VERCEL EN 3 MINUTOS

## Requisitos Previos
- [ ] Cuenta en GitHub (ya tienes)
- [ ] Cuenta en Vercel (GRATIS - crea en 1 minuto si no tienes)
- [ ] Repo en GitHub (ya está)

---

## PASO 1: Crea Cuenta Vercel (1 minuto)

1. Ve a: https://vercel.com/signup
2. Click en "Continue with GitHub"
3. Autoriza Vercel a acceder a GitHub
4. ¡Listo!

---

## PASO 2: Deploy (2 minutos)

### Opción A: Dashboard Vercel (RECOMENDADO - más fácil)

1. Ve a: https://vercel.com/dashboard
2. Click en "Add New..." → "Project"
3. Busca tu repositorio: `consulta_pensiones`
4. Click en el repo
5. Click "Import"
6. **Configuración** (dejar todo por defecto):
   - Framework: Next.js ✅ (auto-detecta)
   - Root Directory: ./web ← IMPORTANTE
   - Environment Variables: (dejar en blanco)
7. Click "Deploy"
8. **ESPERA 2-3 MINUTOS** mientras despliegA

### Opción B: Vercel CLI (más rápido si sabes usar terminal)

```bash
npm i -g vercel
cd web
vercel
# Sigue las instrucciones en pantalla
```

---

## PASO 3: Obtén tu URL (automático)

Después del deploy, Vercel te dará una URL tipo:
```
https://consulta-pensiones-ABC123.vercel.app
```

**ENVÍA ESTA URL A TU AMIGO PARA TESTING**

---

## ⚠️ IMPORTANTE: Root Directory

Vercel DEBE saber que la app está en `/web`

En el formulario de import:
```
Root Directory: ./web  ← ESTO ES CRÍTICO
```

Si lo dejas en blanco, fallará.

---

## ✅ Checklist Pre-Deploy

- [ ] GitHub repo actualizado (git push)
- [ ] Cuenta Vercel creada
- [ ] Repo conectado en Vercel
- [ ] Root Directory = ./web
- [ ] Click "Deploy"
- [ ] Esperas 2-3 minutos
- [ ] Copias la URL
- [ ] Envías a tu amigo

---

## Problemas Comunes

**P: Dice "Build failed"**
- Verifica que Root Directory sea ./web
- Revisa que no haya errores TypeScript en el código

**P: Dice "404 Not Found"**
- Espera 5 minutos más, a veces tarda
- Refresh la página

**P: No encuentra Next.js**
- Verifica que haya package.json en ./web
- Root Directory debe ser ./web

---

## ✨ Después del Deploy

1. Google Analytics comenzará a registrar datos
2. SEO está habilitado (aparecerá en Google en 24-48h)
3. Disclaimers están visibles
4. Calculadora con validaciones funciona

**¡Listo para testing!**

---

**Tiempo total:** 3 minutos
**Costo:** $0 (Vercel es gratis)
**Resultado:** URL pública para compartir

