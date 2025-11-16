# Frontend - Marketplace Dashboard

Un dashboard de Next.js moderno para gestionar un marketplace agrícola con interfaces para agricultores, compradores y administradores.

## 🚀 Características

- **Dashboard de Agricultores**: Gestión de cultivos, IA recomendaciones, marketplace y análisis
- **Dashboard de Compradores**: Exploración de marketplace, comparación de precios y órdenes
- **Dashboard de Administración**: Vista de administrador del sistema
- **Dashboard de Tienda**: Gestión de insumos, precios y ventas
- **Temas Personalizables**: Soporte para temas claro/oscuro
- **Multi-idioma**: Soporte para múltiples idiomas
- **UI Moderna**: Componentes shadcn/ui con Tailwind CSS
- **TypeScript**: Tipado completo para mayor seguridad

## 📦 Tech Stack

- **Next.js 16** - Framework React
- **React 19** - UI Library
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos CSS
- **shadcn/ui** - Componentes UI
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas
- **Recharts** - Gráficas y visualización de datos
- **pnpm** - Package manager

## 📁 Estructura del Proyecto

```
frontend/
├── app/                    # App router de Next.js
├── components/            # Componentes React
│   ├── dashboard/         # Componentes del dashboard
│   │   ├── admin/
│   │   ├── buyer/
│   │   ├── farmer/
│   │   ├── store/
│   │   └── shared/
│   ├── ui/               # Componentes UI reutilizables
│   └── auth/             # Componentes de autenticación
├── contexts/             # Contextos de React
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y servicios
├── services/             # Servicios API
├── styles/               # Estilos globales
└── public/               # Assets estáticos
```

## 🛠️ Instalación

### Prerrequisitos
- Node.js 18+
- pnpm 8+

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/sebastianUCC2024/frontend.git
cd frontend
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📚 Comandos Disponibles

```bash
# Desarrollo
pnpm dev                 # Inicia servidor de desarrollo

# Construcción
pnpm build              # Construye para producción
pnpm start              # Inicia servidor de producción

# Linting y Formato
pnpm lint               # Ejecuta linter

# TypeScript
pnpm type-check         # Verifica tipos TypeScript
```

## 🎨 Componentes Principales

### Dashboards
- **Farmer Dashboard**: Gestión de cultivos y análisis
- **Buyer Dashboard**: Exploración y compra de productos
- **Admin Dashboard**: Administración del sistema
- **Store Dashboard**: Gestión de tienda

### UI Components
- Botones, Cards, Dialogs, Drawers
- Formularios, Inputs, Selects
- Tablas, Paginación
- Gráficas, Charts
- Y más...

## 🔐 Seguridad

- Validación de datos con Zod
- Gestión segura de autenticación
- Variables de entorno para credenciales

## 📝 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base URL para API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚀 Deployment

### Vercel (Recomendado)

```bash
vercel
```

### Docker

```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## 📧 Contacto

- GitHub: [@sebastianUCC2024](https://github.com/sebastianUCC2024)
- Email: sebastianUCC2024@github.com

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles

---

Hecho con ❤️ para un marketplace agrícola moderno
