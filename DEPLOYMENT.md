# Guía de Deployment

## Vercel (Recomendado)

### Paso 1: Conectar el Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Haz click en "New Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 2: Configurar Variables de Entorno

En la configuración del proyecto en Vercel, agrega:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Paso 3: Deploy

Vercel deployará automáticamente cuando hagas push a `main`.

## Docker

### Crear Imagen Docker

```bash
docker build -t agrigo-frontend .
```

### Ejecutar Contenedor

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:8080 \
  agrigo-frontend
```

## Railway

### Paso 1: Conectar Repositorio

1. Ve a [railway.app](https://railway.app)
2. Crea un nuevo proyecto
3. Conecta tu repositorio de GitHub

### Paso 2: Configurar

Railway detectará que es un proyecto Node.js/Next.js

### Paso 3: Variables de Entorno

Agrega en la consola de Railway:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Netlify

### Paso 1: Conectar Repositorio

1. Ve a [netlify.com](https://netlify.com)
2. Nuevo sitio desde Git
3. Selecciona tu repositorio

### Paso 2: Configurar Build

- Build command: `pnpm build`
- Publish directory: `.next`

### Paso 3: Variables de Entorno

Agrega en Site settings → Environment:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## Variables de Entorno Necesarias

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `NEXT_PUBLIC_API_URL` | Sí | URL del backend API |
| `NEXTAUTH_SECRET` | No | Secret para NextAuth (si lo usas) |
| `NEXTAUTH_URL` | No | URL de la app (si lo usas) |

## Checklist Pre-Deployment

- [ ] Todas las variables de entorno configuradas
- [ ] Tests pasando
- [ ] Build local funciona: `pnpm build && pnpm start`
- [ ] No hay errores de TypeScript: `pnpm type-check`
- [ ] README actualizado
- [ ] Versión en `package.json` actualizada

## Troubleshooting

### Error: "Failed to fetch API"

Verifica que `NEXT_PUBLIC_API_URL` esté configurado correctamente.

### Error: "Build failed"

1. Verifica que `pnpm install` funcione localmente
2. Revisa los logs de build en Vercel/Railway/Netlify
3. Asegúrate de que no haya errores de TypeScript

### Página en blanco

1. Abre DevTools (F12)
2. Revisa la consola para errores
3. Verifica que la API sea accesible

## Monitoreo Post-Deployment

1. Verifica que la app esté funcionando en la URL pública
2. Prueba el formulario de login/registro
3. Monitorea los logs en Vercel/Railway/Netlify
4. Configura alertas de errores (Sentry, LogRocket, etc.)

## Performance

Para mejorar performance en producción:

```bash
# Analizar bundle
pnpm build
npx next-bundle-analyzer
```

## Seguridad

1. **No commits credenciales** - Usa `.env.local` ignorado en git
2. **HTTPS siempre** - Los proveedores lo manejan automáticamente
3. **CORS** - Configura correctamente en tu backend
4. **Secrets** - Usa variables de entorno para datos sensibles

---

Para preguntas, abre un issue en [GitHub](https://github.com/sebastianUCC2024/frontend/issues).
